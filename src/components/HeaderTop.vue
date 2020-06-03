<template>
  <header class="header">
    <!-- <a class="hr_logo" href="/" title="虹软教室管理"></a> -->
    <div class="nav">
      <!-- <ul>
        <li>
          <router-link to="/">
            <Icon type="ios-home" size="22px" color="#fff" />首页</router-link>
        </li>
        <li>
          <router-link to="/about">
            <Icon type="ios-paper" size="22px" color="#fff" />abuot</router-link>
        </li>
      </ul> -->
    </div>
    <!-- 插槽是父组件与子组件的通讯方式，子组件中的slot可以显示父组件传递给子组件的内容 -->
    <slot name="left"></slot>
    <span class="header_title">
      <span class="header_title_text">{{title}}</span>
    </span>
    <slot name="right"></slot>
  </header>
</template>

<script>
export default {
  // 外部组件传递给此组件的属性
  props: {
    title: String
  },
  methods: {}
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
.header {
  background-color: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 35px;

  .nav {
    height: 35px;
    position: absolute;
    top: 50%;
    left: 30px;
    transform: translateY(-50%);

    ul {
      overflow: hidden;
    }

    li {
      list-style: none;
      float: left;
      font-size: 16px;
      line-height: 35px;
      padding: 0 8px;
      margin-left: 0px;
    }
  }

  .header_title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30%;
    color: #fff;
    text-align: center;

    .header_title_text {
      font-size: 18px;
      color: #fff;
      display: block;
    }
  }
}
</style>
