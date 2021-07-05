import { UploadFile} from './hooks'

export type ElementParam = HTMLElement | string


export type UploadOptions = {
    accept: string,                                                 // 限制文件类型
    action: string,
    name: string,
    listType?: 'text' | 'picture' | 'picture-card',                  // 预览文件类型
    el?: ElementParam,
    template?: string,
    headers?: object,                                                // 上传请求头
    clipBoard?: boolean,                                             // 是否支持剪贴板上传    
    multiple?: boolean,                                              // 是否支持多选文件
    gzip?: boolean,                                                  // 是否开启压缩上传
    onExceed?: (file: UploadFile) => void,
    onSuccess?: (file: UploadFile) => void,
    onError?: (file: UploadFile) => void,
    onProgress?: (file: UploadFile) => void,
    onRemove?: (file: UploadFile) => void,
    onPreview?: (file: UploadFile) => void,
    beforeUpload?: (file: UploadFile) => void,
    beforeRemove?: (file: UploadFile) => void,
    httpRequest?: Function
    showFileList?: boolean,
    drag?: boolean,
    autoUpload?: boolean,
    disabled?: boolean,
    limit?: number

}