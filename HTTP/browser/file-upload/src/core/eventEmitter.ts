interface Events {
    [name: string]: [WithFnFunction, Object][]
  }
  
  interface EventTypes {
    [type: string]: string
  }
  
interface WithFnFunction extends Function {
    fn?: Function
}

export class EventEmitter {
    events: Events
    eventTypes: EventTypes
    constructor() {
      this.events = {}
      this.eventTypes = {}
    }

    on(type: string, fn: Function, context: Object = this) {
      if (!this.events[type]) {
        this.events[type] = []
      }

      this.events[type].push([fn, context])
      return () => {
        this.off(type, fn)
      }
    }

    once(type: string, fn: Function, context: Object = this) {
      const magic = (...args: any[]) => {
        this.off(type, magic)

        fn.apply(context, args)
      }
      magic.fn = fn

      this.on(type, magic)
      return this
    }

    off(type?: string, fn?: Function) {
      if (!type && !fn) {
        this.events = {}
        return this
      }

      if (type) {
        
        if (!fn) {
          this.events[type] = []
          return this
        }

        let events = this.events[type]
        if (!events) {
          return this
        }

        let count = events.length
        while (count--) {
          if (
            events[count][0] === fn ||
            (events[count][0] && events[count][0].fn === fn)
          ) {
            events.splice(count, 1)
          }
        }

        return this
      }
    }

    trigger(type: string, ...args: any[]) {
      
      let events = this.events[type]
      if (!events) {
        return
      }

      let len = events.length
      let eventsCopy = Array.from(events)
      let ret
      for (let i = 0; i < len; i++) {
        let event = eventsCopy[i]
        let [fn, context] = event
        if (fn) {
          ret = fn.apply(context, args)
          if (ret === true) {
            return ret
          }
        }
      }
    }

    destroy() {
      this.events = {}
      this.eventTypes = {}
    }
  }