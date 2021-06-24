import { UploadOptions, ElementParam } from "../interface/uploadParams";
import { Plugin } from "../plugins/plugin";

interface PluginsMap {
  [key: string]: boolean;
}

const DEFAULT_OPTIONS: UploadOptions = {
  name: "file",
  showFileList: true,
  drag: true,
  clipBoard: false,
  listType: "text",
  autoUpload: true,
  disabled: false,
  limit: -1,
};

export class UploadConstructor<O = {}> {
  static plugins: Plugin[] = [];
  static pluginsMap: PluginsMap = {};

  constructor(opt: UploadOptions & O) {
    const optiosn = { ...DEFAULT_OPTIONS, ...opt };
  }

  private init() {}

  private applyPlugins() {}

  static use(plugins: Plugin[]) {}

  destroy() {}

  // 取消上传
  abort() {}

  // 手动上传
  submit() {}
}

export function createUpload<O = {}>(
  options?: UploadOptions & O
): UploadConstructor {
  const upload = new UploadConstructor(options);
  return upload as unknown as UploadConstructor;
}

createUpload.use = UploadConstructor.use;
createUpload.plugins = UploadConstructor.plugins;
createUpload.pluginsMap = UploadConstructor.pluginsMap;

type CreateUpload = typeof createUpload;
export interface UploadFactory extends CreateUpload {
  new <O = {}>(
    el: ElementParam,
    options?: UploadOptions & O
  ): UploadConstructor;
}

export type Upload<O = UploadOptions> = UploadConstructor<O>;

export const Upload = createUpload as unknown as UploadFactory;
