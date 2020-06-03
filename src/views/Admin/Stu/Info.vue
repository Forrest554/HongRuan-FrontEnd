<template>
  <div>
    <Table :columns="columns" :data="stuList"></Table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "学号",
          key: "stuId"
        },
        {
          title: "姓名",
          key: "stuName"
        },
         {
          title: "班级",
          key: "className"
        }
      ]
    };
  },
  props: {
    stuList: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
</style>