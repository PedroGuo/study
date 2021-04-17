/**
 * 关键点
 * 1、入参为可迭代对象 （Array,string,Map,Set...）
 * 2、返回值为一个Promise 
 * 3、当所有结果都为成功时，Promise 状态才为 fulfilled, 当其中某一项为失败时  Promise 状态才为 fulfilled
 * 3、resolve 值为一个固定调用顺序的结果数组
 * 4、需要一个计数器来记录任务是否完成合对应的顺寻
 * @returns 
 */
// promise all 有个缺点就是当一个失败，会把所有成功的结果都丢失，这样浪费了之前的请求， 于是就有了 allSettled 这个方法，把失败和成功都保留下来了
const promiseAll = function(iterations) {
    return new Promise((resolve, reject) => {
        let result = [], count = 0;
        if(!iterations || iterations.length) {
            resolve(result) 
        } else {
            for(let i = 0, len = iterations.length; i < len; i++) {
                const item = iterations[i]
                Promise.resolve(item).then(res => {
                    count ++
                    result[i] = res  // 按顺序保存对应的结果
                    if (count === iterations.length -1) {
                        resolve(result)   
                    }
                }).catch(err => reject(err))
            }
        }
        
    })
}