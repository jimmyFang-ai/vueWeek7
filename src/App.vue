<template>
         <ToastMessages/>
         <router-view/>
</template>

<script>
// 匯入吐司訊息元件
import ToastMessages from '@/components/ToastMessages.vue'
// 匯入 mitt 元件
import emitter from '@/methods/emitter'
// 匯入更新內容訊息
import $httpMessageState from '@/methods/pushMessageState'

export default {
  provide () {
    return {
      emitter,
      $httpMessageState
    }
  },
  components: {
    ToastMessages
  }
}
</script>

<style lang="scss">
@import './assets/all';
// 推薦使用 CDN，因為 svg 不一定可以從 node_modules 導出
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.0/font/bootstrap-icons.css");
</style>
