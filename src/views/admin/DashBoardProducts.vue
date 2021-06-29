<template>
<div>
   <Loading :active="isLoading" :z-index="1060"></Loading>
   <div class="text-end mt-4">
          <button class="btn btn-primary" @click="openModal(true)">
            建立新的產品
          </button>
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
              <th width="120">
                分類
              </th>
              <th>產品名稱</th>
              <th width="120">
                原價
              </th>
              <th width="120">
                售價
              </th>
              <th width="100">
                是否啟用
              </th>
              <th width="120">
                編輯
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td> {{ product.category }}</td>
              <td> {{ product.title}}</td>
              <td> {{ $filters.currency(product.origin_price) }}</td>
              <td> {{ $filters.currency(product.price)}}</td>
              <td>
                <span v-if="product.is_enabled" class="text-success">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal(false,product)">
                    編輯
                  </button>
                  <button type="button" class="btn btn-outline-danger btn-sm" @click="openDelProductModal(product)">
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
   <!-- pagination -->
    <div class="d-flex justify-content-center mt-5" >
   <!-- 透過  元件間資料傳遞，並渲染至畫面 -->
   <pagination :page="pagination" @get-product="getProducts"></pagination>
  </div>

  <!-- productModal (html結構及屬性標籤必須小寫或用 "-" 隔開)-->
 <product-modal :product="tempProduct" @update-product="updateProduct" :isNew="isNew" ref="productModal"></product-modal>

<!-- delProductModal -->
  <del-product-modal :product="tempProduct" @del-product="delProduct" ref="delModal"></del-product-modal>

</div>
</template>

<script>
// 刪除 modal
import delProductModal from '@/components/DelProductModal.vue'
// 產品modal
import productModal from '@/components/AdminProductModal.vue'
// 匯入分頁元件
import pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {
        imagesUrl: []
      },
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false
      },
      model: {
        editModal: '',
        delModal: ''
      },
      currentPage: 1
    }
  },
  components: {
    // 刪除產品 moddal
    delProductModal,
    // 產品modal
    productModal,
    // 區域註冊分頁元件
    pagination
  },
  inject: ['emitter', '$httpMessageState'],
  methods: {
    // 切換頁面並重新取得產品列表
    getProducts (page = 1) {
      this.currentPage = page
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`
      this.isLoading = true
      this.$http.get(url)
        .then(res => {
          // console.log(res)
          if (res.data.success) {
            this.products = res.data.products
            this.pagination = res.data.pagination
            this.isLoading = false
          } else {
            console.log(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    openModal (isNew, item) {
      if (isNew) {
        // 如果是 建立新產品的 modal時，tempProduct要清空內容
        this.tempProduct = {}
        this.isNew = true
      } else {
        this.tempProduct = { ...item }
        this.isNew = false
      }
      const productComponent = this.$refs.productModal
      productComponent.openModal()
    },
    updateProduct (item) {
      this.tempProduct = item
      let url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethod = 'post'
      let status = '新增產品'
      if (!this.isNew) {
        url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
        httpMethod = 'put'
        status = '更新產品'
      }
      const productComponent = this.$refs.productModal
      this.$http[httpMethod](url, { data: this.tempProduct })
        .then(res => {
          if (res.data.success) {
            this.$httpMessageState(res, status)
            productComponent.hideModal()
            this.getProducts(this.currentPage)
          } else {
            this.$httpMessageState(res, status)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    openDelProductModal (item) {
      this.tempProduct = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.openModal()
    },
    delProduct () {
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      this.isLoading = true
      this.$http.delete(url)
        .then(res => {
          if (res.data.success) {
            this.$httpMessageState(res, '刪除產品')
            const delComponent = this.$refs.delModal
            delComponent.hideModal()
            this.getProducts(this.currentPage)
          } else {
            this.$httpMessageState(res, '刪除產品')
          }
        })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
