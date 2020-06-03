<template>
  <div>
    <Table :columns="columns" :data="teaList"></Table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "工号",
          key: "teacherId"
        },
        {
          title: "姓名",
          key: "teacherName"
        }
      ]
    };
  },
  props: {
    teaList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    name() {
      
    }
  },
  created () {
    ;
  },
};
</script>

<style scoped>
</style>