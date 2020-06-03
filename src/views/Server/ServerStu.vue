
<template>
  <div class="layout">
    <Layout v-if="notLogin==false">
      <Header>
        <h2>学生后台</h2>
        </Menu>
      </Header>
      <Breadcrumb :style="{margin: '20px 0'}">
        <BreadcrumbItem to="/">设备端</BreadcrumbItem>
        <BreadcrumbItem>学生后台</BreadcrumbItem>
      </Breadcrumb>
      <Content class="content">
        <Card>
          <div style="min-height: 500px; ">
            <div class="info">
              姓名：{{stuInfo.stuName}} <br>
              学号：{{stuInfo.stuId}}<br>
              班级：{{stuInfo.className}}<br>
              课程：C++<br>
              签到：{{isSign}}<br>
            </div>
          </div>
        </Card>
      </Content>
      <Footer class="layout-footer-center">2019-2020 &copy; HongRuan</Footer>
    </Layout>
    <Modal v-model="notLogin" :mask-closable="false" :closable="false" @on-cancel="cnacel" @on-ok="getStuInfo">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>请输入学号</span>
      </p>
      <Input v-model="studentId" placeholder="学号" class="inputSno" />
    </Modal>
  </div>
</template>
<script>
import { _getStuInfo } from "@/api/index";
export default {
  data() {
    return {
      notLogin: true,
      studentId: "",
      stuInfo: {},
      imgSrc: "data:image/jpeg;base64,",
      isSign: ""
    };
  },
  methods: {
    //  登录弹出框
    setLogin() {
      this.notLogin = false;
    },
    // 学号输入返回信息
    getStuInfo() {
      _getStuInfo({
        studentId: this.studentId
      }).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.$Message.success("输入正确");
          this.stuInfo = res.data;
          // base64 转 图片
          this.imgSrc  = this.imgSrc + res.data.stuface
          if (this.stuInfo.signOn === true) {
            this.isSign = "已签到";
          } else {
            this.isSign = "未签到";
          }
        } else {
          this.$Message.error("学号不存在或者错误");
        }
      });
    },
    // 取消输入学号
    cnacel() {
      this.$router.replace("/");
    }
  },
  components: {}
};
</script>
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
h2 {
  display: inline-block;
  color: rgb(187, 177, 177);
  position: absolute;
  left: 50%;
}
.layout-footer-center {
  text-align: center;
}
.content {
  padding: 0 50px;
}
.info {
  /* margin-top: 100px; */
}
.inputSno {
  width: 500px;
  height: 50px;
}
</style>
