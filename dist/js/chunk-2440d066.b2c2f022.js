(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2440d066"],{"99af":function(e,t,n){"use strict";var r=n("23e7"),s=n("d039"),a=n("e8b5"),o=n("861d"),c=n("7b0b"),i=n("50c4"),u=n("8418"),d=n("65f0"),l=n("1dde"),p=n("b622"),h=n("2d00"),b=p("isConcatSpreadable"),f=9007199254740991,m="Maximum allowed index exceeded",w=h>=51||!s((function(){var e=[];return e[b]=!1,e.concat()[0]!==e})),j=l("concat"),v=function(e){if(!o(e))return!1;var t=e[b];return void 0!==t?!!t:a(e)},O=!w||!j;r({target:"Array",proto:!0,forced:O},{concat:function(e){var t,n,r,s,a,o=c(this),l=d(o,0),p=0;for(t=-1,r=arguments.length;t<r;t++)if(a=-1===t?o:arguments[t],v(a)){if(s=i(a.length),p+s>f)throw TypeError(m);for(n=0;n<s;n++,p++)n in a&&u(l,p,a[n])}else{if(p>=f)throw TypeError(m);u(l,p++,a)}return l.length=p,l}})},a55b:function(e,t,n){"use strict";n.r(t);var r=n("7a23"),s={class:"container mt-5"},a={class:"col-md-6"},o=Object(r["h"])("h1",{class:"h3 mb-3 font-weight-normal"},"請先登入",-1),c={class:"mb-4"},i=Object(r["h"])("label",{for:"inputEmail",class:"sr-only"},"Email address",-1),u={class:"mb-4"},d=Object(r["h"])("label",{for:"inputPassword",class:"sr-only"},"Password",-1),l=Object(r["h"])("div",{class:"text-end mt-4"},[Object(r["h"])("button",{class:"btn btn-lg btn-primary btn-block",type:"submit"},"登入")],-1);function p(e,t,n,p,h,b){return Object(r["t"])(),Object(r["e"])("div",s,[Object(r["h"])("form",{class:"row justify-content-center ",onSubmit:t[3]||(t[3]=Object(r["N"])((function(){return b.signIn&&b.signIn.apply(b,arguments)}),["prevent"]))},[Object(r["h"])("div",a,[o,Object(r["h"])("div",c,[i,Object(r["M"])(Object(r["h"])("input",{type:"email",id:"inputEmail",class:"form-control",placeholder:"Email address","onUpdate:modelValue":t[1]||(t[1]=function(e){return h.user.username=e}),required:"",autofocus:""},null,512),[[r["H"],h.user.username]])]),Object(r["h"])("div",u,[d,Object(r["M"])(Object(r["h"])("input",{type:"password",id:"inputPassword",class:"form-control","onUpdate:modelValue":t[2]||(t[2]=function(e){return h.user.password=e}),placeholder:"Password",required:""},null,512),[[r["H"],h.user.password]])]),l])],32)])}n("99af");var h={data:function(){return{user:{username:"",password:""}}},inject:["emitter","$httpMessageState"],methods:{signIn:function(){var e=this,t="".concat("https://vue3-course-api.hexschool.io/","admin/signin");this.$http.post(t,this.user).then((function(t){if(t.data.success){var n=t.data,r=n.token,s=n.expired;document.cookie="hexToken=".concat(r,";expires=").concat(new Date(s),";"),e.$httpMessageState(t,"登入結果"),e.$router.push("/admin/products")}else e.$httpMessageState(t,"登入結果")})).catch((function(e){console.log(e)}))}}};h.render=p;t["default"]=h}}]);
//# sourceMappingURL=chunk-2440d066.b2c2f022.js.map