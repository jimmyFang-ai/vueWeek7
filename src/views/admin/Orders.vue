<template>
  <Loading :active="isLoading" :z-index="1060"></Loading>
  <table class="table mt-4">
    <thead>
       <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>編輯</th>
       </tr>
    </thead>
    <tbody>
         <template v-for="(item, key) in orders" :key="key">
           <!-- 如果訂單沒有付款就顯示 text-secondary顏色 -->
             <tr v-if="orders.length" :class="{'text-secondary': !item.is_paid }">
                  <!-- 訂單成立時間 -->
                  <td>{{$filters.date(item.create_at)}}</td>
                  <td><span v-text="item.user.email" v-if="item.user"></span></td>
                  <td>
                    <ul class="list-unstyled">
                      <li v-for="(product,i) in item.products" :key="i">
                        {{ product.product.title}} 數量: {{ product.qty}}
                        {{ product.product.unit}}
                      </li>
                    </ul>
                  </td>
                  <td class="text-right">{{ item.total }}</td>
                  <td>
                     <div class="form-check form-switch">
                         <input type="checkbox" class="form-check-input" :id="`paidSwitch${item.id}`" v-model="item.is_paid" @change="updatePaid(item)">
                         <label class="form-check-label" :for="`paidSwitch${item.id}`">
                           <span v-if="item.is_paid">已付款</span>
                           <span v-else>未付款</span>
                         </label>
                     </div>
                  </td>
                  <td>
                    <div class="btn-group">
                        <button class="btn btn-outline-primary btn-sm" @click="openModal(item)">檢視</button>
                        <button class="btn btn-outline-danger  btn-sm" @click="openDelOrderModal(item)">刪除</button>
                    </div>
                  </td>
                  <td></td>
             </tr>
         </template>
    </tbody>
  </table>

<!-- pagination -->
    <div class="d-flex justify-content-center mt-5" >
   <!-- 透過  元件間資料傳遞，並渲染至畫面 -->
   <pagination :page="pagination" @get-product="getOrders"></pagination>
  </div>

<!-- orderModal -->
  <orderModal :order="tempOrder"  @update-paid="updatePaid"  ref="orderModal" ></orderModal>
<!-- delProductModal -->
  <del-product-modal :product="tempOrder" @del-product="delOrders" ref="delModal"></del-product-modal>

</template>

<script>
// 刪除 modal
import delProductModal from '@/components/DelProductModal.vue'
// 購物車 modal
import orderModal from '@/components/OrderModal.vue'
// 匯入分頁元件
import pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      orders: {},
      isNew: false,
      pagination: {},
      isLoading: false,
      tempOrder: {},
      currentPage: 1
    }
  },
  inject: ['emitter', '$httpMessageState'],
  components: {
    pagination,
    delProductModal,
    orderModal
  },
  methods: {
    getOrders (currentPage = 1) {
      this.currentPage = currentPage
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/admin/orders?page=${currentPage}`
      this.isLoading = true
      this.$http.get(url, this.tempProduct)
        .then(res => {
          if (res.data.success) {
            this.orders = res.data.orders
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
    openModal (item) {
      this.tempOrder = { ...item }
      this.isNew = false
      const orderComponent = this.$refs.orderModal
      orderComponent.openModal()
    },
    openDelOrderModal (item) {
      this.tempOrder = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.openModal()
    },
    updatePaid (item) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`
      const paid = {
        is_paid: item.is_paid
      }
      this.$http.put(url, { data: paid })
        .then(res => {
          if (res.data.success) {
            this.isLoading = false
            const orderComponent = this.$refs.orderModal
            orderComponent.hideModal()
            this.$httpMessageState(res, '更新付款狀態')
            this.getOrders(this.currentPage)
          } else {
            console.log(res.data.massage)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    delOrders () {
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`
      this.isLoading = true
      this.$http.delete(url)
        .then(res => {
          if (res.data.success) {
            const delComponent = this.$refs.delModal
            delComponent.hideModal()
            this.getOrders(this.currentPage)
          } else {
            console.log(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
