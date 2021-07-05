import {
    beforeUploadHook,
    onUploadHook,
    afterUploadHook,
    destroyHook,
    InitHook,
    CreateHook
} from './hooks'


export type Plugin = Partial<{
    beforeUpload: beforeUploadHook;
    onUpload: onUploadHook;
    afterUpload: afterUploadHook
    destroy: destroyHook;
    init: InitHook;
    create: CreateHook;
}> & {
    name: string
}