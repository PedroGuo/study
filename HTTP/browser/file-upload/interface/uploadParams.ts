import { UploadFile} from './hooks'

export type ElementParam = HTMLElement | string


export type UploadOptions = Partial<{
    el: ElementParam,
    template: string,                                      // 自定义UI模板
    name: string,                                                   // 上传名称
    headers: object,                                                // 上传请求头
    accept: string,                                                 // 限制文件类型
    drag: boolean,                                                  // 是否支持拖拽上传
    clipBoard: boolean,                                             // 是否支持剪贴板上传    
    multiple: boolean,                                              // 是否支持多选文件
    gzip: boolean,                                                  // 是否开启压缩上传
    listType: 'text' | 'picture' | 'picture-card',                  // 预览文件类型
    autoUpload: boolean,                                            // 是否自动上传    
    limit: number,                                                  // 最大允许上传个数
    showFileList: boolean,                                          // 是否显示已上传文件列表
    disabled: boolean,
    onExceed: (file: UploadFile) => void,
    onSuccess: (file: UploadFile) => void,
    onError: (file: UploadFile) => void,
    onProgress: (file: UploadFile) => void,
    onRemove: (file: UploadFile) => void,
    onPreview: (file: UploadFile) => void,
    beforeUpload: (file: UploadFile) => void,
    beforeRemove: (file: UploadFile) => void,
    httpRequest: Function
}>