import { Hooks } from "../interface/hooks"; 
import { Upload } from "../core";

const checkFileType = (ctx: Upload) => {
    const { fileList } = ctx
   
}

export const attributesModule: Hooks = { beforeUpload: checkFileType }