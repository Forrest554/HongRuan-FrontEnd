<template>
  <div>
    <Table :columns="columns" :data="classList"></Table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "课程名",
          key: "className"
        },
        {
          title: "课程名称",
          key: "classDate"
        },
        {
          title: "教师",
          key: "teacher"
        }
      ]
    };
  },
  props: {
    classList: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
</style>