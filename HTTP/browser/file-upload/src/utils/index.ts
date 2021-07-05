export function callWithErrorHandling(fn: Function, ctx?: unknown, arg?: unknown) {
  let res
  try {
    arg ? fn(ctx, arg) : fn(ctx)
  } catch (err) {
    // TODO 错误处理
    console.error(err)
  }
  return res
}

export function isUndef(v: any): boolean {
  return v === undefined || v === null
}

export const isFunction = (val: unknown): val is Function => typeof val === 'function'

export const isString = (val: unknown): val is string => typeof val === 'string'

export const isBlob = (val: unknown): val is Blob => {
  if (typeof Blob === 'undefined') return false
  return val instanceof Blob || Object.prototype.toString.call(val) === '[object Blob]'
}

export const isFile = (val: unknown) => {
  if (typeof File === 'undefined') return false
  return val instanceof File || Object.prototype.toString.call(val) === '[object File]'
}

export const dataUriToBlob = (dataUri: string, mimeType?: string) => {
  let arr = dataUri.split(',')
  let mime = mimeType || arr[0].match(/:(.*?);/)![1]
  let bytes = window.atob(arr[1])
  let ab = new ArrayBuffer(bytes.length)
  let ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new Blob([ab], { type: mime })
}

export function warn(msg: string) {
  console.error(`[Upload warn]: ${msg}`)
}

export function getElement(el: HTMLElement | string) {
  return (typeof el === 'string' ? document.querySelector(el) : el) as HTMLElement
}

export function addEvent(
  el: HTMLElement,
  type: string,
  fn: EventListenerOrEventListenerObject,
  capture?: AddEventListenerOptions
) {
  el.addEventListener(type, fn, {
    passive: false,
    capture: !!capture
  })

  return () => {
    removeEvent(el, type, fn)
  }
}

export function removeEvent(
  el: HTMLElement,
  type: string,
  fn: EventListenerOrEventListenerObject,
  capture?: EventListenerOptions
) {
  el.removeEventListener(type, fn, {
    capture: !!capture
  })
}
