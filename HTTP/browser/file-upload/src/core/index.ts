import { EventEmitter } from './eventEmitter'
import { Plugin } from '../interface/plugin'
import { defaultTemplate } from '../plugins/template/index'
import { Hooks, HooksType } from '../interface/hooks'
import { UploadOptions, ElementParam } from '../interface/uploadParams'
import { callWithErrorHandling, isUndef, warn, getElement, addEvent } from '../utils/index'
import { createAdapter } from '../http/adapter'

type ArraysOf<T> = {
  [K in keyof T]: Array<T[K]>
}

type PluginsHooks = ArraysOf<Hooks>

interface PluginsMap {
  [key: string]: boolean
}

const DEFAULT_OPTIONS: UploadOptions = {
  template: defaultTemplate,
  name: 'file',
  accept: '/image',
  showFileList: true,
  headers: {},
  action: '/index',
  drag: true,
  clipBoard: false,
  listType: 'text',
  autoUpload: true,
  disabled: false,
  limit: -1
}

export class UploadConstructor<O = {}> extends EventEmitter {
  static plugins: Plugin[] = []
  static pluginsMap: PluginsMap = {}
  options: UploadOptions
  container!: HTMLElement
  fileList!: File[];
  [key: string]: any

  private pluginsHooks: PluginsHooks = {}

  constructor(opt: UploadOptions & O) {
    super()
    this.options = { ...DEFAULT_OPTIONS, ...opt }
    this.init()
  }

  private init() {
    const { el, template } = this.options
    if (el) {
      this.container = getElement(el)
    }
    if (!this.container) {
      warn('Can not resolve the wrapper DOM.')
      return
    }
    if (template) {
      this.container.innerHTML = template
    }
    this.fileList = []
    this.initPluginHooks()
    this.invokePluginHook('init')
    this.setEventLister()
  }

  private setEventLister() {
    const { container, pluginsHooks } = this
    const inputElement = this.createInputElement()
    const offUploadFileFn = this.on('uploadFile', this.uploadFile)
    const offClickFn = addEvent(container, 'click', () => {
      inputElement.value = ''
      inputElement.click()
    })
    const offChangeFn = addEvent(inputElement, 'change', (e: Event) => {
      const fileList = (e.target as HTMLInputElement).files
      if (!fileList || !fileList.length) return
      this.fileList = this.fileList.concat(Array.from(fileList))
      this.trigger('uploadFile')
    })
    pluginsHooks.destroy?.push(offClickFn, offChangeFn, offUploadFileFn)
  }

  private uploadFile() {
    this.invokePluginHook('beforeUpload')
    const { fileList } = this
    const { name, action, headers } = this.options
    const adapter = createAdapter()
    const formData = new FormData()
    fileList.forEach(file => {
      formData.append(name, file)
    })

    adapter &&
      adapter({
        action,
        headers,
        body: formData,
        onProgress: (e: Event) => {
          this.invokePluginHook('onUpload', e)
        },
        onSuccess() {},
        onError() {}
      })
  }

  private createInputElement() {
    const { container, options } = this
    const { accept, multiple } = options
    const inputElement: HTMLInputElement = document.createElement('input')
    inputElement.setAttribute('style', 'display: none')
    inputElement.setAttribute('type', 'file')
    inputElement.setAttribute('accept', accept)
    if (multiple) {
      inputElement.setAttribute('multiple', 'multiple')
    }
    container.appendChild(inputElement)
    return inputElement
  }

  private invokePluginHook(hookType: HooksType, params?: unknown) {
    const invokePluginHooks = this.pluginsHooks[hookType]
    invokePluginHooks?.forEach(hook => {
      if (typeof hook === 'function') {
        callWithErrorHandling(hook, this, params)
      }
    })
  }

  private initPluginHooks() {
    const hooks: Array<keyof Hooks> = [
      'init',
      'create',
      'beforeUpload',
      'onUpload',
      'afterUpload',
      'destroy'
    ]
    this.pluginsHooks = {
      init: [],
      create: [],
      destroy: [],
      beforeUpload: [],
      afterUpload: [],
      onUpload: []
    }
    const plugins = UploadConstructor.plugins
    for (let i = 0; i < hooks.length; ++i) {
      this.pluginsHooks[hooks[i]] = []
      for (let j = 0; j < plugins.length; ++j) {
        const hook = plugins[j][hooks[i]]
        if (hook !== undefined) {
          ;(this.pluginsHooks[hooks[i]] as any[]).push(hook)
        }
      }
    }
  }

  static use(plugin: Plugin) {
    const name = plugin.name
    if (isUndef(name)) {
      warn(`Plugin Class must specify plugin's name in static property by 'pluginName' field.`)
      return UploadConstructor
    }
    if (UploadConstructor.pluginsMap[name]) {
      warn(`This plugin has been registered, maybe you need change plugin's name`)
      return UploadConstructor
    }
    UploadConstructor.pluginsMap[name] = true
    UploadConstructor.plugins.push(plugin)
    return UploadConstructor
  }

  destroy() {
    this.invokePluginHook('destroy')
    UploadConstructor.plugins = []
    UploadConstructor.pluginsMap = {}
    this.pluginsHooks = {}
    this.options = DEFAULT_OPTIONS
  }

  // 取消上传
  abort() {}

  // 手动上传
  submit() {
    this.uploadFile()
  }
}

export function createUpload<O = {}>(options: UploadOptions & O): UploadConstructor {
  const upload = new UploadConstructor(options)
  return (upload as unknown) as UploadConstructor
}

createUpload.use = UploadConstructor.use
createUpload.plugins = UploadConstructor.plugins
createUpload.pluginsMap = UploadConstructor.pluginsMap

type CreateUpload = typeof createUpload
export interface UploadFactory extends CreateUpload {
  new <O = {}>(el: ElementParam, options?: UploadOptions & O): UploadConstructor
}

export type Upload<O = UploadOptions> = UploadConstructor<O>

export const Upload = (createUpload as unknown) as UploadFactory
