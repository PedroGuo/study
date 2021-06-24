import {
    beforeUploadHook,
    onUploadHook,
    afterUploadHook,
    destroyHook
} from '../interface/hooks'


export type Plugin = Partial<{
    beforeUpload: beforeUploadHook;
    onUpload: onUploadHook;
    afterUpload: afterUploadHook
    destroy: destroyHook;
}> & {
    name: string
}