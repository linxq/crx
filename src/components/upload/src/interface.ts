import { Data } from '../../_utils/type'
export const FILE_STATUS = ['init', 'uploading', 'done', 'error'] as const
export type FileStatus = typeof FILE_STATUS[number]

export interface FileItem {
  /**
   *   当前上传文件的唯一标示
   */
  uid: string
  /**
   *   当前上传文件的状态
   */
  status?: FileStatus
  /**
   *   文件对象
   */
  file?: File
  /**
   *   上传进度百分比
   */
  percent?: number
  /**
   *   当前文件上传请求返回的响应
   */
  response?: any
  /**
   *   图片地址
   */
  url?: string
  /**
   *   图片文件名
   */
  name?: string
}

export interface ProgressEvent<T extends EventTarget = EventTarget> extends Event {
  readonly lengthComputable: boolean
  readonly loaded: number
  readonly target: T | null
  readonly total: number
}

export interface UploadRequest extends Data {
  /**
       *   终止上传
       * */
  abort?: () => void
}

export interface RequestOption {
  /**
     *   上传的URL
     * */
  action?: string
  /**
     *   请求报文的头信息
     * */
  headers?: Data
  /**
     *   上传文件的文件名
     * */
  name?: string | ((fileItem: FileItem) => string)
  /**
     *   上传文件
     * */
  fileItem: FileItem
  /**
     *   附加的请求信息
     * */
  data?: Data | ((fileItem: FileItem) => Data)
  /**
     *   是否携带cookie信息
     * */
  withCredentials?: boolean
  /**
     *   更新当前文件的上传进度。percent: 当前上传进度百分比
     * */
  onProgress: (percent: number, event?: ProgressEvent) => void
  /**
     *   上传成功后，调用onSuccess方法，传入的response参数将会附加到当前上传文件的response字段上
     * */
  onSuccess: (response?: any) => void
  /**
     *   上传失败后，调用onError方法，传入的response参数将会附加到当前上传文件的response字段上
     * */
  onError: (response?: any) => void
}

export interface UploadOption {
  /**
    * 是否转换jpeg， 默认是true
    */
  convert2Jpeg?: boolean
  /**
   * 质量 0-1，在转换之后生效。默认是1
   */
  quality?: number
  action?: string
}
