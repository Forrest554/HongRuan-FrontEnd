<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="原学号" prop="oSno">
        <Input v-model="formValidate.oSno" placeholder="请输入原学号" ></Input>
      </FormItem>
      <FormItem label="原姓名" prop="oName">
        <Input v-model="formValidate.oName" placeholder="请输入原姓名"></Input>
      </FormItem>
      <FormItem label="新学号" prop="nSno">
        <Input v-model="formValidate.nSno" placeholder="请输入新学号" ></Input>
      </FormItem>
      <FormItem label="新姓名" prop="nName">
        <Input v-model="formValidate.nName" placeholder="请输入新姓名"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">修改</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formValidate: {
        oSno: "",
        nsno: "",
        oName: "",
        nName: "",
      },
      ruleValidate: {
        oName: [
          {
            required: true,
            message: "原姓名不可为空",
            trigger: "blur"
          }
        ],
        oSno: [
          {
            required: true,
            message: "原学号不可为空",
            trigger: "blur"
          }
        ],
        nName: [
          {
            required: true,
            message: "新姓名不可为空",
            trigger: "blur"
          }
        ],
        nSno: [
          {
            required: true,
            message: "新学号不可为空",
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
          // 后端修改
          this.$Message.success("修改成功!");
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
