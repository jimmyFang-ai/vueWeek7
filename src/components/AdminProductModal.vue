<template>
    <div id="productModal" ref="modal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
  aria-hidden="true">
<div class="modal-dialog modal-xl">
 <div class="modal-content border-0">
   <div class="modal-header bg-dark text-white">
     <h5 id="productModalLabel" class="modal-title">
         <!-- 增加判斷條件，避免點選close時，直接修改資料 -->
       <span v-if="isNew">新增產品</span>
       <span v-else>新增產品</span>
     </h5>
     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
   </div>
   <div class="modal-body">
     <div class="row">
       <div class="col-sm-4">
           <div class="mb-3">
             <label for="image" class="form-label">請輸入圖片網址</label>
             <input  v-model="tempProduct.imageUrl" type="text" class="form-control" placeholder="請輸入圖片連結" id="image">
           </div>
          <div class="mb-3">
                <label for="customFile" class="form-label">或 上傳圖片
                  <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                </label>
                <input type="file" id="customFile" class="form-control" ref="fileInput" @change="uploadFile">
         </div>
         <!-- 主要圖片 -->
             <img class="img-fluid" :src="tempProduct.imageUrl">

            <!--  多圖新增  -->
            <div  class="mt-5" v-if="tempProduct.imagesUrl">
             <div class="mb-3" v-for="(image,key) in tempProduct.imagesUrl" :key="key">
                  <input  type="url"  class="form-control form-control" placeholder="請輸入圖片連結" v-model="tempProduct.imagesUrl[key]">
                <div>
                   <img class="img-fluid" :src="image">
               </div>
                   <button type="button" class="btn btn-outline-danger" @click="tempProduct.imagesUrl.splice(key,1)">移除</button>
             </div>
              <!-- 判斷 新增圖片按鈕邏輯，tempProduct.imageUrl.length陣列不能為0 !(falese)  或是 tempProduct.imageUrl.length最後一筆資料  -->
               <div  v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length-1]">
             <!-- 點擊新增圖片按鈕 新增'' 到tempProduct.imagesUrl陣列中 -->
             <button class="btn btn-outline-primary btn-sm d-block w-100" @click="tempProduct.imagesUrl.push('')">
               新增圖片
             </button>
              </div>
            </div>
          </div>
       <div class="col-sm-8">
         <div class="form-group">
           <label for="title">標題</label>
           <input id="title" v-model="tempProduct.title" type="text" class="form-control" placeholder="請輸入標題">
         </div>

         <div class="row">
           <div class="form-group col-md-6">
             <label for="category">分類</label>
             <input id="category"  v-model="tempProduct.category" type="text" class="form-control"
                    placeholder="請輸入分類">
           </div>
           <div class="form-group col-md-6">
             <label for="price">單位</label>
             <input id="unit" v-model="tempProduct.unit" type="text" class="form-control" placeholder="請輸入單位">
           </div>
         </div>

         <div class="row">
           <div class="form-group col-md-6">
             <label for="origin_price">原價</label>
             <input id="origin_price" v-model.number="tempProduct.origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價">
           </div>
           <div class="form-group col-md-6">
             <label for="price">售價</label>
             <input id="price"  v-model.number="tempProduct.price" type="number" min="0" class="form-control"
                    placeholder="請輸入售價">
           </div>
         </div>
         <hr>

         <div class="form-group">
           <label for="description">產品描述</label>
           <textarea id="description"  v-model="tempProduct.description" type="text" class="form-control"
                     placeholder="請輸入產品描述">
           </textarea>
         </div>
         <div class="form-group">
           <label for="content">說明內容</label>
           <textarea id="description" v-model="tempProduct.content" type="text" class="form-control"
                     placeholder="請輸入說明內容">
           </textarea>
         </div>
         <div class="form-group">
           <div class="form-check">
             <input id="is_enabled" v-model="tempProduct.is_enabled" class="form-check-input" type="checkbox"
                    :true-value="1" :false-value="0">
             <label class="form-check-label" for="is_enabled">是否啟用</label>
           </div>
         </div>
       </div>
     </div>
   </div>
   <div class="modal-footer">
     <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
       取消
     </button>
     <button type="button" class="btn btn-primary" @click="$emit('update-product', tempProduct)">
       確認
     </button>
   </div>
 </div>
</div>
</div>
</template>

<script>
// 引入 bootstrap modal 元件
import Modal from 'bootstrap/js/dist/modal'

export default {
  props: {
    //   props 驗證規則以物件型式撰寫
    product: {
      type: Object,
      dafault () { return {} }
    },
    isNew: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      status: {},
      modal: '',
      tempProduct: {}
    }
  },
  emits: ['update-product'],
  inject: ['emitter'],
  watch: {
    // 監聽  外層傳進來的product的值
    product () {
      // 避免單向數據流，外層傳進來的product物件資料無法更改記憶體位置內容，所以內層重新建立tempProduct的記憶體位置接收
      this.tempProduct = this.product
      //    多圖
      if (!this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = []
      }
      //    主要圖片
      if (!this.tempProduct.imageUrl) {
        this.tempProduct.imageUrl = ''
      }
    }
  },
  methods: {
    uploadFile () {
      const uploadFile = this.$refs.fileInput.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', uploadFile)
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/admin/upload`
      this.status.fileUploading = true
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        this.status.fileUploading = false
        if (res.data.success) {
          this.tempProduct.imageUrl = res.data.imageUrl
          this.$refs.fileInput.value = ''
          this.emitter.emit('push-message', {
            style: 'success',
            title: '圖片上傳結果'
          })
        } else {
          this.$refs.fileInput.value = ''
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '圖片上傳結果',
            content: res.data.message
          })
        }
      })
    },
    openModal () {
      this.modal.show()
    },
    hideModal () {
      this.modal.hide()
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal)
  }
}
</script>
