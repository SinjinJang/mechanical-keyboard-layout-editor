(this["webpackJsonpmechanical-keyboard-layout-editor"]=this["webpackJsonpmechanical-keyboard-layout-editor"]||[]).push([[0],{28:function(e,t,a){},36:function(e,t,a){},38:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),l=a(10),c=a.n(l),s=a(13),o=a(7),r=a(11),h=a(12),d=a(16),u=a(14),j=(a(28),a(23)),b=a.n(j),p=a(15),y=a(6),O=a(1),v=60,g=15,x=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){return Object(r.a)(this,a),t.apply(this,arguments)}return Object(h.a)(a,[{key:"render",value:function(){var e={x:this.props.x*v+g,y:this.props.y*v+g},t={width:this.props.w*v-2,height:this.props.h*v-2},a={left:g,top:g};return Object(O.jsx)(b.a,{grid:[15,15],onDrag:this.props.onDrag,position:e,bounds:a,children:Object(O.jsx)("div",{className:"key-switch",style:t,onClick:this.props.onClick,children:this.props.label})})}}]),a}(i.a.Component),f=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){return Object(r.a)(this,a),t.apply(this,arguments)}return Object(h.a)(a,[{key:"render",value:function(){var e,t;return Object(O.jsxs)("div",{children:[Object(O.jsx)("div",{className:"editpanel__container",children:Object(O.jsxs)(y.a.Group,{controlId:"uploadLayout",className:"editpanel__item",children:[Object(O.jsx)(y.a.Label,{children:"Layout File to Upload"}),Object(O.jsx)(y.a.File,{id:"layoutFile",type:"file",accept:".json",onChange:this.props.onLayoutFileChange})]})}),Object(O.jsxs)("div",{className:"editpanel__container",children:[Object(O.jsx)(p.a,{className:"editpanel__item",variant:"outline-primary",onClick:this.props.onAddSwitchClick,children:"Add Switch"}),Object(O.jsx)(p.a,{className:"editpanel__item",variant:"outline-secondary",download:"layout.json",href:"data:text/json; charset=utf-8,".concat(this.props.onDownloadClick()),children:"Download Layout"}),Object(O.jsx)(p.a,{className:"editpanel__item",variant:"outline-success",onClick:function(){return alert("TODO: generate 3D/2D model")},children:"Generate 3D/2D Model"})]}),Object(O.jsxs)("div",{className:"editpanel__container",children:[Object(O.jsxs)(y.a.Group,{controlId:"keyLabel",className:"editpanel__item",children:[Object(O.jsx)(y.a.Label,{children:"Key Label"}),Object(O.jsx)(y.a.Control,{type:"text",name:"key_label",value:this.props.selectedKey,onChange:this.props.onLabelChange})]}),Object(O.jsxs)(y.a.Group,{controlId:"width",className:"editpanel__item",children:[Object(O.jsx)(y.a.Label,{children:"Width"}),Object(O.jsxs)(y.a.Control,{as:"select",name:"key_width",value:null===(e=this.props.selectedAttrs)||void 0===e?void 0:e.w,onChange:this.props.onSizeChange,children:[Object(O.jsx)("option",{value:"1",children:"1U"}),Object(O.jsx)("option",{value:"1.25",children:"1.25U"}),Object(O.jsx)("option",{value:"1.5",children:"1.5U"}),Object(O.jsx)("option",{value:"1.75",children:"1.75U"}),Object(O.jsx)("option",{value:"2",children:"2U"}),Object(O.jsx)("option",{value:"2.25",children:"2.25U"}),Object(O.jsx)("option",{value:"2.75",children:"2.75U"})]})]}),Object(O.jsxs)(y.a.Group,{controlId:"height",className:"editpanel__item",children:[Object(O.jsx)(y.a.Label,{children:"Height"}),Object(O.jsxs)(y.a.Control,{as:"select",name:"key_height",value:null===(t=this.props.selectedAttrs)||void 0===t?void 0:t.h,onChange:this.props.onSizeChange,children:[Object(O.jsx)("option",{value:"1",children:"1U"}),Object(O.jsx)("option",{value:"2",children:"2U"})]})]})]})]})}}]),a}(i.a.Component),w=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;Object(r.a)(this,a);var i={"New Key":{x:0,y:0,w:1,h:1}},l=(n=t.call(this,e)).resizePlate(i);return n.state=Object(o.a)({selectedKey:null,layout:i},l),n}return Object(h.a)(a,[{key:"handleAddSwitch",value:function(){var e=Object(o.a)({},this.state.layout);e["Key "+Object.keys(e).length]={x:this.state.width,y:this.state.height-1,w:1,h:1};var t=this.resizePlate(e);this.setState(Object(o.a)({layout:e},t))}},{key:"handleLabelChange",value:function(e){var t=Object(o.a)({},this.state.layout),a=this.state.selectedKey;if(null!=a){var n=t[a];delete t[a],t[e.target.value]=n,this.setState({layout:t,selectedKey:e.target.value})}}},{key:"handleSizeChange",value:function(e){var t=Object(o.a)({},this.state.layout),a=this.state.selectedKey;if(null!=a){var n=t[a],i=Number(e.target.value);if("width"===e.target.id)n.w=i;else{if("height"!==e.target.id)return void console.log(">>>>> undefined id: "+e.target.id);n.h=i}var l=this.resizePlate(t);this.setState(Object(o.a)(Object(o.a)({},l),{},{layout:t}))}}},{key:"handleSwitchDrag",value:function(e,t){var a=t.node.textContent,n=Object(o.a)({},this.state.layout),i=n[a];i.x+=t.deltaX/v,i.y+=t.deltaY/v;var l=this.resizePlate(n);this.setState(Object(o.a)({layout:n},l))}},{key:"handleSwitchClick",value:function(e){this.setState({selectedKey:e})}},{key:"handleDownloadClick",value:function(){return JSON.stringify(this.state.layout)}},{key:"handleLayoutFileChange",value:function(e){var t=this,a=new FileReader;a.readAsBinaryString(e.target.files[0]),a.onloadend=function(){var e=JSON.parse(a.result);Object.entries(e.layout).map((function(e){var t=Object(s.a)(e,2),a=(t[0],t[1]);a.w="w"in a?a.w:1,a.h="h"in a?a.h:1})),t.setState({width:e.width,height:e.height,layout:e.layout,selectedKey:""})}}},{key:"resizePlate",value:function(e){for(var t=-1,a=-1,n=0,i=Object.entries(e);n<i.length;n++){var l=Object(s.a)(i[n],2),c=(l[0],l[1]),o=c.x+c.w;t=o>t?o:t;var r=c.y+c.h;a=r>a?r:a}return{width:t,height:a}}},{key:"render",value:function(){for(var e=this,t={width:this.state.width*v+30,height:this.state.height*v+30},a=this.state,n=a.selectedKey,i=a.layout,l=[],c=function(){var t=Object(s.a)(r[o],2),a=t[0],n=t[1];l.push(Object(O.jsx)(x,{label:a,x:n.x,y:n.y,w:n.w,h:n.h,onDrag:function(t,a){return e.handleSwitchDrag(t,a)},onClick:function(t){return e.handleSwitchClick(a)}},a))},o=0,r=Object.entries(i);o<r.length;o++)c();return Object(O.jsxs)("div",{children:[Object(O.jsx)(f,{selectedKey:n,selectedAttrs:i[n],onAddSwitchClick:function(){return e.handleAddSwitch()},onSizeChange:function(t){return e.handleSizeChange(t)},onLabelChange:function(t){return e.handleLabelChange(t)},onDownloadClick:function(){return e.handleDownloadClick()},onLayoutFileChange:function(t){return e.handleLayoutFileChange(t)}}),Object(O.jsx)("div",{className:"key-plate",style:t,children:l})]})}}]),a}(i.a.Component);var C=function(){return Object(O.jsxs)("div",{className:"App",children:[Object(O.jsx)("h1",{children:"Mechanical Keyboard Layout Editor"}),Object(O.jsx)(w,{})]})},k=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,39)).then((function(t){var a=t.getCLS,n=t.getFID,i=t.getFCP,l=t.getLCP,c=t.getTTFB;a(e),n(e),i(e),l(e),c(e)}))};a(36),a(37);c.a.render(Object(O.jsx)(i.a.StrictMode,{children:Object(O.jsx)(C,{})}),document.getElementById("root")),k()}},[[38,1,2]]]);
//# sourceMappingURL=main.f886ee88.chunk.js.map