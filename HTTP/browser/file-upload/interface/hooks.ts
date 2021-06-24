import { Upload } from "../core";

export type UploadFile = File | FileList;

export type InitHook = () => any;
export type CreateHook = () => any;
export type beforeUploadHook = (ctx: Upload, file?: UploadFile) => any;
export type onUploadHook = (ctx: Upload, file?: UploadFile) => any;
export type afterUploadHook = (ctx: Upload, file?: UploadFile) => any;
export type destroyHook = () => void;

export interface Hooks {
  init?: InitHook;
  create?: CreateHook;
  beforeUpload?: beforeUploadHook;
  onUpload?: onUploadHook;
  afterUpload?: afterUploadHook;
  destroy?: destroyHook;
}
