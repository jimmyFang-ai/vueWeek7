(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e22a4"],{"7e11":function(t,e,a){"use strict";a.r(e);var c=a("7a23"),n={class:"container-fluid mt-3 position-relative"};function s(t,e,a,s,r,o){var i=Object(c["A"])("Navbar"),u=Object(c["A"])("router-view");return Object(c["t"])(),Object(c["e"])(c["a"],null,[Object(c["h"])(i),Object(c["h"])("div",n,[r.checkSuccess?(Object(c["t"])(),Object(c["e"])(u,{key:0})):Object(c["f"])("",!0)])],64)}a("ac1f"),a("5319");var r={class:"navbar navbar-expand-lg navbar-dark bg-primary"},o={class:"container-fluid"},i=Object(c["h"])("span",{class:"navbar-brand"},"後台導覽頁",-1),u=Object(c["h"])("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarTogglerAltMarkUp","aria-controls":"navbarTogglerAltMarkUp","aria-expanded":"false","aria-label":"Toggle navigation"},[Object(c["h"])("span",{class:"navbar-toggler-icon"})],-1),l={class:"collapse navbar-collapse",id:"navbarTogglerAltMarkUp"},b={class:"navbar-nav"},h=Object(c["g"])("產品列表"),p=Object(c["g"])("訂單"),v=Object(c["g"])("優惠卷");function d(t,e,a,n,s,d){var O=Object(c["A"])("router-link");return Object(c["t"])(),Object(c["e"])("nav",r,[Object(c["h"])("div",o,[i,u,Object(c["h"])("div",l,[Object(c["h"])("div",b,[Object(c["h"])(O,{class:"nav-link",to:"/admin/products"},{default:Object(c["L"])((function(){return[h]})),_:1}),Object(c["h"])(O,{class:"nav-link",to:"/admin/orders"},{default:Object(c["L"])((function(){return[p]})),_:1}),Object(c["h"])(O,{class:"nav-link",to:"/admin/coupons"},{default:Object(c["L"])((function(){return[v]})),_:1}),Object(c["h"])("a",{href:"#",class:"nav-link",onClick:e[1]||(e[1]=Object(c["N"])((function(){return d.signOut&&d.signOut.apply(d,arguments)}),["prevent"]))},"登出")])])])])}var O={inject:["emitter","$httpMessageState"],methods:{signOut:function(){var t=this,e="".concat("https://vue3-course-api.hexschool.io/","logout");this.$http.post(e).then((function(e){e.data.success&&t.$router.push("/")}))}}};O.render=d;var j=O,g={components:{Navbar:j},data:function(){return{checkSuccess:!1}},inject:["$httpMessageState"],created:function(){var t=this,e=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization="".concat(e);var a="".concat("https://vue3-course-api.hexschool.io/","api/user/check");this.$http.post(a).then((function(e){e.data.success?t.checkSuccess=!0:(t.$httpMessageState(e,"登入結果"),t.$router.push("/"))}))}};g.render=s;e["default"]=g}}]);
//# sourceMappingURL=chunk-2d0e22a4.61b2dc73.js.map