/**
 * 关键点：
 * 1、入参为可迭代对象 （Array,string,Map,Set...）
 * 2、返回值为一个Promise 
 * 3、当其中某一项为成功时  Promise 状态才为 fulfilled，反之当某一项为失败则Promise 状态才为 rejected
 * 
 */

const promiseRace = function(iterations) {
    return new Promise((resolve, reject) => {
        if(!iterations || iterations.length) {
            reject({}) 
        }
        for (const iter of iterations) {
            Promise.resolve(iter)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        }
    })
}