<template>
  <div class="sign">
    <div class="camera_outer">
      <video v-if="imgSrc!=null" id="videoCamera" autoplay></video>
      <canvas style="display:none;" id="canvasCamera"></canvas>
      <div v-if="imgSrc" class="img_bg_camera">
        <p>人脸图像</p>
        <img :src="imgSrc" alt class="tx_img" />
      </div>
      <Button v-if="isReg==true" class="reging" @click="isreging">输入个人信息</Button>
      <div class="button">
        <Button @click="getCompetence()">打开摄像头</Button>
        <Button @click="setImage()">签到/录入信息</Button>
        <Button @click="signOut">签退</Button>
      </div>
      <!-- 信息录入时的表单 -->
      <Modal v-model="reging" title="Common Modal dialog box title">
        <Input v-model="className" placeholder="请输入班级" style="width: 300px" />
        <Input v-model="stuId" placeholder="请输入学号" style="width: 300px" />
        <Input v-model="studentName" placeholder="请输入姓名" style="width: 300px" />
      </Modal>
    </div>

  </div>
</template>

<script>
import { _register, _sign } from "@/api/index";

export default {
  props: {
    isReg: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      imgSrc: "",
      signCancas: null,
      signContext: null,
      signVideo: null,
      openVideo: false,
      reging: false,
      className: "",
      stuId: "",
      studentName: ""
    };
  },
  methods: {
    // 输入个人信息开启
    isreging() {
      this.reging = true;
    },
    // 调用权限（打开摄像头功能）
    getCompetence() {
      this.signCancas = document.getElementById("canvasCamera");
      this.signContext = this.signCancas.getContext("2d");
      this.signVideo = document.getElementById("videoCamera");
      this.signVideo.style.display = "block";
      // 获取媒体属性，旧版本浏览器可能不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
      // 使用getUserMedia，因为它会覆盖现有的属性。
      // 这里，如果缺少getUserMedia属性，就添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = constraints => {
          // 首先获取现存的getUserMedia(如果存在)
          let getUserMedia =
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.getUserMedia;
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {
            //不存在则报错
            return Promise.reject(
              new Error("getUserMedia is not implemented in this browser")
            );
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise((resolve, reject) => {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }
      let constraints = {
        audio: false,
        video: {
          width: this.videoWidth,
          height: this.videoHeight,
          transform: "scaleX(-1)"
        }
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          // 旧的浏览器可能没有srcObject
          if ("srcObject" in this.signVideo) {
            this.signVideo.srcObject = stream;
          } else {
            // 避免在新的浏览器中使用它，因为它正在被弃用。
            this.signVideo.src = window.URL.createObjectURL(stream);
          }
          this.signVideo.onloadedmetadata = e => {
            this.signVideo.play();
          };
        })
        .catch(err => {
          console.log(err);
        });
    },
    //  绘制图片（拍照功能）
    setImage() {
      // canvas画图
      this.signContext.drawImage(this.signVideo, 0, 0, 300, 120);
      // 获取图片base64链接
      let image = this.signCancas.toDataURL("image/png");
      this.imgSrc = image; //赋值并预览图片
      if (this.isReg == false) {
        _sign({
          file: this.imgSrc
        }).then(res => {
          if (res.code === 200) {
            this.$Message.success(res.data);
          } else {
            this.$Message.error("人脸信息错误或服务器错误");
          }
        });
      } else if (this.isReg == true) {
        _register({
          className: this.className,
          file: this.imgSrc,
          stuId: this.stuId,
          studentName: this.studentName
        }).then(res => {
          if (res.code === 200) {
            this.$Message.success(res.data);
          } else {
            this.$Message.error("人脸信息错误或服务器错误");
          }
        });
      }

      setTimeout(() => {
        this.stopNavigator();
        this.signInit();
      }, 4000);
    },
    // 关闭摄像头
    stopNavigator() {
      this.signVideo.srcObject.getTracks()[0].stop();
    },
    // base64转文件，此处没用到
    dataURLtoFile(dataurl, filename) {
      let arr = dataurl.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    // init
    signInit() {
      this.imgSrc = "";
      this.signCancas = null;
      this.signContext = null;
      this.signVideo = null;
      this.openVideo = false;
    },
    // 签退
    signOut() {
      this.$Message.success("签退成功");
    }
  }
};
</script>


<style lang="scss" scoped>
.camera_outer {
  position: relative;
  width: 500px;
  height: 400px;
  video {
    position: absolute;
    width: 400px;
    height: 350px;
    margin-left: 50px;
  }
  canvas,
  .tx_img {
    -moz-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    transform: scaleX(-1);
    position: absolute;
    width: 400px;
    height: 350px;
    margin-left: 50px;
  }
  .reging {
    position: absolute;
    width: 120px;
    margin-top: 330px;
    left: 50%;
    transform: translateX(-50%);
  }
  .button {
    position: absolute;
    margin-top: 370px;
    margin-left: 150px;
    width: 400px;
  }
}
</style>