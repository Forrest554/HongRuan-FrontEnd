<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="工号" prop="teacherId">
        <Input v-model="formValidate.teacherId" placeholder="请输入工号"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">删除</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { _teaDel } from "@/api/server";
export default {
  data() {
    return {
      formValidate: {
        teacherId: ""
      },
      ruleValidate: {
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
          _teaDel(this.formValidate).then(res => {
            console.log(res);
            this.$Message.success("删除成功!");
          });
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
