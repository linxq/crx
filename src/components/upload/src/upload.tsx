import { Upload } from '@arco-design/web-vue'
import {
  defineComponent,
  defineExpose,
  h,
  PropType,
  getCurrentInstance,
  reactive,
  watch,
  ref,
  toRefs
} from 'vue'
import { FileItem, ProgressEvent, UploadOption } from './interface'
import { getCustomRequest } from './customRequest'
import { downloadFile } from './download'
import { isEqual } from 'lodash-es'
export default defineComponent({
  name: 'Upload',
  components: {
    Upload
  },
  inheritAttrs: false,
  props: {
    /**
     * 处理组件的当前状态，eidt or detail
     */
    state: {
      type: String,
      default: 'edit'
    },
    /**
     * 上传地址
     */
    url: {
      type: String
    },
    /**
     * 图片是否压缩
     */
    isCompression: {
      type: Boolean,
      default: true
    },
    /**
     * 是否转换成jpeg
     */
    convert2Jpeg: {
      type: Boolean,
      default: true
    },
    quality: {
      type: Number,
      default: 1
    },
    /**
     * 文件列表
     */
    files: {
      type: Array as PropType<FileItem[] | undefined | any>,
      default() {
        return []
      }
    },
    defaultFiles: {
      type: Array as PropType<FileItem[] | undefined | any>,
      default() {
        return []
      }
    },
    onSuccess: {
      type: Function as PropType<(fileItem: FileItem) => void>
    },
    onError: {
      type: Function as PropType<(fileItem: FileItem) => void>
    },
    onProgress: {
      type: Function as PropType<
        (fileItem: FileItem, event: ProgressEvent) => void
      >
    },
    onChange: {
      type: Function as PropType<
        (fileItem: FileItem, event: ProgressEvent) => void
      >
    }
  },
  emits: ['update:files', 'success', 'error', 'change'],

  setup(props: any, { emit, attrs, slots }) {
    const data = reactive({
      fileList: props.defaultFiles.map((item: any): any => {
        item.uid = Date.now()
        return item
      })
    })
    const uplaodComponent = ref('')
    function handlerSuccess(fileItem: FileItem): void {}

    function handlerChange(fileList: FileItem[]): any {}

    function handlerError(fileItem: FileItem): void {
      emit('error', fileItem)
    }
    const instance: any = getCurrentInstance()

    const customRequest = getCustomRequest({
      convert2Jpeg: props.convert2Jpeg,
      quality: props.quality
    })

    watch(
      () => data.fileList,
      function (newVal, oldVal) {
        if ((newVal || []).every((item: any): any => item.status === 'done')) {
          const list = (newVal || []).map((item: any): any => {
            if (item.response) {
              return {
                ...item.response
              }
            } else {
              return {
                name: item.name,
                url: item.url
              }
            }
          })
          emit('success', list)
          emit('update:files', list)
          emit('change', list)
        }
      }
    )

    watch(
      () => props.defaultFiles,
      function (newVal, oldVal) {
        data.fileList = props.defaultFiles.map((item: any): any => {
          item.uid = Date.now()
          item.url = item.url.replace('http://', 'https://')
          return item
        })
        if (newVal) {
          emit('update:files', newVal)
        }
      }
    )

    // 用来做清空处理
    watch(
      () => props.files,
      (newVal, oldVal) => {
        if (isEqual(newVal, oldVal)) return
        if (newVal && newVal.length > 0) return
        data.fileList = newVal
      }
    )
    if (props.state === 'edit') {
      return () => (
        <Upload
          action={props.url}
          v-model:file-list={data.fileList}
          onSuccess={handlerSuccess}
          ref={uplaodComponent}
          onError={handlerError}
          onChange={handlerChange}
          customRequest={customRequest}
          defaultFileList={data.fileList}
          autoUpload={true}
          multiple={true}
          {...attrs}
        >
          {slots}
        </Upload>
      )
    }

    if (props.state === 'detail') {
      return () => (
        <div>
          {data.fileList.map((item: FileItem): any => {
            return (
              <a
                style="display:block;text-decoration: none;margin-bottom:5px;color: rgb(0, 0, 238);cursor: pointer;"
                download={item.name}
                onClick={function () {
                  downloadFile(item.url as string, item.name as string)
                }}
              >
                {item.name}
              </a>
            )
          })}
        </div>
      )
    }
  }
})
