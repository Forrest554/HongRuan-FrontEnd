<template>
  <div>
    <Table :columns="columns" :data="noticeList"></Table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "公告Id",
          key: "sNoticeId"
        },
        {
          title: "公告题目",
          key: "sNoticeTitle"
        },
        {
          title: "公告内容",
          key: "sNoticeText"
        },
        {
          title: "公告时间",
          key: "sNoticeDate"
        }
      ]
    };
  },
  props: {
    noticeList: {
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