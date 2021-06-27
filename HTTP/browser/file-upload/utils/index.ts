
export function callWithErrorHandling(
    fn: Function,
    ctx?: unknown
  ) {
    let res
    try {
     fn(ctx)
    } catch (err) {
      // TODO 错误处理
      console.error(err)
    }
    return res
  }

  export function isUndef(v: any): boolean {
    return v === undefined || v === null
  }
  
  export function warn(msg: string) {
    console.error(`[Upload warn]: ${msg}`)
  }

  export function getElement(el: HTMLElement | string) {
    return (typeof el === 'string'
      ? document.querySelector(el)
      : el) as HTMLElement
  }

  export function addEvent(
    el: HTMLElement,
    type: string,
    fn: EventListenerOrEventListenerObject,
    capture?: AddEventListenerOptions
  ) {
    el.addEventListener(type, fn, {
      passive: false,
      capture: !!capture,
    })
  }
  
  export function removeEvent(
    el: HTMLElement,
    type: string,
    fn: EventListenerOrEventListenerObject,
    capture?: EventListenerOptions
  ) {
    el.removeEventListener(type, fn, {
      capture: !!capture,
    })
  }