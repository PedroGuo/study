import { EventEmitter } from './eventEmiter'
import { Plugin } from "../plugins/plugin";
import { Hooks, HooksType } from '../interface/hooks'
import { UploadOptions, ElementParam } from "../interface/uploadParams";
import { callWithErrorHandling, isUndef, warn, getElement, addEvent  } from '../utils/index'

type ArraysOf<T> = {
  [K in keyof T]: Array<T[K]>;
}

type PluginsHooks = ArraysOf<Hooks>

interface PluginsMap {
  [key: string]: boolean;
}


const DEFAULT_OPTIONS: UploadOptions = {
  name: "file",
  showFileList: true,
  drag: true,
  clipBoard: false,
  listType: "text",
  autoUpload: true,
  disabled: false,
  limit: -1,
};


export class UploadConstructor<O = {}> extends EventEmitter {
  static plugins: Plugin[] = [];
  static pluginsMap: PluginsMap = {};
  optiosn: UploadOptions = {}
  container: HTMLElement | null
  fileList: File[]
  [key: string]: any;

  private pluginsHooks: PluginsHooks = {}

  constructor(opt: UploadOptions & O) {
    super()
    this.optiosn = { ...DEFAULT_OPTIONS, ...opt };
    this.init();
  }

  private init() {
    const { template } = this.optiosn
    this.container =  getElement(template)
    this.applyPlugins()
    this.invokePluginHook('init')
    addEvent(this.container, 'click', () => {
      const inputElement = this.createInputElemnt()
      inputElement.value = null
      inputElement.click()
    })
  }

  private createInputElemnt() {
    const { container, optiosn } = this
    const { accept, multiple } = optiosn
    const inputElement: HTMLInputElement = document.createElement('input')
    inputElement.setAttribute('style', 'display: none');
    inputElement.setAttribute('type', 'file')
    inputElement.setAttribute('accept', accept)
    if (multiple) {
      inputElement.setAttribute('multiple', 'multiple')
    }
    container.appendChild(inputElement)
    return inputElement
  }

  private invokePluginHook(hookType:HooksType) {
    const invokePluginHooks = this.pluginsHooks[hookType]
    invokePluginHooks.forEach(hook => {
      if (typeof hook === 'function') {
        callWithErrorHandling(hook, this)
      }
    })
  }

  private applyPlugins() {
    const hooks: Array<keyof Hooks> = ['init', 'create', 'beforeUpload', 'onUpload', 'afterUpload', 'destroy']
    this.pluginsHooks = {
      init: [],
      create: [],
      destroy: [],
      beforeUpload: [],
      afterUpload: [],
      onUpload: []
    }
    for (let i = 0; i < hooks.length; ++i) {
      this.pluginsHooks[hooks[i]] = []
      for (let j = 0; j < UploadConstructor.plugins.length; ++j) {
        const hook = UploadConstructor.plugins[j][hooks[i]]
        if (hook !== undefined) {
          (this.pluginsHooks[hooks[i]] as any[]).push(hook)
        }
      }
    }
  }

  static use(plugin: Plugin) {
    const name = plugin.name
    if (isUndef(name)) {
      warn(
        `Plugin Class must specify plugin's name in static property by 'pluginName' field.`
      )
      return UploadConstructor
    }
    if (UploadConstructor.pluginsMap[name]) {
      warn(
        `This plugin has been registered, maybe you need change plugin's name`
      )
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
    this.optiosn = {}
    this.container = null
  }

  // 取消上传
  abort() {}

  // 手动上传
  submit() {}
}

export function createUpload<O = {}>(
  options?: UploadOptions & O
): UploadConstructor {
  const upload = new UploadConstructor(options);
  return upload as unknown as UploadConstructor;
}

createUpload.use = UploadConstructor.use;
createUpload.plugins = UploadConstructor.plugins;
createUpload.pluginsMap = UploadConstructor.pluginsMap;

type CreateUpload = typeof createUpload;
export interface UploadFactory extends CreateUpload {
  new <O = {}>(
    el: ElementParam,
    options?: UploadOptions & O
  ): UploadConstructor;
}

export type Upload<O = UploadOptions> = UploadConstructor<O>;

export const Upload = createUpload as unknown as UploadFactory;
