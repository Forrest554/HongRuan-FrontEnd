<template>
  <Form ref="formInline" :model="formInline" :rules="ruleInline" class="form">
    <span>教师登录</span>
    <FormItem prop="teacherId">
      <Input type="text" v-model="formInline.teacherId" placeholder="工号">
      <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="formInline.password" placeholder="密码">
      <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Button type="primary" class="btn" @click="handleSubmit('formInline')">登录</Button>
    </FormItem>
  </Form>
</template>
<script>
import { _teaLogin } from "@/api/teacher";
export default {
  data() {
    return {
      formInline: {
        teacherId: "",
        password: ""
      },
      ruleInline: {
        teacherId: [
          {
            required: true,
            message: "请输入教师工号",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码.",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码至少为6位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          _teaLogin(this.formInline).then(res => {
            console.log(res);
            if (res.code === 200) {
              this.$Message.success("登录成功");
              this.$emit("loginSucess", "sucess");
            }else {
              this.$Message.error("账号密码错误或服务器错误");
            }
          });
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  }
};
</script>
<style  scoped>
.form {
  margin-top: 10px;
  width: 480px;
  height: 180px;
}
span {
  display: inline-block;
  width: 100px;
  margin-left: 190px;
  margin-bottom: 15px;
  text-align: center;
  font-size: 18px;
}
.btn {
  width: 60px;
  margin-left: 210px;
}
</style>
