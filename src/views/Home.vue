<template>
  <!-- 设备端首页 -->
  <div class="device">
    <HeaderTop title="虹软教室自主管理系统">
    </HeaderTop>
    <!-- 轮播图 -->
    <Carousel v-model="value1" class="swiper" loop autoplay trigger="hover" :autoplay-speed="4000">
      <CarouselItem>
        <div class="item" @click="showNotice">
          <img src="../assets/zjut_atumn.jpg" />
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="item">
          <img src="../assets/zjut_flower.jpg" />
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="item">
          <img src="../assets/zjut_snow.jpg" />
        </div>
      </CarouselItem>
    </Carousel>
    <!-- 课程信息显示 -->
    <div class="classInfo">
      <div class="info">
        <h3>课程信息</h3>
        <span>课程名：C++代码与设计</span> <br>
        <span>教师：钱能</span> <br>
        <span>开始时间：周一 3-4节；周四 7-8节；</span> <br>
      </div>
    </div>
    <!-- 具体功能内容块 -->
    <div class="container">
      <Row>
        <div @click="register" class="pointer">
          <i-col span="4" offset="1">
            <Card :bordered="false">
              <h3>学生信息录入</h3>
              <p>人脸识别</p>
              <p>班级</p>
              <p>学号</p>
            </Card>
          </i-col>
        </div>
        <div @click="sigin" class="pointer">
          <i-col span="4" offset="4">
            <Card :bordered="false">
              <h3>学生签到</h3>
              <p>人脸识别</p>
              <p>简易</p>
              <p>高效</p>
            </Card>
          </i-col>
        </div>
        <router-link to="/server_stu">
          <i-col span="4" offset="6">
            <Card :bordered="false">
              <h3>查看个人资料</h3>
              <p>个人信息</p>
              <p>个人课表</p>
              <p>个人签到情况</p>
            </Card>
          </i-col>
        </router-link>
      </Row>
      <Row class="row2">
        <div @click="goServer('1')" class="pointer">
          <i-col span="4" offset="1">
            <Card :bordered="false">
              <h3>课程公告</h3>
              <p>实时</p>
              <p>易达</p>
            </Card>
          </i-col>
        </div>
        <div @click="goServer('2')" class="pointer">
          <i-col span="4" offset="4">
            <Card :bordered="false">
              <h3>教师管理</h3>
              <p>发布课表</p>
              <p>修改课表</p>
              <p>删除课表</p>
            </Card>
          </i-col>
        </div>
        <div @click="goServer('3')" class="pointer">
          <i-col span="4" offset="6">
            <Card :bordered="false">
              <h3>签到情况</h3>
              <p>学生名单</p>
              <p>签到情况</p>
            </Card>
          </i-col>
        </div>
      </Row>
    </div>
    <!-- 注册 -->
    <Modal v-model="useFace" :title=faceTitle>
      <Face :isReg=isReg></Face>
    </Modal>

  </div>

</template>

<script>
import HeaderTop from "@/components/HeaderTop.vue";
import Face from "@/components/Face.vue";
import { _lookNotice } from "@/api/server";
export default {
  name: "Home",
  data() {
    return {
      value1: 0,
      useFace: false,
      faceTitle: "",
      isReg: false,
      noticeList: []
    };
  },
  methods: {
    // 转到服务端，并根据index，跳转到不同功能
    goServer(index) {
      this.$router.push({ name: "Server", params: { index: index } });
    },
    sigin() {
      this.useFace = true;
      this.faceTitle = "学生签到";
      this.isReg = false;
    },
    register() {
      this.useFace = true;
      this.faceTitle = "学生信息录入";
      this.isReg = true;
    },
    showNotice() {
      _lookNotice().then(res => {
        this.noticeList = res.data;
      });
      for (let i = 0; i < this.noticeList.length; i++) {
        this.$Message.info({
          content: "公告标题："+ this.noticeList[i].sNoticeTitle+'\n公告内容：'+ this.noticeList[i].sNoticeText,
          duration: 2
        });
      }
    }
  },
  components: {
    HeaderTop,
    Face
  },
  created() {}
};
</script>

<style scoped>
.device {
  position: absolute;
  background-color: #eeeeee;
  width: 100%;
  height: 100%;
}
.swiper {
  margin-top: 5px;
  height: 300px;
  width: 90%;
  left: 5%;
  background-color: rgba(181, 186, 201, 0.2);
}
.swiper .item {
  height: 300px;
}
.swiper img {
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: auto;
}
.classInfo {
  height: 120px;
  margin-top: 5px;
  position: relative;
  padding: 5px;
}
.info {
  background-color: #fff;
  width: 50%;
  height: 110px;
  position: absolute;
  left: 25%;
}
.container {
  margin-top: 10px;
  margin-left: 4px;
  margin-right: 4px;
  padding: 5px;
  overflow: hidden;
  border: 1px dashed rgb(150, 122, 122);
}
.container p {
  color: #a3a3a3;
  font-size: 10px;
}
.pointer {
  cursor: pointer;
}
h3 {
  color: black;
}
.row2 {
  margin-top: 40px;
  margin-bottom: 10px;
}
</style>
