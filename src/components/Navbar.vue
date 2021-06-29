<template>
 <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
     <span class="navbar-brand" >後台導覽頁</span>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerAltMarkUp" aria-controls="navbarTogglerAltMarkUp" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerAltMarkUp">
      <div class="navbar-nav">
        <router-link class="nav-link" to="/admin/products">產品列表</router-link>
        <router-link class="nav-link" to="/admin/orders">訂單</router-link>
        <router-link class="nav-link" to="/admin/coupons">優惠卷</router-link>
         <a href="#" class="nav-link"  @click.prevent="signOut">登出</a>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  // 注入吐司訊息方法
  inject: ['emitter', '$httpMessageState'],
  methods: {
    signOut () {
      const url = `${process.env.VUE_APP_URL}logout`
      this.$http.post(url)
        .then(res => {
          if (res.data.success) { this.$router.push('/') }
        })
    }
  }
}
</script>
