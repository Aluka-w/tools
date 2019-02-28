import React from "react";
// 通过FileReader, 读取图片
export default class UploadPic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewPic: ""
    };
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload(e) {
    console.log(e.target.files[0]);
    const reader = new FileReader();
    // 读取文件内容，结果用data:url的字符串形式表示
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function(e) {
      console.log(e.target.result); // 上传的图片的编码
      this.setState({
        previewPic: e.target.result
      });
    }.bind(this);
  }

  render() {
    const { previewPic } = this.state;
    return (
      <div id="upload-pic">
        <input type="file" className="file" onChange={this.handleUpload} />
        <div>
          <img src={previewPic} alt="" style={{ width: "70px" }} />
        </div>
      </div>
    );
  }
}
