// 文档 https://www.yuque.com/javascript-road/knowledge/hgpmpd/edit
function jsonp({ url, data }, options = { callbackName: 'callback' }) {
      return new Promise((resolve, reject) => {
        if (!url && typeof url !== 'string') {
          return reject('url 参数不合法')
        }
        if (!data && typeof data !== 'object') {
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
