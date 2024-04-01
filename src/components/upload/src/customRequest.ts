import { UploadRequest, RequestOption, UploadOption } from './interface';

import { compressImg, changeImageName } from './imgCompress';
import imageCompression from 'browser-image-compression';
import OSS from 'ali-oss';

const reg = /\.(png|jpg|gif|jpeg|webp|PNG|JPG|JPEG)$/;

const regForProgress = /\.(png|jpg|jpeg|PNG|JPG|JPEG)$/;
export function testImage(name: string): boolean {
  return regForProgress.test(name);
}

function getSuffix(filename: any): string {
  const pos = filename.lastIndexOf('.');
  let suffix = '';
  if (pos !== -1) {
    suffix = filename.substring(pos);
  }
  return suffix;
}

async function ossUpload() {
  const info: any = await fetch('/api/image/sts');
  const client = new OSS({
    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: 'oss-cn-beijing',
    // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
    accessKeyId: info.AccessKeyId,
    accessKeySecret: info.AccessKeySecret,
    // 从STS服务获取的安全令牌（SecurityToken）。
    stsToken: info.SecurityToken,
    refreshSTSToken: async () => {
      // 向您搭建的STS服务获取临时访问凭证。
      const info: any = await fetch('/api/image/sts');
      return {
        accessKeyId: info.AccessKeyId,
        accessKeySecret: info.AccessKeySecret,
        stsToken: info.SecurityToken
      };
    },
    // 刷新临时访问凭证的时间间隔，单位为毫秒。
    refreshSTSTokenInterval: 300000,
    // 填写Bucket名称。
    bucket: 'thkj-intel'
  });
  return client;
}

export const getFileNameUUID = (): string => {
  function rx(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return `${Number(new Date())}_${rx()}${rx()}`;
};

export function getCustomRequest(options: UploadOption): typeof customRequest {
  return async function customRequest(
    option: RequestOption,
    before = () => {},
    success = () => {},
    error = () => {}
  ): Promise<UploadRequest> {
    const { onProgress, onError, onSuccess, fileItem, name, action } = option;

    before();

    if (!action) {
      const client: any = ossUpload();
      const fileName = `/files/${getFileNameUUID()}${getSuffix(fileItem.name)}`;
      const result = await client.put(fileName, fileItem, options);

      if (result.statusCode === 200)
        onSuccess({
          url: `https://${result.Location}`,
          name: fileItem.name
        });
      else onError(result);

      return {
        abort() {
          client.cancel();
        }
      };
    }
    // 执行自带的
    const xhr = new XMLHttpRequest();
    // xhr.withCredentials = true
    if (xhr.upload) {
      xhr.upload.onprogress = function (event) {
        let percent = 0;
        if (event.total > 0) {
          percent = (event.loaded / event.total) * 100;
        }
        onProgress(Number(percent), event);
      };
    }
    xhr.onerror = function (e) {
      onError(e);
      error();
    };
    xhr.onload = function onload() {
      if (xhr.status < 200 || xhr.status >= 300) {
        return onError(xhr.responseText);
      }
      const result = JSON.parse(xhr.response);
      if (result?.code === 200) {
        onSuccess(result);
        success();
      } else {
        onError();
        error();
      }
    };
    const nameStr =
      typeof name === 'string'
        ? name
        : typeof name === 'function'
          ? name(fileItem)
          : '';
    const formData = new FormData();
    formData.append('name', fileItem.name || '');
    formData.append('success_action_status', '200');
    formData.append(nameStr || 'file', fileItem.file as File);

    xhr.open('put', action || '', true);
    before();
    xhr.send(formData);

    return {
      abort() {
        xhr.abort();
      }
    };
  };
}

export async function customRequest(
  option: RequestOption,
  before = () => {},
  success = () => {},
  error = () => {}
): Promise<UploadRequest> {
  const { onProgress, onError, onSuccess, fileItem, name, action } = option;
  if (testImage(fileItem.name || '')) {
    // fileItem.file = await compressImg(fileItem.file) || fileItem.file
    const blob: any = await imageCompression(fileItem.file as File, {
      maxWidthOrHeight: 2500,
      maxSizeMB: 10,
      useWebWorker: true,
      fileType: 'image/jpeg',
      initialQuality: 1
    });
    fileItem.file = new File([blob], changeImageName(blob.name), {
      type: 'image/jpeg'
    });
    fileItem.name = fileItem.file.name;
    // name = fileItem.file?.name
  }
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  if (xhr.upload) {
    xhr.upload.onprogress = function (event) {
      let percent = 0;
      if (event.total > 0) {
        percent = (event.loaded / event.total) * 100;
      }
      onProgress(Number(percent), event);
    };
  }
  xhr.onerror = function (e) {
    onError(e);
    error();
  };
  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return onError(xhr.responseText);
    }
    const result = JSON.parse(xhr.response);
    if (result?.code === 200) {
      onSuccess(result);
      success();
    } else {
      onError();
      error();
    }
  };
  const nameStr =
    typeof name === 'string'
      ? name
      : typeof name === 'function'
        ? name(fileItem)
        : '';
  const formData = new FormData();
  formData.append(nameStr || 'file', fileItem.file as File);
  xhr.open('post', action as string, true);
  before();
  xhr.send(formData);

  return {
    abort() {
      xhr.abort();
    }
  };
}
