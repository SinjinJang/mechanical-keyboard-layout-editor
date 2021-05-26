(this["webpackJsonpmechanical-keyboard-layout-editor"]=this["webpackJsonpmechanical-keyboard-layout-editor"]||[]).push([[0],{104:function(e,t,n){},105:function(e,t,n){},107:function(e,t,n){},133:function(e,t,n){},134:function(e,t,n){},135:function(e,t,n){},140:function(e,t,n){},141:function(e,t,n){},143:function(e,t,n){},145:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),c=n(10),l=n.n(c),r=n(44),o=n(11),s=(n(104),n(105),n(38)),d=n(78),j=15,u=60;function b(e,t){return{x:e*u+j,y:t*u+j}}function h(e,t){return{width:e*u-2,height:t*u-2}}function x(e){var t,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=0,i=0,c=Object(d.a)(e);try{for(c.s();!(t=c.n()).done;){var l=t.value,r=l.x+l.w;a=r>a?r:a;var o=l.y+l.h;i=o>i?o:i}}catch(s){c.e(s)}finally{c.f()}return{width:n?a:a*u+30,height:n?i:i*u+30}}var p=n(58),O=n.n(p),g=n(79),f=n(62),m=n(53),v=(n(107),n(181)),y=n(185),_=n(186),k=n(200),w=n(202),N=n(197),C=n(190),S=n(191),D=n(192),U=n(80),F=n.n(U),A=n(59),L=n.n(A),B=n(2);var J=function(e){var t=e.layoutState,n=e.selectedState,a=Object(s.b)(!1),i=function(){return Object(f.a)(Object(f.a)({},x(t.get(),!0)),{},{layout:t.get()})},c=function(){var e=Object(g.a)(O.a.mark((function e(t){var n,c;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!a.get()){e.next=3;break}return console.log("prevent duplicated click!"),e.abrupt("return");case 3:return a.set(!0),"http://localhost:5000",e.next=7,F.a.post("http://localhost:5000"+"/model/plate/".concat(t),i());case 7:n=e.sent,c=n.data,L.a.saveAs(new Blob([c],{type:"text/plain; charset=utf-8"}),"model-plate.".concat(t)),a.set(!1);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),l=function(e){if(-1!==n.get()&&""!==e.target.value){var a=Number(e.target.value);if("selected-key-width"===e.target.id)t[n.get()].w.set(a);else{if("selected-key-height"!==e.target.id)return void console.log(">>>>> undefined id: "+e.target.id);t[n.get()].h.set(a)}}};return Object(B.jsxs)("div",{className:"editpanel",children:[a.get()?Object(B.jsx)("div",{className:"loading",children:Object(B.jsx)(v.a,{})}):"",Object(B.jsxs)("div",{className:"editpanel__container",children:[Object(B.jsx)(y.a,{className:"editpanel__item",variant:"outlined",color:"primary",onClick:function(e){e.preventDefault();var a=document.createElement("input");a.setAttribute("type","file"),a.setAttribute("accept",".json"),a.onchange=function(e){var a=new FileReader;a.readAsBinaryString(e.target.files[0]),a.onloadend=function(){var e=JSON.parse(a.result);Object.entries(e.layout).map((function(e){var t=Object(m.a)(e,2),n=(t[0],t[1]);n.w="w"in n?n.w:1,n.h="h"in n?n.h:1})),t.set(e.layout),n.set(-1)}},a.click()},children:"Upload Layout"}),Object(B.jsx)(y.a,{className:"editpanel__item",variant:"outlined",color:"primary",onClick:function(){var e=JSON.stringify(i());L.a.saveAs(new Blob([e],{type:"text/json; charset=utf-8"}),"plate-layout.json")},children:"Download Layout"}),Object(B.jsx)(y.a,{className:"editpanel__item",variant:"outlined",color:"primary",onClick:function(){return c("stl")},children:"Generate STL (3D)"}),Object(B.jsx)(y.a,{className:"editpanel__item",variant:"outlined",color:"primary",onClick:function(){return c("dxf")},children:"Generate DXF (2D)"})]}),Object(B.jsxs)("div",{className:"editpanel__container",children:[Object(B.jsx)(_.a,{className:"editpanel__item",children:Object(B.jsx)(k.a,{id:"selected-key-label",label:"Key Label",value:-1===n.get()?"":t[n.get()].label.get(),onChange:function(e){-1!==n.get()&&t[n.get()].label.set(e.target.value)}})}),Object(B.jsxs)(_.a,{className:"editpanel__item",children:[Object(B.jsx)(w.a,{htmlFor:"select-key-width",children:"Width"}),Object(B.jsxs)(N.a,{native:!0,id:"selected-key-width",label:"Width",value:-1===n.get()?"":t[n.get()].w.get(),onChange:l,children:[Object(B.jsx)("option",{value:""}),Object(B.jsx)("option",{value:"1",children:"1U"}),Object(B.jsx)("option",{value:"1.25",children:"1.25U"}),Object(B.jsx)("option",{value:"1.5",children:"1.5U"}),Object(B.jsx)("option",{value:"1.75",children:"1.75U"}),Object(B.jsx)("option",{value:"2",children:"2U"}),Object(B.jsx)("option",{value:"2.25",children:"2.25U"}),Object(B.jsx)("option",{value:"2.75",children:"2.75U"})]})]}),Object(B.jsxs)(_.a,{className:"editpanel__item",children:[Object(B.jsx)(w.a,{htmlFor:"select-key-height",children:"Height"}),Object(B.jsxs)(N.a,{native:!0,id:"selected-key-height",label:"Height",value:-1===n.get()?"":t[n.get()].h.get(),onChange:l,children:[Object(B.jsx)("option",{value:""}),Object(B.jsx)("option",{value:"1",children:"1U"}),Object(B.jsx)("option",{value:"2",children:"2U"})]})]}),Object(B.jsx)(C.a,{className:"editpanel__item editpanel__imageicon",alt:"Add New Switch",onClick:function(){var e=x(t.get(),!0),n=e.width,a=e.height;t.merge([{label:"New Key",x:n,y:Math.max(a-1,0),w:1,h:1}])},children:Object(B.jsx)(S.a,{})}),Object(B.jsx)(C.a,{className:"editpanel__item editpanel__imageicon",alt:"Remove Selected Switch",onClick:function(){-1!==n.get()&&(t[n.get()].set(s.a),n.set(-1))},children:Object(B.jsx)(D.a,{})})]})]})},K=n(85),M=n.n(K);n(133);var G=function(e){var t=e.keyState,n=t.label,a=t.x,i=t.y,c=t.w,l=t.h,r=e.selectedState,o=r.get()===e.seq?"key-switch-selected":"";return Object(B.jsx)(M.a,{grid:[15,15],bounds:{left:j,top:j},position:b(a.get(),i.get()),onDrag:function(e,t){a.set((function(e){return e+t.deltaX/u})),i.set((function(e){return e+t.deltaY/u}))},children:Object(B.jsx)("div",{className:"key-switch ".concat(o),style:h(c.get(),l.get()),onClick:function(){r.set((function(t){return t===e.seq?-1:e.seq}))},children:n.get()})})};var H=function(){var e=Object(s.b)([{label:"New Key",w:1,h:1,x:0,y:0}]),t=Object(s.b)(-1);return Object(B.jsxs)("div",{children:[Object(B.jsx)(J,{layoutState:e,selectedState:t}),Object(B.jsx)("div",{className:"key-plate",style:x(e.get()),children:e.map((function(e,n){return Object(B.jsx)(G,{seq:n,keyState:e,selectedState:t},n)}))})]})};var T=function(){return Object(B.jsx)("div",{className:"home",children:Object(B.jsx)(H,{})})},q=(n(134),function(){return Object(B.jsx)("div",{className:"about",children:"about..."})}),E=(n(135),n(199)),P=n(196),I=n(194),W=n(195),X=n(193),R=n(86),Y=n.n(R);function z(){var e=i.a.useState(!1),t=Object(m.a)(e,2),n=t[0],a=t[1],c=function(){a(!1)};return Object(B.jsxs)("div",{children:[Object(B.jsx)("div",{style:{position:"fixed",right:"5px",top:"5px"},children:Object(B.jsx)(C.a,{variant:"outlined",color:"default",onClick:function(){a(!0)},children:Object(B.jsx)(Y.a,{})})}),Object(B.jsxs)(E.a,{open:n,onClose:c,"aria-labelledby":"about-dialog-title","aria-describedby":"about-dialog-description",children:[Object(B.jsx)(X.a,{id:"about-dialog-title",children:"About This App"}),Object(B.jsxs)(I.a,{children:[Object(B.jsx)(W.a,{id:"about-dialog-description",children:"Mechanical Keyboard Layout Editor\uc740 \uae30\uacc4\uc2dd \ud0a4\ubcf4\ub4dc\ub97c DIY\ub85c \uc81c\uc791\ud558\uae30 \uc704\ud574 \ud0a4 \uc2a4\uc704\uce58\ub97c \uc0ac\uc6a9\uc790\uac00 \uc6d0\ud558\ub294 \ub300\ub85c \ubc30\uce58\ud558\uace0 \uc774\ub97c 3D \ud504\ub9b0\ud130\ub85c \ucd9c\ub825\ud560 \uc218 \uc788\ub3c4\ub85d STL \ud615\uc2dd\uc758 3D \ubaa8\ub378\ub9c1 \ud30c\uc77c\uc744 \uc0dd\uc131\ud574\uc90d\ub2c8\ub2e4."}),Object(B.jsx)(W.a,{id:"about-dialog-description",children:"\ud604\uc7ac\ub294 \ud0a4 \uc2a4\uc704\uce58\ub97c \uaf42\uc744 \uc218 \uc788\ub294 \uc0c1\ud310(plate)\uc758 3D \ubaa8\ub378\ub9c1 \ud30c\uc77c\uc744 \uc0dd\uc131\ud574\uc8fc\uba70, PCB \uc6a9\ub3c4\uc758 \ud558\ud310\ub3c4 \uc0dd\uc131\uc744 \ud560\uc218 \uc788\ub3c4\ub85d \uace0\ub824 \uc911\uc785\ub2c8\ub2e4. \ud0a4 \uc2a4\uc704\uce58 \ubc0f \ud0a4\ucea1\uc740 \uae30\uc131\ud488\uc744 \uad6c\ub9e4\ud558\uc5ec \uc870\ub9bd\uc774 \ud544\uc694\ud558\uba70 Cherry MX, Kailh \uc2a4\uc704\uce58 \ub4f1\uc774 \ud638\ud658\ub429\ub2c8\ub2e4."}),Object(B.jsx)(W.a,{id:"about-dialog-description",children:"\uc0ac\uc6a9\uc790\uac00 \ub514\uc790\uc778\ud55c \ud0a4 \ub808\uc774\uc544\uc6c3 \ubc0f \ubaa8\ub378\ub9c1\uc758 \uc18c\uc720\uad8c\uc740 \ubaa8\ub450 \uc774\ub97c \ub514\uc790\uc778\ud55c \uc0ac\uc6a9\uc790\uc5d0\uac8c \uc788\uc2b5\ub2c8\ub2e4. \ub808\uc774\uc544\uc6c3 \uc124\uc815\uc744 \uc11c\ubc84\ub85c \uc804\uc1a1\ud558\uc5ec 3D \ubaa8\ub378\ub9c1 \uc791\uc5c5\uc744 \uc218\ud589\ud558\uc9c0\ub9cc \uc5b4\ub5a0\ud55c \uc815\ubcf4\ub3c4 \uae30\ub85d\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4."}),Object(B.jsx)(W.a,{id:"about-dialog-description",children:"\ub610\ud55c, \uc0dd\uc131\ub41c 3D \ubaa8\ub378\ub9c1 \ud30c\uc77c\ub85c \ucd9c\ub825 \uc2dc \ubc1c\uc0dd\ud560 \uc218 \uc788\ub294 \ubaa8\ub4e0 \ubb38\uc81c\ub294 \uc0ac\uc6a9\uc790\uc5d0\uac8c \ucc45\uc784\uc774 \uc788\uc2b5\ub2c8\ub2e4. \uc81c\uac00 \ucc38\uace0\ud55c \ud0a4 \uc2a4\uc704\uce58 \ubc0f \uc2a4\ud14c\ube4c\ub77c\uc774\uc800\uc5d0 \ub9de\ub3c4\ub85d \uc124\uacc4\uac00 \ub418\uc5c8\uc73c\ubbc0\ub85c \ub2e4\ub978 \ubd80\ud488\uacfc\ub294 \ud638\ud658\uc5d0 \ubb38\uc81c\uac00 \uc788\uc744 \uc218 \uc788\uc2b5\ub2c8\ub2e4."}),Object(B.jsxs)(W.a,{id:"about-dialog-description",children:["\ubc1c\uacac\ud558\uc2e0 \uc774\uc288 \ubc0f \uac1c\uc120 \uc0ac\ud56d, \ub610\ub294 \ubb38\uc758 \uc0ac\ud56d\uc774 \uc788\uc73c\uc2dc\uba74,\xa0",Object(B.jsx)("a",{href:"https://github.com/SinjinJang/mechanical-keyboard-layout-editor",target:"_blank",children:"GitHub issue"}),"\xa0\ud639\uc740\xa0",Object(B.jsx)("a",{href:"mailto:sinjin.jang0.gmail.com",children:"e-mail"}),"\ub85c \uc54c\ub824\uc8fc\uc138\uc694."]}),Object(B.jsxs)(W.a,{id:"about-dialog-description",children:[Object(B.jsx)("p",{children:"\uc54c\uace0 \uc788\ub294 \uc774\uc288 \uc0ac\ud56d:"}),Object(B.jsxs)("ul",{children:[Object(B.jsx)("li",{children:"\ub192\uc774\uac00 2U\uc778 \ud0a4 \uc2a4\uc704\uce58\uc758 \uc2a4\ud14c\ube4c\ub77c\uc774\uc800 \ud640 \uc5c6\uc74c"}),Object(B.jsx)("li",{children:"PCB-mount \uc2a4\ud14c\ube4c\ub77c\uc774\uc800\uc5d0\uc11c plate-mount \uc2a4\ud14c\ube4c\ub77c\uc774\uc800\ub85c \ubcc0\uacbd \uc608\uc815"})]})]})]}),Object(B.jsx)(P.a,{children:Object(B.jsx)(y.a,{onClick:c,color:"primary",autoFocus:!0,children:"Close"})})]})]})}var Z=function(){return Object(B.jsxs)("header",{children:[Object(B.jsx)("p",{className:"app_name",children:"Mechanical Keyboard Layout Editor"}),Object(B.jsx)(z,{})]})};n(140);var Q=function(){return Object(B.jsxs)("footer",{className:"footer",children:[Object(B.jsxs)("div",{className:"footer__item",children:["Copyright\xa92021 Sinjin Jang",Object(B.jsx)("br",{}),"All rights reserved."]}),Object(B.jsxs)("div",{className:"footer__item",children:["Get source code of this app:",Object(B.jsx)("br",{}),Object(B.jsx)("a",{href:"https://github.com/SinjinJang/mechanical-keyboard-layout-editor",target:"_blank",children:"mechanical-keyboard-layout-editor on GitHub"})]}),Object(B.jsxs)("div",{className:"footer__item",children:[Object(B.jsx)("a",{href:"https://donaricano.com/mypage/1722367584_zHWZl2",target:"_blank",children:"\ub3c4\ub124\ub9ac\uce74\ub178 \ucee4\ud53c \ud6c4\uc6d0"}),Object(B.jsx)("br",{}),Object(B.jsx)("a",{href:"https://www.buymeacoffee.com/sinjin0",target:"_blank",children:"Buy Me a Coffee"})]})]})},V=(n(141),function(){return Object(B.jsxs)(B.Fragment,{children:[Object(B.jsx)(Z,{}),Object(B.jsxs)(r.a,{children:[Object(B.jsx)(o.a,{exact:!0,path:"/",component:T}),Object(B.jsx)(o.a,{path:"/about",component:q})]}),Object(B.jsx)(Q,{})]})}),$=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,204)).then((function(t){var n=t.getCLS,a=t.getFID,i=t.getFCP,c=t.getLCP,l=t.getTTFB;n(e),a(e),i(e),c(e),l(e)}))};n(143),n(144);l.a.render(Object(B.jsx)(i.a.StrictMode,{children:Object(B.jsx)(V,{})}),document.getElementById("root")),$()}},[[145,1,2]]]);
//# sourceMappingURL=main.cf9c82c2.chunk.js.map