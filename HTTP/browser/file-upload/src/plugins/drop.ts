import { Plugin } from "../interface/plugin"; 
import { Upload } from "../core";
import { addEvent } from '../utils/index'
const eventLists: Function[] = []

const initDrop = (ctx: Upload) => {
    const { container, options: { autoUpload, drag } } = ctx
    if (container && drag) {
        ['dragover', 'drop'].forEach(type => {
            const offEvent = addEvent(container,type, (e: Event) => {
                e.preventDefault()
                if (type === 'drop') {
                    const fileList = (e as any).dataTransfer.files
                    if (!fileList || !fileList.length) return
                    ctx.fileList = ctx.fileList.concat(Array.from(fileList))
                    if (autoUpload) {
                        ctx.trigger('uploadFile')
                    }
                }
            })
            eventLists.push(offEvent)
        })
    }
}

const destroy = () => {
    eventLists.forEach(fn => {
        fn && fn()
    })
}

export const dropFilePlugin: Plugin = { name: 'dropFile', init: initDrop, destroy }