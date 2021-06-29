<template>
  <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
     <div class="modal-dialog modal-xl" role="document">
       <div class="modal-content border-0">
         <div class="modal-header bg-dark text-white">
           <h5 class="modal-title" id="exampleModalLabel">
             <span>{{ product.title }}</span>
           </h5>
           <button type="button" class="btn-close"
                   data-bs-dismiss="modal" aria-label="close"></button>
         </div>
         <div class="modal-body">
           <div class="row">
             <div class="col-sm-6">
               <img class="img-fluid" :src="product.imagesUrl" alt="">
             </div>
             <div class="col-sm-6">
               <span class="badge bg-primary rounded-pill">{{ product.category }}</span>
               <p>商品描述：{{ product.description }}</p>
               <p>商品內容：{{ product.content }}</p>
               <div class="h5">{{ product.origin_price }} 元</div>
               <div>
                 <div class="input-group">
                   <input type="number" class="form-control"
                         v-model.number="qty" min="1">
                   <button type="button" class="btn btn-primary"
                           @click="$emit('add-to-cart', product.id, qty)">加入購物車</button>
                 </div>
               </div>
             </div>
             <!-- col-sm-6 end -->
           </div>
         </div>
       </div>
     </div>
   </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
export default {
  props: ['product'],
  data () {
    return {
      status: {},
      modal: '',
      qty: 1
    }
  },
  inject: ['emitter'],
  mounted () {
    // 把 modal 實體化
    this.modal = new Modal(this.$refs.modal, {
      keyboard: false,
      backdrop: 'static'
    })
  },
  methods: {
    openModal () {
      this.modal.show()
    },
    hideModal () {
      this.modal.hide()
    }
  }
}
</script>
