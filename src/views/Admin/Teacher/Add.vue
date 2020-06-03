<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="工号" prop="teacherId">
        <Input v-model="formValidate.teacherId" placeholder="请输入工号" ></Input>
      </FormItem>
      <FormItem label="姓名" prop="teacherName">
        <Input v-model="formValidate.teacherName" placeholder="请输入姓名"></Input>
      </FormItem>
       <FormItem label="密码" prop="password">
        <Input type="password" v-model="formValidate.password" placeholder="请输入密码"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">添加</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { _teaAdd } from "@/api/server";
export default {
  data() {
    return {
      formValidate: {
        teacherName: "",
        teacherId: "",
        password:""
      },
      ruleValidate: {
        teacherName: [
          {
            required: true,
            message: "姓名不可为空",
            trigger: "blur"
          }
        ],
        teacherId: [
          {
            required: true,
            message: "工号不可为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      // 表单校验
      this.$refs[name].validate(valid => {
        if (valid) {
          _teaAdd(this.formValidate).then(res=>{
            console.log(res)
            this.$Message.success("添加成功!");
          })
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
