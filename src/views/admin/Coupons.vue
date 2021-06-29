<template>
   <Loading :active="isLoading" :z-index="1060"></Loading>
   <div class="text-end mt-4">
       <button type="button" class="btn btn-primary" @click="openCouponModal(true)">建立新的優惠卷</button>
   </div>
   <table class="table mt-4">
       <thead>
          <tr>
             <th>名稱</th>
             <th>折扣百分比</th>
             <th>到期日</th>
             <th>是否啟用</th>
              <th>編輯</th>
         </tr>
       </thead>
       <tbody>
           <tr v-for="(item,key) in coupons" :key="key">
               <td>{{item.title}}</td>
               <td>{{item.percent}}%</td>
               <td>{{$filters.date(item.due_date)}}</td>
               <td>
                   <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
                   <span v-else class="text-muted">未啟用</span>
               </td>
               <td>
                   <div class="btn-group">
                        <button type="button" class="btn btn-outline-primary btn-sm" @click="openCouponModal(false, item)">編輯</button>
                        <button type="button" class="btn btn-outline-danger  btn-sm" @click="openDelCouponModal(item)"> 刪除</button>
                   </div>
               </td>
           </tr>
       </tbody>
   </table>

   <!-- couponModal -->
<couponModal ref="couponModal" :coupon="tempCoupon" :is-New="isNew"  @update-coupon="updateCoupon"></couponModal>
   <!-- delProductModal -->
  <del-product-modal :product="tempCoupon" @del-product="delCoupon" ref="delModal"></del-product-modal>
</template>

<script>
// couponModal
import couponModal from '@/components/CouponModal.vue'
// 刪除 modal
import delProductModal from '@/components/DelProductModal.vue'
export default {
  components: {
    couponModal,
    delProductModal
  },
  props: {
    config: Object
  },
  data () {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      isLoading: false,
      isNew: false
    }
  },
  inject: ['emitter', '$httpMessageState'],
  methods: {
    getCoupons () {
      this.isLoading = true
      const url = ` ${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/admin/coupons`
      this.$http.get(url, this.tempProduct)
        .then(res => {
          if (res.data.success) {
            this.coupons = res.data.coupons
            this.isLoading = false
          } else {
            console.log(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    openCouponModal (isNew, item) {
      this.isNew = isNew
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000
        }
      } else {
        this.tempCoupon = { ...item }
      }
      this.$refs.couponModal.openModal()
    },
    openDelCouponModal (item) {
      this.tempCoupon = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.openModal()
    },
    updateCoupon (tempCoupon) {
      this.isLoading = true
      // 新增優惠卷
      if (this.isNew) {
        const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/admin/coupon`
        this.$http.post(url, { data: tempCoupon })
          .then(res => {
            if (res.data.success) {
              this.$httpMessageState(res, '新增優惠卷')
              this.isLoading = false
              this.getCoupons()
              this.$refs.couponModal.hideModal()
            } else {
              this.$httpMessageState(res, '更新優惠卷')
              this.isLoading = false
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        // 修改優惠卷
        const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
        this.$http.put(url, { data: this.tempCoupon })
          .then(res => {
            if (res.data.success) {
              this.$httpMessageState(res, '更新優惠卷')
              this.isLoading = false
              this.getCoupons()
              this.$refs.couponModal.hideModal()
            } else {
              this.$httpMessageState(res, '更新優惠卷')
              this.isLoading = false
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    delCoupon () {
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
      this.isLoading = true
      this.$http.delete(url)
        .then(res => {
          if (res.data.success) {
            this.$httpMessageState(res, '刪除優惠卷')
            this.isLoading = false
            const delComponent = this.$refs.delModal
            delComponent.hideModal()
            this.getCoupons()
          } else {
            this.$httpMessageState(res, '刪除優惠卷')
            this.isLoading = false
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>
