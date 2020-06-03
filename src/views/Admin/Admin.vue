<template>
  <div class="layout">
    <Layout>
      <Header>
        <h2>后台管理系统</h2>
      </Header>
      <Layout :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '16px 0'}">
          <BreadcrumbItem to="/">设备端</BreadcrumbItem>
          <BreadcrumbItem to="/server">管理端</BreadcrumbItem>
          <BreadcrumbItem>后台</BreadcrumbItem>
        </Breadcrumb>
        <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
          <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
              <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']" accordion @on-select="select">
                <Submenu name="1">
                  <template slot="title">
                    <Icon type="ios-school" />
                    学生管理
                  </template>
                  <MenuItem name="1-4">查看学生名单</MenuItem>
                  <MenuItem name="1-2">学生名单删除</MenuItem>
                </Submenu>
                <Submenu name="2">
                  <template slot="title">
                    <Icon type="md-person" />
                    教师管理
                  </template>
                  <MenuItem name="2-1">教师名单增加</MenuItem>
                  <MenuItem name="2-2">教师名单删除</MenuItem>
                  <MenuItem name="2-3">教师名单修改</MenuItem>
                  <MenuItem name="2-4">查看教师名单</MenuItem>
                </Submenu>
                <Submenu name="3">
                  <template slot="title">
                    <Icon type="ios-analytics"></Icon>
                    课程管理
                  </template>
                  <MenuItem name="3-1">查看所有课程</MenuItem>
                  <MenuItem name="3-2">添加课程</MenuItem>
                  <MenuItem name="3-3">删除课程</MenuItem>
                </Submenu>
                <Submenu name="5">
                  <template slot="title">
                    <Icon type="ios-text" />
                    公告管理
                  </template>
                  <MenuItem name="5-1">查看所有公告</MenuItem>
                  <MenuItem name="5-2">添加公告</MenuItem>
                  <MenuItem name="5-4">删除</MenuItem>
                </Submenu>
              </Menu>
            </Sider>
            <Content :style="{padding: '24px', minHeight: '500px', background: '#fff'}">
              <StuAdd v-if="curCho==='1-1'"></StuAdd>
              <StuDel v-if="curCho==='1-2'"></StuDel>
              <StuMod v-if="curCho==='1-3'"></StuMod>
              <StuInfo v-if="curCho==='1-4'" :stuList="stuList"></StuInfo>
              <TeaAdd v-if="curCho==='2-1'"></TeaAdd>
              <TeaDel v-if="curCho==='2-2'"></TeaDel>
              <TeaMod v-if="curCho==='2-3'"></TeaMod>
              <TeaInfo v-if="curCho==='2-4'" :teaList="teaList"></TeaInfo>
              <ClassInfo v-if="curCho==='3-1'" :classList="classList"></ClassInfo>
              <div v-if="curCho==='3-2'">
                <Input v-model="addClassName" placeholder="课程名称" style="width: 300px" /><br>
                <Input v-model="addClassDate" placeholder="课程时间" style="width: 300px" /><br>
                <Input v-model="addClassTea" placeholder="任课教师" style="width: 300px" /><br>
                <Button type="primary" @click="addClass">添加</Button>
              </div>
              <div v-if="curCho==='3-3'">
                <Input v-model="delClassName" placeholder="课程名称" style="width: 300px" />
                <Button type="primary" @click="delClass">删除</Button>
              </div>
              <NoticeInfo v-if="curCho==='5-1'" :noticeList="noticeList"></NoticeInfo>
              <div v-if="curCho==='5-2'">
                <Input v-model="snoticeTitle" placeholder="公告题目" style="width: 300px" /> 
                <Input v-model="snoticeText" placeholder="公告内容" style="width: 300px" />
                <Button type="primary" @click="addNotice">添加</Button>
              </div>
              <div v-if="curCho==='5-4'">
                <Input v-model="sNoticeId" placeholder="公告Id" style="width: 300px" />
                <Button type="primary" @click="delNotice">删除</Button>
              </div>
            </Content>
          </Layout>
        </Content>
      </Layout>
      <Footer class="layout-footer-center">2019-2020 &copy; HongRuan</Footer>
    </Layout>
  </div>
</template>


<script>
import StuInfo from "@/views/Admin/Stu/Info.vue";
import StuAdd from "@/views/Admin/Stu/Add.vue";
import StuDel from "@/views/Admin/Stu/Del.vue";
import StuMod from "@/views/Admin/Stu/Mdfy.vue";
import TeaInfo from "@/views/Admin/Teacher/Info.vue";
import TeaAdd from "@/views/Admin/Teacher/Add.vue";
import TeaDel from "@/views/Admin/Teacher/Del.vue";
import TeaMod from "@/views/Admin/Teacher/Mdfy.vue";
import ClassInfo from "@/views/Admin/Cla/Info.vue";
import NoticeInfo from "@/views/Admin/NoticeInfo.vue";
import {
  _studentsShow,
  _teaShow,
  _lookNotice,
  _addNotice,
  _deleteNotice
} from "@/api/server";
export default {
  data() {
    return {
      curCho: "", // 当前选中的菜单
      // 学生名单
      stuList: [],
      teaList: [],
      noticeList: [],
      snoticeText: "",
      snoticeTitle: "",
      sNoticeId: "",
      classList: [
        {
          className: "C++",
          classDate: "周一 3-4节",
          teacher: "王老师"
        },
        {
          className: "JAVA",
          classDate: "周三 9-10节",
          teacher: "梁老师"
        }
      ],
      delClassName: "",
      addClassName: "",
      addClassDate: "",
      addClassTea: ""
    };
  },
  methods: {
    select(event) {
      this.curCho = event;
      if (this.curCho === "1-4") {
        //   获取学生名单
        _studentsShow().then(res => {
          if (res.code === 200) {
            this.stuList = res.data;
          } else {
            this.$Message.error("获取学生名单出错");
          }
        });
      } else if (this.curCho === "2-4") {
        //   获取教师名单
        _teaShow().then(res => {
          if (res.code === 200) {
            this.teaList = res.data;
          } else {
            this.$Message.error("获取教师名单出错");
          }
        });
      } else if (this.curCho === "5-1") {
        //   获取教师名单
        _lookNotice().then(res => {
          if (res.code === 200) {
            this.noticeList = res.data;
          } else {
            this.$message.error("获取公告单出错");
          }
        });
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
          this.$Message.error("操作失败");
        }
      });
    },
    // 删除公告
    delNotice() {
      _deleteNotice({
        sNoticeId: this.sNoticeId
      }).then(res => {
        if (res.code === 200) {
          this.$Message.success("操作成功");
        } else {
          this.$Message.error("操作失败");
        }
      });
    },
    // 删除课程
    delClass() {
      let index = 0;
      this.classList.forEach((v,i)=>{
        if(v.className == this.delClassName){
          index = i
          this.$Message.success("操作成功");
        }
      })
      this.delClassName = ""
      this.classList.splice(index,1)
    },
    // 添加课程
    addClass() {
      let obj = {
        className: this.addClassName,
        classDate: this.addClassDate,
        teacher: this.addClassTea
      };
      this.classList.push(obj);
      this.addClassName = "";
      this.addClassDate = "";
      this.addClassTea = "";
      this.$Message.success("操作成功");
    }
  },
  components: {
    StuInfo,
    StuAdd,
    StuDel,
    StuMod,
    TeaInfo,
    TeaAdd,
    TeaDel,
    TeaMod,
    ClassInfo,
    NoticeInfo
  }
};
</script>

<style scoped>
h2 {
  color: rgb(156, 148, 148);
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
}
</style>