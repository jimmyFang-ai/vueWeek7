<template>
 <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
     <span class="navbar-brand" >前台導覽頁</span>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerAltMarkUp" aria-controls="navbarTogglerAltMarkUp" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerAltMarkUp">
      <div class="navbar-nav">
        <router-link class="nav-link" to="/front/home">首頁</router-link>
        <router-link class="nav-link" to="/front/products">產品列表</router-link>
        <router-link class="nav-link" to="/front/cart">購物車</router-link>
      </div>
    </div>
  </div>
</nav>
</template>
