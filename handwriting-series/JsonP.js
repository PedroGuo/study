// 文档 https://www.yuque.com/javascript-road/knowledge/hgpmpd/edit
function jsonp({ url, data }, options = { callbackName: 'callback' }) {
      return new Promise((resolve, reject) => {
        if (!url || typeof url !== 'string') {
          return reject('url 参数不合法')
        }
        if (!data || typeof data !== 'object') {
          return reject('data 参数不合法')
        }
        if (!~url.indexOf('?')) url += '?'

        const queryStr = Object.keys(data).map(key => {
          return `${key}=${data[key]}`
        }).join('&')

        const callbackName = '_ExE' + options.callbackName + new Date().getTime()
        const queryCallName = `${options.callbackName}=${callbackName}`

        if (url[url.length - 1] !== '&') {
          url += '&'
        }
        url += queryStr
        if (url[url.length - 1] !== '&') {
          url += '&'
        }
        url += queryCallName

        let script = document.createElement('script')
        script.src = url
        window[callbackName] = function(data) {
          if (data) {
            resolve(data)
          } else {
            reject()
          }
        }
        script.onload = function() {
          document.head.removeChild(script)
          script = null
          delete window[callbackName]
        }
        script.onerror = function(e) {
          reject(e)
          document.head.removeChild(script)
          script = null
          delete window[callbackName]
        }

        document.head.appendChild(script)
      })
    }

    jsonp({url: 'http://localhost:3000', data: {name: 'tom', age: 18}})
    .then(res => console.log(res))


// 第二版 

let count = 1

function createURL(url, data = {}, cb, id) {
  url += (~url.indexOf('?') ? '&' : '?')
  const queryStr = Object.keys(data).map(key => {
    return `${key}=${data[key]}`
  }).join('&')
  url += queryStr
  url += `&${cb}=${id}`
  url = url.replace('?&', '?')
  url = url.replace('&&', '&')
  return url
}

function noop() { }

function jsonP(url, data, opts) {
  // 1、校验参数，返回值设置
  // 2、url生成
  // 3、全局回调设置
  // 4、回收清理
  // 5、异常处理
  // 6、拓展超时时间
  return new Promise((resolve, reject) => {
    if (!url || typeof url !== 'string') {
      return reject('url 参数不合法')
    }
    if (!data || typeof data !== 'object') {
      return reject('data 参数不合法')
    }
    if (!opts) opts = {}
    const prefix = opts.prefix || '__Exe'
    const cbName = opts.name
    const id = prefix + (count++)
    const timeout = opts.timeout || 1000 * 6
    const container = document.getElementsByTagName('script')[0] || document.head
    let script = null
    let timer = null

    if (timeout) {
      timer = setTimeout(() => {
        cleanup()
      }, timeout)
    }

    function cleanup() {
      if (script.parentNode) script.parentNode.removeChild(script)
      window[id] = noop
      if (timer) clearTimeout(timer)
    }

    window[id] = function(data) {
      if (data) {
        resolve(data)
      } else {
        reject()
      }
      cleanup()
    }

    script = document.createElement('script')
    script.src = createURL(url, data, cbName, id)
    script.onerror = function(e) {
      reject(e)
      cleanup()
    }
    container.appendChild(script)
  })
}

jsonP('http://localhost:3000', { name: 'tom', age: 18 }, { name: 'callback' })
  .then(res => console.log(res))

