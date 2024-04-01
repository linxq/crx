/**
 * @desc：前端实现图片压缩
 * @desc：只对jpg图片生效-对PNG图片效果甚微
 */

function dataURLtoFile (urlData: string, fileName: string): File {
  const arr: any = urlData.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bytes = atob(arr[1]) // 解码base64
  let n = bytes.length
  const ia = new Uint8Array(n)
  while (n--) {
    ia[n] = bytes.charCodeAt(n)
  }
  return new File([ia], fileName, { type: mime })
}

// 压缩图片
export async function compressImg (file: File | undefined): Promise<File | undefined> {
  if (!file) return await Promise.resolve(file)
  // 支持压缩的格式
  const reg = /\.(png|jpg|gif|jpeg|webp|PNG|JPG|JPEG)$/
  // (reg.test( file.name ) )
  if (reg.test(file.name)) {
    const name = file.name
    let src
    let fileResult
    const fileSize = parseFloat(`${(Number(file.size)) / 1024 / 1024}`).toFixed(2)
    const read = new FileReader()
    read.readAsDataURL(file)
    return await new Promise((resolve, reject) => {
      read.onload = function (e: any) {
        const img: any = new Image()
        img.src = e.target.result
        img.onload = function () {
          // 默认按比例压缩
          const w = this.width
          const h = this.height
          // 生成canvas
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          let base64 = ''
          // 创建属性节点
          canvas.setAttribute('width', w)
          canvas.setAttribute('height', h)
          ctx?.drawImage(this, 0, 0, w, h)
          if (fileSize) {
            // 所有图片压缩一半
            base64 = canvas.toDataURL('image/jpeg', 0.95)
          }
          // 回调函数返回file的值（将base64编码转成file）
          fileResult = dataURLtoFile(base64, changeImageName(name)) // 如果后台接收类型为base64的话这一步可以省略
          resolve(fileResult)
        }
      }
    })
  } else {
    return await new Promise((resolve, reject) => {
      resolve(file)
    })
  }
};
export function changeImageName (name: string): string {
  return name.replace(/\..*/, '.jpeg')
}
