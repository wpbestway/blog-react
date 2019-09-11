<template>
  <div class="t-main-wrap">
    <a-layout style="height: 100%">
      <a-layout-sider>
        <a-menu
          @click="handleClickMenu"
          theme="dark"
          style="width: 100%"
          mode="inline"
        >
          <a-menu-item key="/home">首页</a-menu-item>
          <a-menu-item key="/about">介绍页</a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff"></a-layout-header>
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    name: 'TMain',
  })

  export default class TMain extends Vue {};
</script>

<style lang="scss">
.t-main-wrap{
  height: 100%;
}
</style>