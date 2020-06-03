
<template>
  <div class="layout">
    <Layout v-if="notLogin==false">
      <Header>
        <Menu mode="horizontal" theme="dark" :active-name=activeName @on-select="select">
          <div class="layout-nav">
            <h2>教师后台管理系统</h2>
            <MenuItem name="1">
            <Icon type="ios-navigate"></Icon>
            发布课程公告
            </MenuItem>
            <MenuItem name="2">
            <Icon type="ios-keypad"></Icon>
            课表管理
            </MenuItem>
            <MenuItem name="3">
            <Icon type="ios-keypad"></Icon>
            查看课程签到情况
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}">
          <BreadcrumbItem to="/">设备端</BreadcrumbItem>
          <BreadcrumbItem to="/admin">后台</BreadcrumbItem>
          <BreadcrumbItem>管理端</BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <div style="min-height: 500px;">
            <div v-if="activeName==='1'">
              发布课程公告
              <Input v-model="snoticeTitle" placeholder="公告题目" style="width: 300px" />
              <Input v-model="snoticeText" placeholder="公告内容" style="width: 300px" />
              <Button type="primary" @click="addNotice">添加</Button>
            </div>
            <div v-if="activeName==='2'">课表管理</div>
            <div v-if="activeName==='3'">
              <div class="title">查看课程签到情况</div>
              <Table :columns="signColumns" :data="signPho"></Table>
            </div>
          </div>
        </Card>
      </Content>
      <Footer class="layout-footer-center">2019-2020 &copy; HongRuan</Footer>
    </Layout>
    <Modal v-model="notLogin" :mask-closable="false" :closable="false">
      <Login @loginSucess="setLogin"></Login>
      <div slot="footer">
        <!-- 去除对话框底部 -->
      </div>
    </Modal>
  </div>
</template>
<script>
import { _addNotice } from "@/api/server";
import { _teaSignLook } from "@/api/teacher";
import Login from "@/components/Login.vue";
export default {
  data() {
    return {
      notLogin: true,
      activeName: "",
      snoticeText: "",
      snoticeTitle: "",
      signPho: [],
      signColumns: [
        {
          title: "学号",
          key: "stuId"
        },
        {
          title: "班级",
          key: "className"
        },
        {
          title: "姓名",
          key: "stuName"
        },
        {
          title: "课程名",
          key: "courseName"
        },
        {
          title: "签到时间",
          key: "date"
        },
        {
          title: "设备号",
          key: "deviceId"
        },
        {
          title: "教室号",
          key: "clroomId"
        },
        {
          title: "设备状态",
          key: "deviceHealth"
        }
      ]
    };
  },
  methods: {
    //  登录弹出框
    setLogin() {
      this.notLogin = false;
    },
    select(event) {
      this.activeName = event;
      if (this.activeName == "3") {
        this.teaSignLook();
      }
    },
    // 添加公告
    addNotice() {
      _addNotice({
        snoticeText: this.snoticeText,
        snoticeTitle: this.snoticeTitle
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$Message.success(res.data);
          this.snoticeText = "";
          this.snoticeTitle = "";
        } else {
          this.$message.error("操作失败");
        }
      });
    },
    // 查看签到情况
    teaSignLook() {
      _teaSignLook().then(res => {
        if (res.code == 200) {
          this.signPho = res.data.studentLookResult;
        } else {
          this.$Message.error("操作失败");
        }
      });
    }
  },
  components: {
    Login
  },
  beforeMount() {
    // 跳转到相应功能
    this.activeName = this.$route.params.index;
    if (this.activeName == "3") {
      this.teaSignLook();
    }
  }
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
  left: 45%;
}
.layout-nav {
  width: 500px;
  margin: 0 auto;
  margin-right: -90px;
}
.layout-footer-center {
  text-align: center;
}
.login {
  width: 500px;
  height: 100px;
  background-color: blue;
}
</style>
