<template>
      <Loading :active="isLoading"></Loading>
            <table class="table  table-hover align-middle mt-5">
               <thead class="table-dark">
                 <tr>
                   <th>品名</th>
                   <th style="width: 150px" >數量/單位</th>
                   <th>單價</th>
                   <th></th>
                </tr>
              </thead>
               <tbody>
                  <template  v-if="cart.carts">  <!--判斷 購物車內是否有資料-->
                    <tr v-for="item in cart.carts" :key="item.id">
                       <td>{{ item.product.title}}</td>
                       <td>
                          <div class="input-group input-group-sm">
                                 <div class="input-group mb-3">
                                      <input type="number" min="1" class="form-control" v-model.number="item.qty" :disabled="loadingStatus.loadingItem === item.id" @change="updateCart(item)">
                                      <span class="input-group-text" id="basic-addon2">{{item.product.unit}}</span>
                                </div>
                          </div>
                       </td>
                       <td>
                          ${{item.total}}元
                       </td>
                       <td><button type="button" class="btn btn-success" @click="removeCartItem(item.id)" :disabled="loadingStatus.loadingItem === item.id">
                         <i
                        class="fas fa-spinner fa-pulse"
                        v-if="loadingStatus.loadingItem === item.id"
                      ></i>移除購物車</button>
                      </td>
                    </tr>
                  </template>
               </tbody>
               <tfoot>
                 <tr >
                      <td colspan="3" class="text-end">總計</td>
                      <td class="text-end">${{cart.total}}元</td>
                 </tr>
               </tfoot>
            </table>
            <div class="text-end">
                 <!-- 清空購物車按鈕 -->
                 <button class="btn btn-outline-danger" type="button" @click="deleteAllCarts" >清空購物車</button>
           </div>

            <div class="my-5 row justify-content-center" >
          <Form ref="form"  v-slot="{ errors }"  class="col-md-6"  @submit="createOrder">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <Field id="email" name="email" type="email" class="form-control"
                :class="{'is-invalid': errors['email']}"   rules="email|required" placeholder="請輸入 Email" v-model="form.user.email"></Field>
            <Error-message name="email" class="invalid-feedback"></Error-message>
          </div>

          <div class="mb-3">
            <label for="name" class="form-label">姓名</label>
            <Field id="name" name="姓名" type="text" class="form-control"
            :class="{'is-invalid': errors['姓名']}"   rules="required"  placeholder="請輸入姓名" v-model="form.user.name"></Field>
            <Error-message name="姓名" class="invalid-feedback"></Error-message>
          </div>

          <div class="mb-3">
            <label for="tel" class="form-label">電話</label>
            <Field id="tel" name="電話" type="text" class="form-control"
            :class="{'is-invalid': errors['電話']}"   rules="required|min:8|max:10"  placeholder="請輸入電話" v-model="form.user.tel"></Field>
            <Error-message name="電話" class="invalid-feedback"></Error-message>
          </div>

          <div class="mb-3">
            <label for="address" class="form-label">地址</label>
            <Field id="address" name="地址" type="text" class="form-control"
            :class="{'is-invalid': errors['地址']}"   rules="required"  placeholder="請輸入地址" v-model="form.user.address"></Field>
            <Error-message name="地址" class="invalid-feedback"></Error-message>
          </div>

         <div class="mb-3">
          <label for="message" class="form-label">留言</label>
              <textarea name="" id="message"  class="form-control" cols="30" rows="10" v-model="form.user.message"></textarea>
         </div>

         <div class="text-end">
          <button class="btn btn-outline-danger" type="submit">Submit</button>
         </div>
        </Form>
       </div>
</template>

<script>
export default {
  data () {
    return {
      // 讀取效果
      loadingStatus: {
        loadingItem: ''
      },
      // 切換讀取狀態
      isLoading: false,
      // 購物車
      cart: {},
      // 表單結構
      form: {
        user: {
          email: '',
          name: '',
          address: '',
          tel: ''
        },
        message: ''
      }
    }
  },
  created () {
    this.getCart()
  },
  methods: {
    // 取得購物車列表
    getCart () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(url)
        .then(res => {
          if (res.data.success) {
            this.cart = res.data.data
            this.isLoading = false
          } else {
            alert(res.data.message)
          }
        })
    },
    // 刪除購物車產品
    removeCartItem (id) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.loadingStatus.loadingItem = id
      this.$http.delete(url)
        .then(res => {
          if (res.data.success) {
            alert(res.data.message)
            this.getCart()
          } else {
            alert(res.data.message)
          }
          this.loadingStatus.loadingItem = ''
          this.isLoading = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 清空購物車
    deleteAllCarts () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/carts`
      this.$http.delete(url)
        .then(res => {
          if (res.data.success) {
            alert(res.data.message)
            this.getCart()
            this.isLoading = false
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 更新購物車品項 put 要帶入 {data: { product_id: , qty: }}
    updateCart (item) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.loadingStatus.loadingItem = item.id
      const cart = {
        product_id: item.product.id,
        qty: item.qty
      }
      this.$http.put(url, { data: cart })
        .then(res => {
          if (res.data.success) {
            alert(res.data.message)
            this.getCart()
          } else {
            alert(res.data.message)
          }
          this.loadingStatus.loadingItem = ''
          this.isLoading = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 送出表單
    createOrder () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/order`
      const order = this.form
      this.$http.post(url, { data: order })
        .then(res => {
          if (res.data.success) {
            alert(res.data.message)
            this.$refs.form.resetForm()
            this.getCart()
          } else {
            alert(res.data.message)
          }
          this.isLoading = false
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
