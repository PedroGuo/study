import { Upload } from "../core";

export type UploadFile = File | FileList;

export type InitHook = (ctx: Upload) => any;
export type CreateHook = (ctx: Upload) => any;
export type beforeUploadHook = (ctx: Upload, file?: UploadFile) => boolean;
export type onUploadHook = (ctx: Upload, file?: UploadFile) => any;
export type afterUploadHook = (ctx: Upload, file?: UploadFile) => any;
export type destroyHook = (ctx: Upload) => void;

export interface Hooks {
  init?: InitHook;
  create?: CreateHook;
  beforeUpload?: beforeUploadHook;
  onUpload?: onUploadHook;
  afterUpload?: afterUploadHook;
  destroy?: destroyHook;
}

export type HooksType = keyof Hooks
