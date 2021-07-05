import { Plugin } from '../interface/Plugin'
import { UploadFile } from '../interface/hooks'
import { Upload } from '../core/index'

export const previewPlugin: Plugin = {
    name: 'previewPlugin',
    beforeUpload(ctx: Upload) {
        console.log('预览文件')
    }
}