<template>
      <Loading :active="isLoading"></Loading>
      <div class="container mt-5">
              <table class="table  table-hover align-middle">
                      <thead class="table-dark">
                              <tr>
                                  <th>圖片</th>
                                  <th>商品名稱</th>
                                  <th>價格</th>
                                  <th></th>
                              </tr>
                     </thead>
                      <tbody v-for="product in products" :key="product.id">
                     <!-- 取得產品列表 並渲染畫面 -->
                       <tr>
                          <td style="width: 200px">
                            <div style="height: 100px; background-size: cover; background-position: center"
                                 :style="{ backgroundImage: `url(${product.imageUrl})`}"></div>
                          </td>
                          <td>{{product.title}}</td>
                          <td>
                              <div class="h5"> ${{product.price}}元</div>
                          </td>
                          <td>
                             <div class="btn-group btn-group-sm">
                                 <button type="button" class="btn btn-outline-secondary"  @click="getProduct(product.id)" :disabled="lodingSatus.lodingItem === product.id">
                                 <i class="fas fa-spinner fa-pulse " v-if="lodingSatus.lodingItem === product.id"></i>查看更多
                                </button>
                                 <button type="button" class="btn btn-outline-danger" @click="addCart(product.id)"  :disabled="lodingSatus.lodingItem === product.id">
                                   <i class="fas fa-spinner fa-pulse"  v-if="lodingSatus.lodingItem === product.id"></i>加入購物車
                                 </button>
                              </div>
                           </td>
                       </tr>
                   </tbody>
              </table>
               <user-product-modal  ref="userProductModal" :product="product" @add-to-cart="addCart"></user-product-modal>
      </div>
</template>

<script>
import userProductModal from '@/components/UserProductModal.vue'

export default {
  data () {
    return {
      products: [],
      // 載入讀取效果
      lodingSatus: {
        lodingItem: ''
      },
      isLoading: false,
      product: {}
    }
  },
  // 區域註冊 UserProductModal.vue
  components: {
    userProductModal
  },
  created () {
    this.getProducts()
  },
  methods: {
    // 加入購物車
    addCart (id, qty = 1) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/cart`
      this.lodingSatus.lodingItem = id
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(url, { data: cart })
        .then(res => {
          if (res.data.success) {
            alert(res.data.message)
            this.lodingSatus.lodingItem = ''
            this.$refs.userProductModal.hideModal()
            this.isLoading = false
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 取得產品列表
    getProducts () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/products`
      // 調用Vue axios方法 this.$http
      this.$http.get(url)
        .then(res => {
          // console.log(res)
          if (res.data.success) {
            this.products = res.data.products
            this.isLoading = false
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 取得單一產品
    getProduct (id) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/product/${id}`
      // 點擊取得單一產品 取得 id 儲存至 lodingItem
      this.lodingSatus.lodingItem = id
      this.$http.get(url)
        .then(res => {
          // console.log(res)
          if (res.data.success) {
            // 解除 關閉讀取效果
            this.lodingSatus.lodingItem = ''
            this.product = res.data.product
            this.isLoading = false
            this.$refs.userProductModal.openModal()
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
