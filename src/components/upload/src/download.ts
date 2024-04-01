function getBlob(url:string) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response)
      }
    }
    xhr.send()
  })
}

function saveAsFile(blob:Blob, fileName: string) {
  const filename = fileName.trim()
  if (navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename)
  } else {
    let a = document.createElement('a')
    let body : HTMLBodyElement|null = document.querySelector('body')
    a.href = window.URL.createObjectURL(blob)
    a.download = filename
    a.style.display = 'none'
    body?.appendChild(a)
    a.click()
    body?.removeChild(a)
    window.URL.revokeObjectURL(a.href)
  }
}
/**
 * 下载文件，并修改文件名
 * @param {*} ossUrl
 * @param {*} fileName
 */

export const downloadFile = (ossUrl: string, fileName:string) => {
  getBlob(ossUrl).then((blob:any) => {
    saveAsFile(blob, fileName)
  })
}