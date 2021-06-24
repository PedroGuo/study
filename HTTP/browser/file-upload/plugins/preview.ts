import { Plugin } from './plugin'
import { UploadFile } from '../interface/hooks'
import { Upload } from '../core/index'

export const previewPlugin: Plugin = {
    name: 'previewPlugin',
    beforeUpload(file: UploadFile, ctx: Upload): UploadFile {
        console.log('预览文件')
        return file
    }
}