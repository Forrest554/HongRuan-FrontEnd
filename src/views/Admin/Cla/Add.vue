<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="学号" prop="sno">
        <Input v-model="formValidate.sno" placeholder="请输入学号" type="number"></Input>
      </FormItem>
      <FormItem label="姓名" prop="name">
        <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">添加</Button>
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
        name: "",
        sno: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "姓名不可为空",
            trigger: "blur"
          }
        ],
        sno: [
          {
            required: true,
            message: "学号不可为空",
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
          console.log(this.formValidate)
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
