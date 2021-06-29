<template>
<div class="toast-container position-absolute  pe-3 top-0 end-0" style="z-index: 1500">
  <div class="toast show" role="alert" v-for="(msg,key) in messages" :key="key">
    <div class="toast-header">
      <span class="p-2 rounded me-2 d-inline-block" :class="`bg-${msg.style}`"></span>
      <strong class="me-auto">{{ msg.title}}</strong>
      <button type="button" class="btn-close" aria-label="Close" @click="clearToast(key)"></button>
    </div>
    <div class="toast-body" v-if="msg.content">
      {{ msg.content}}
    </div>
  </div>
</div>
</template>

<script>

export default {
  data () {
    return {
      messages: []
    }
  },
  // 注入 mitt套件方法
  inject: ['emitter'],
  methods: {
    toastShow () {
      setTimeout(() => {
        // 刪除陣列第一筆資料
        this.messages.shift()
      }, 6000)
    },
    clearToast (index) {
      // 刪除索引位置的一筆資料
      this.messages.splice(index, 1)
    }
  },
  mounted () {
    // 監聽 透過mitt套件 傳送的資料
    this.emitter.on('push-message', (message) => {
      //  並將傳進來的 message參數內容解構
      const { style = 'success', title, content } = message
      //  將解構完的資料內容推送到 messages陣列中
      this.messages.push({ style, title, content })
      this.toastShow()
    })
  }
}
</script>
