(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-18278561"],{9749:function(t,e,o){"use strict";o.r(e);var c=o("7a23"),a={class:"container mt-5"},n={class:"table  table-hover align-middle"},i=Object(c["h"])("thead",{class:"table-dark"},[Object(c["h"])("tr",null,[Object(c["h"])("th",null,"圖片"),Object(c["h"])("th",null,"商品名稱"),Object(c["h"])("th",null,"價格"),Object(c["h"])("th")])],-1),d={style:{width:"200px"}},l={class:"h5"},s={class:"btn-group btn-group-sm"},r={key:0,class:"fas fa-spinner fa-pulse "},u=Object(c["g"])("查看更多 "),b={key:0,class:"fas fa-spinner fa-pulse"},h=Object(c["g"])("加入購物車 ");function p(t,e,o,p,g,j){var O=Object(c["A"])("Loading"),m=Object(c["A"])("user-product-modal");return Object(c["t"])(),Object(c["e"])(c["a"],null,[Object(c["h"])(O,{active:g.isLoading},null,8,["active"]),Object(c["h"])("div",a,[Object(c["h"])("table",n,[i,(Object(c["t"])(!0),Object(c["e"])(c["a"],null,Object(c["y"])(g.products,(function(t){return Object(c["t"])(),Object(c["e"])("tbody",{key:t.id},[Object(c["h"])("tr",null,[Object(c["h"])("td",d,[Object(c["h"])("div",{style:[{height:"100px","background-size":"cover","background-position":"center"},{backgroundImage:"url(".concat(t.imageUrl,")")}]},null,4)]),Object(c["h"])("td",null,Object(c["D"])(t.title),1),Object(c["h"])("td",null,[Object(c["h"])("div",l," $"+Object(c["D"])(t.price)+"元",1)]),Object(c["h"])("td",null,[Object(c["h"])("div",s,[Object(c["h"])("button",{type:"button",class:"btn btn-outline-secondary",onClick:function(e){return j.getProduct(t.id)},disabled:g.lodingSatus.lodingItem===t.id},[g.lodingSatus.lodingItem===t.id?(Object(c["t"])(),Object(c["e"])("i",r)):Object(c["f"])("",!0),u],8,["onClick","disabled"]),Object(c["h"])("button",{type:"button",class:"btn btn-outline-danger",onClick:function(e){return j.addCart(t.id)},disabled:g.lodingSatus.lodingItem===t.id},[g.lodingSatus.lodingItem===t.id?(Object(c["t"])(),Object(c["e"])("i",b)):Object(c["f"])("",!0),h],8,["onClick","disabled"])])])])])})),128))]),Object(c["h"])(m,{ref:"userProductModal",product:g.product,onAddToCart:j.addCart},null,8,["product","onAddToCart"])])],64)}o("99af"),o("a4d3"),o("e01a");var g={class:"modal fade",id:"productModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},j={class:"modal-dialog modal-xl",role:"document"},O={class:"modal-content border-0"},m={class:"modal-header bg-dark text-white"},f={class:"modal-title",id:"exampleModalLabel"},v=Object(c["h"])("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"close"},null,-1),y={class:"modal-body"},k={class:"row"},S={class:"col-sm-6"},w={class:"col-sm-6"},M={class:"badge bg-primary rounded-pill"},L={class:"h5"},x={class:"input-group"};function C(t,e,o,a,n,i){return Object(c["t"])(),Object(c["e"])("div",g,[Object(c["h"])("div",j,[Object(c["h"])("div",O,[Object(c["h"])("div",m,[Object(c["h"])("h5",f,[Object(c["h"])("span",null,Object(c["D"])(o.product.title),1)]),v]),Object(c["h"])("div",y,[Object(c["h"])("div",k,[Object(c["h"])("div",S,[Object(c["h"])("img",{class:"img-fluid",src:o.product.imagesUrl,alt:""},null,8,["src"])]),Object(c["h"])("div",w,[Object(c["h"])("span",M,Object(c["D"])(o.product.category),1),Object(c["h"])("p",null,"商品描述："+Object(c["D"])(o.product.description),1),Object(c["h"])("p",null,"商品內容："+Object(c["D"])(o.product.content),1),Object(c["h"])("div",L,Object(c["D"])(o.product.origin_price)+" 元",1),Object(c["h"])("div",null,[Object(c["h"])("div",x,[Object(c["M"])(Object(c["h"])("input",{type:"number",class:"form-control","onUpdate:modelValue":e[1]||(e[1]=function(t){return n.qty=t}),min:"1"},null,512),[[c["H"],n.qty,void 0,{number:!0}]]),Object(c["h"])("button",{type:"button",class:"btn btn-primary",onClick:e[2]||(e[2]=function(e){return t.$emit("add-to-cart",o.product.id,n.qty)})},"加入購物車")])])])])])])])],512)}var I=o("7c2b"),$=o.n(I),P={props:["product"],data:function(){return{status:{},modal:"",qty:1}},inject:["emitter"],mounted:function(){this.modal=new $.a(this.$refs.modal,{keyboard:!1,backdrop:"static"})},methods:{openModal:function(){this.modal.show()},hideModal:function(){this.modal.hide()}}};P.render=C;var D=P,q={data:function(){return{products:[],lodingSatus:{lodingItem:""},isLoading:!1,product:{}}},components:{userProductModal:D},created:function(){this.getProducts()},methods:{addCart:function(t){var e=this,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.isLoading=!0;var c="".concat("https://vue3-course-api.hexschool.io/","api/").concat("jimmytest","/cart");this.lodingSatus.lodingItem=t;var a={product_id:t,qty:o};this.$http.post(c,{data:a}).then((function(t){t.data.success?(alert(t.data.message),e.lodingSatus.lodingItem="",e.$refs.userProductModal.hideModal(),e.isLoading=!1):alert(t.data.message)})).catch((function(t){console.log(t)}))},getProducts:function(){var t=this;this.isLoading=!0;var e="".concat("https://vue3-course-api.hexschool.io/","api/").concat("jimmytest","/products");this.$http.get(e).then((function(e){e.data.success?(t.products=e.data.products,t.isLoading=!1):alert(e.data.message)})).catch((function(t){console.log(t)}))},getProduct:function(t){var e=this;this.isLoading=!0;var o="".concat("https://vue3-course-api.hexschool.io/","api/").concat("jimmytest","/product/").concat(t);this.lodingSatus.lodingItem=t,this.$http.get(o).then((function(t){t.data.success?(e.lodingSatus.lodingItem="",e.product=t.data.product,e.isLoading=!1,e.$refs.userProductModal.openModal()):alert(t.data.message)})).catch((function(t){console.log(t)}))}}};q.render=p;e["default"]=q},e01a:function(t,e,o){"use strict";var c=o("23e7"),a=o("83ab"),n=o("da84"),i=o("5135"),d=o("861d"),l=o("9bf2").f,s=o("e893"),r=n.Symbol;if(a&&"function"==typeof r&&(!("description"in r.prototype)||void 0!==r().description)){var u={},b=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof b?new r(t):void 0===t?r():r(t);return""===t&&(u[e]=!0),e};s(b,r);var h=b.prototype=r.prototype;h.constructor=b;var p=h.toString,g="Symbol(test)"==String(r("test")),j=/^Symbol\((.*)\)[^)]+$/;l(h,"description",{configurable:!0,get:function(){var t=d(this)?this.valueOf():this,e=p.call(t);if(i(u,t))return"";var o=g?e.slice(7,-1):e.replace(j,"$1");return""===o?void 0:o}}),c({global:!0,forced:!0},{Symbol:b})}}}]);
//# sourceMappingURL=chunk-18278561.295227be.js.map