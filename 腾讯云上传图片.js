// react + antd-mobiled + 腾讯云上传图片

const appId = 31318;

import React, { Component } from "react";
import lrz from 'lrz';
import { uploadFileToTencent } from './api/index';

class Image extends Component {
  constructor (props) {
    super(props)
    this.state = {
      headImgList: [{url: ''}],       // 上传的图片列表
      headImgLoading: false,          // 上传的loading
    }
  }
  // 图片处理公共方法
  handleCustomRequest = (fileData, callback) => {
    const formatReg = /\.(jpg|jpeg|png|gif)$/i
    if (fileData.file.size / 1024 / 1024 > 1) {
      Toast.info('上传图片过大', 3)
      return
    }

    if (fileData.file.name.search(formatReg) === -1) {
      Toast.info('请选择正确的文件类型', 3)
      return
    }
    const mediaFile = fileData.file
    const fileNameArray = mediaFile.name.split('.')
    const postfix = fileNameArray[fileNameArray.length - 1] //文件后缀名
    const fileName = new Date().getTime() + '.' + postfix //新的文件名
    const newFile = new File([mediaFile], fileName)
    const formData = new FormData()

    formData.append('appId', appId)
    formData.append('domain', 'skintest.hetyj.com')
    formData.append('file', newFile)
    // 
    uploadFileToTencent({
      data: formData,
      config: {
        processData: false,
        contentType: false,
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    }).then(res => {
      if (res && res.code === 0) {
        if (typeof callback === 'function') {
          callback(res.data)
        }
      } else {
        Toast.info('上传图片失败', 3)
        callback()
      }
    })
  }
  // 压缩图片(大于1M), 然后再上传
  handleImgChange = (files, type) => {
    const { headImgList } = this.state
    if (type === 'add') {
      this.setState({ headImgLoading: true }, () => {
        const photoData = files[files.length - 1]
        // 大于1M的图片进行压缩, 小于的原图上传
        if (photoData.file.size / 1024 / 1024 > 1) {
          // 压缩图片的插件
          lrz(photoData.url, { quality: 0.1 })
            .then(rst => {
              // console.log('压缩之后图片大小(KB)', rst.fileLen / 1024)
              const fileData = {}
              const newFile = new File([rst.file], photoData.file.name)
              fileData.file = newFile
              fileData.url = rst.base64
              // console.log('拼凑出来的fileData对象', fileData);
              // 处理成功会执行, data.url即为上传之后的url
              this.handleCustomRequest(fileData, data => {
                if (data) {
                  // headImgList.push({ url: data.url });     // 上传多张, 且有上传按钮
                  headImgList[0] = { url: data.url }          // 上传1张, 且上传按钮覆盖在照片上方(透明)
                  this.setState(
                    { headImgList, headImgLoading: false },
                  )
                } else {
                  this.setState({ headImgLoading: false })
                }
              })
            })
            .catch(() => {
              this.setState({ headImgLoading: false })
            })
        } else {
          this.handleCustomRequest(photoData, data => {
            // headImgList.push({ url: data.url });
            headImgList[0] = { url: data.url }
            this.setState({ headImgList, headImgLoading: false }, () =>
              this.handleUpdateCustomerInfo(data.url)
            )
          })
        }
      })
    } else if (type === 'remove') {
      this.setState({ headImgList: files })
    }
  }
  render () {
    const { headImgList } = this.state;
    return (
      <ImagePicker
        className="data-manage-icon"
        files={headImgList}
        onChange={this.handleImgChange}
        onImageClick={(index, fs) => console.log(index, fs)}
        selectable={headImgList.length < 2}
        multiple={false}
        disableDelete={true}
      />
    )
  }
}
export default Image;
