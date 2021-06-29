<template>
   <Navbar/>
    <div class="container-fluid mt-3 position-relative">
    <router-view v-if="checkSuccess"></router-view>
    </div>
</template>

<script>
// 匯入 Navbar
import Navbar from '@/components/Navbar.vue'

export default {
  // 註冊 Navbar 元件
  components: {
    Navbar
  },
  data () {
    return {
      checkSuccess: false
    }
  },
  inject: ['$httpMessageState'],
  created () {
    // 取出登入畫面存取在資料庫的 token 值
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')

    // 如果用戶有這個token把它取出來，存取在header.Authorization 並發送請求給伺服器驗證

    this.$http.defaults.headers.common.Authorization = `${token}`

    const url = `${process.env.VUE_APP_URL}api/user/check`
    this.$http.post(url)
      .then(res => {
        if (res.data.success) {
          this.checkSuccess = true
        } else {
          this.$httpMessageState(res, '登入結果')
          this.$router.push('/')
        }
      })
  }
}
</script>
