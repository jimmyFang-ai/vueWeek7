<template>
 <div class="container mt-5">
    <form class="row justify-content-center "  @submit.prevent="signIn">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-4">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email" id="inputEmail" class="form-control"
                 placeholder="Email address" v-model="user.username" required autofocus>
        </div>
        <div class="mb-4">
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" id="inputPassword"
                 class="form-control" v-model="user.password" placeholder="Password" required></div>
        <div class="text-end mt-4">
          <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 身分資訊
      user: {
        username: '',
        password: ''
      }
    }
  },
  inject: ['emitter', '$httpMessageState'],
  methods: {
    // 串接登入api  用 post
    signIn () {
      const url = `${process.env.VUE_APP_URL}admin/signin`
      this.$http.post(url, this.user)
        .then(res => {
          if (res.data.success) {
            // 登入成功，把 rse.data 內 token、expired 的值 回傳至 const { token, expired } 變數中
            const { token, expired } = res.data
            // 寫入 cookie token
            // expired 設置有效時間
            document.cookie = `hexToken=${token};expires=${new Date(expired)};`
            this.$httpMessageState(res, '登入結果')
            // 切換至後台產品頁面
            this.$router.push('/admin/products')
            // console.log(res)
          } else {
            this.$httpMessageState(res, '登入結果')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
