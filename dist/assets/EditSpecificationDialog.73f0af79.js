import{a as f,u as T,R as g,r as c,Z as x,m as o,I as n,_ as N,j as O,E as _,d as p,T as L,f as U,b1 as w,k as P,a1 as X,b2 as b}from"./index.4d63a749.js";function F(){const E=f(w),{permissions:r}=T(P),t=r.get(g.SPECIFICATION),e=T(X),[i,D]=c.exports.useState(0),d={name:"",caption:"",coef:1,price:"",code:"",id:"",markup:""},{caption:l,coef:m,code:A,id:S}=e&&e[i]?{...e[i]||d}:d,I=f(b),C=["\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435","\u0415\u0434","\u041A\u043E\u044D\u0444-\u0442","\u041A\u043E\u0434","\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440"],y=e.map(u=>[u.caption||"",x.get(u.units||"")||"",`${u.coef}`,u.code||"",u.id||""]),R=[{caption:"\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435:",value:l||"",message:o.ENTER_CAPTION,type:n.TEXT},{caption:"\u041A\u043E\u044D\u0444-\u0442:",value:`${m}`,message:o.ENTER_COEF,type:n.TEXT,propertyType:N.POSITIVE_NUMBER},{caption:"\u041A\u043E\u0434:",value:A||"",message:o.ENTER_CODE,type:n.TEXT},{caption:"\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440:",value:S||"",message:o.ENTER_ID,type:n.TEXT}];return c.exports.useEffect(()=>{E()},[E]),c.exports.useEffect(()=>{t!=null&&t.Read||window.location.replace("/")},[t]),O(_,{children:[p(L,{heads:C,content:y,onSelectRow:u=>D(u)}),(t==null?void 0:t.Create)||(t==null?void 0:t.Update)||(t==null?void 0:t.Delete)?p(U,{items:R,onUpdate:async(u,s)=>{const a={name:e[i].name};return u[0]&&(a.caption=s[0]),u[1]&&(a.coef=+s[1]),u[2]&&(a.code=s[2]),u[3]&&(a.id=s[3]),await I(a)}}):p("div",{})]})}export{F as default};
