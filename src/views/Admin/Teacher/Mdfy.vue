<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="工号" prop="teacherId">
        <Input v-model="formValidate.teacherId" placeholder="请输入工号"></Input>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input v-model="formValidate.password" type="password" placeholder="请输入新密码"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">修改</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { _teaUpt } from "@/api/server";
export default {
  data() {
    return {
      formValidate: {
        teacherId: "",
        password: ""
      },
      ruleValidate: {
        teacherId: [
          {
            required: true,
            message: "工号不可为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不可为空",
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
          _teaUpt(this.formValidate).then(res => {
            this.$Message.success("修改成功!");
            this.formValidate.teacherId = "";
            this.formValidate.password = "";
          });
          // 后端修改
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
