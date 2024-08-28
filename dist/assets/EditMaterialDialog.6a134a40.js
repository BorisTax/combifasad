import{u as S,R as P,r as E,F as b,a as D,M as G,b as H,c as B,m as l,I as T,j as y,E as U,d as o,C as Z,e as z,g as j,T as _,f as O,h as K,i as V,k as v,l as F,n as q,o as J,p as Q,P as W,q as Y,s as k,t as $,v as ee,w as te,x as se,y as ue,z as ae,A as ne,B as oe,D as ce,G as de,H as ie,J as re,K as le,L as me,N as Ee,O as pe,Q as Ae,S as Te,U as De,V as ge,W as w,X as Se,Y as fe}from"./index.226b5c88.js";function Ie(){const{permissions:f}=S(v),e=f.get(P.MATERIALS),d=S(F),[{baseMaterial:u,extMaterialIndex:g},i]=E.exports.useState({baseMaterial:b.DSP,extMaterialIndex:0}),c=D(q),I=D(J),C=D(Q),L=E.exports.useMemo(()=>(d.filter(s=>s.material===u)||[{name:"",material:""}]).toSorted((s,t)=>s.name>t.name?1:-1),[d,u]),m=L[g]||{name:"",code:"",image:"",material:b.DSP,purpose:G.BOTH},M=H(m.material,m.name),x=(m==null?void 0:m.material)===b.DSP,p=["\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435","\u041A\u043E\u0434","\u041D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"],n=L.map(s=>[s.name,s.code,B.get(s.purpose)||""]),r=[{caption:"\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435:",value:m.name||"",message:l.ENTER_CAPTION,type:T.TEXT},{caption:"\u041A\u043E\u0434:",value:m.code,message:l.ENTER_CODE,type:T.TEXT},{caption:"\u041D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435:",value:m.purpose||"",valueCaption:s=>B.get(s)||"",list:B,message:l.ENTER_PURPOSE,type:T.LIST,readonly:!x},{caption:"\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435:",value:M||"",message:l.ENTER_IMAGE,type:T.FILE}];return y(U,{children:[y("div",{children:[o("div",{className:"d-flex flex-nowrap gap-2 align-items-start",children:o(Z,{title:"\u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B: ",value:u,items:z,onChange:(s,t)=>{i(a=>({...a,baseMaterial:j(t),extMaterialIndex:0}))}})}),o("hr",{}),o(_,{heads:p,content:n,onSelectRow:s=>{i(t=>({...t,extMaterialIndex:s}))}})]}),e!=null&&e.Read?o(O,{name:m.name,items:r,onUpdate:e!=null&&e.Update?async(s,t)=>{const a=s[0]?t[0]:"",A=s[1]?t[1]:"",R=s[2]?t[2]:G.FASAD,N=s[3]?t[3]:"";return await C({name:m.name,material:u,newName:a,newCode:A,image:N,purpose:R})}:void 0,onDelete:e!=null&&e.Delete?async()=>{const s=await c(m);return i(t=>({...t,extMaterialIndex:0})),s}:void 0,onAdd:e!=null&&e.Create?async(s,t)=>{const a=t[0],A=t[1],R=K(t[2]),N=t[3];return V(a,u,d)?{success:!1,message:l.MATERIAL_EXIST}:await I({name:a,material:u,code:A,image:"",purpose:R},N)}:void 0}):o("div",{})]})}function xe(){const{permissions:f}=S(v),e=f.get(P.MATERIALS),d=S(Y),[{type:u,profileIndex:g},i]=E.exports.useState({type:d[0].type,profileIndex:0}),c=d.filter(s=>s.type===u),I=S(k),C=E.exports.useMemo(()=>I.map(s=>s.name).toSorted(),[I]);E.exports.useMemo(()=>{i({type:d[0].type,profileIndex:0})},[d]);const L=D($),m=D(ee),M=D(te),x=c[g],p=["\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435","\u041A\u043E\u0434","\u0429\u0435\u0442\u043A\u0430"],n=c.map(s=>[s.name,s.code,s.brush]),r=[{caption:"\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435:",value:x.name,message:l.ENTER_CAPTION,type:T.TEXT},{caption:"\u041A\u043E\u0434:",value:x.code,message:l.ENTER_CODE,type:T.TEXT},{caption:"\u0429\u0435\u0442\u043A\u0430:",value:x.brush,list:C,message:l.ENTER_BRUSH,type:T.LIST}];return y(U,{children:[y("div",{children:[o("div",{className:"d-flex flex-nowrap gap-2 align-items-start",children:o(Z,{title:"\u0422\u0438\u043F: ",value:u||"",items:W,onChange:(s,t)=>{i({type:t,profileIndex:0})}})}),o("hr",{}),o(_,{heads:p,content:n,onSelectRow:s=>{i(t=>({...t,profileIndex:s}))}})]}),e!=null&&e.Read?o(O,{name:x.name,items:r,onUpdate:e!=null&&e.Update?async(s,t)=>{const a=s[0]?t[0]:"",A=s[1]?t[1]:"",R=s[2]?t[2]:"";return await M({name,type:u,newName:a,newCode:A,newBrush:R})}:void 0,onDelete:e!=null&&e.Delete?async()=>{const s=await L(x);return i(t=>({...t,profileIndex:0})),s}:void 0,onAdd:e!=null&&e.Create?async(s,t)=>{const a=t[0],A=t[1],R=t[2];return c.find(h=>h.name===a&&h.type===u)?{success:!1,message:l.MATERIAL_EXIST}:await m({name:a,type:u,code:A,brush:R})}:void 0}):o("div",{})]})}function Re(){const{permissions:f}=S(v),e=f.get(P.MATERIALS),d=S(se),u=E.exports.useMemo(()=>d.toSorted((t,a)=>(t==null?void 0:t.name)>(a==null?void 0:a.name)?1:-1),[d]),g=S(F),i=E.exports.useMemo(()=>g.filter(t=>t.material===b.DSP).map(t=>t.name),[g]),[c,I]=E.exports.useState(0),{name:C,dsp:L,code:m}=u[c]||{name:"",dsp:"",code:""},M=D(ue),x=D(ae),p=D(ne),n=["\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435","\u041A\u043E\u0434","\u0421\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435 \u0414\u0421\u041F"],r=u.map(t=>[t.name,t.code,t.dsp]),s=[{caption:"\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435:",value:C||"",message:l.ENTER_CAPTION,type:T.TEXT},{caption:"\u041A\u043E\u0434:",value:m,message:l.ENTER_CODE,type:T.TEXT},{caption:"\u0421\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435 \u0414\u0421\u041F:",value:L,list:i,message:l.ENTER_CORRESPOND,type:T.LIST}];return y(U,{children:[o(_,{heads:n,content:r,onSelectRow:t=>{I(t)}}),e!=null&&e.Read?o(O,{name:C,items:s,onUpdate:e!=null&&e.Update?async(t,a)=>{const A=t[0]?a[0]:"",R=t[1]?a[1]:"",N=t[2]?a[2]:"";return await p({name:u[c].name,newName:A,code:R,dsp:N})}:void 0,onDelete:e!=null&&e.Delete?async t=>{const a=u.findIndex(R=>R.name===t),A=await M(u[a]);return I(0),A}:void 0,onAdd:e!=null&&e.Create?async(t,a)=>{const A=a[0],R=a[1],N=a[2];return u.find(X=>X.name===A)?{success:!1,message:l.MATERIAL_EXIST}:await x({name:A,dsp:N,code:R})}:void 0}):o("div",{})]})}function Ce(){const{permissions:f}=S(v),e=f.get(P.MATERIALS),d=S(oe),u=E.exports.useMemo(()=>d.toSorted((t,a)=>t.name>a.name?1:-1),[d]),g=S(F),[i,c]=E.exports.useState(0),I=E.exports.useMemo(()=>g.filter(t=>t.material===b.DSP).map(t=>t.name),[g]),{name:C,dsp:L,code:m}=u[i]||{name:"",dsp:"",code:""},M=D(ce),x=D(de),p=D(ie),n=["\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435","\u041A\u043E\u0434","\u0421\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435 \u0414\u0421\u041F"],r=u.map(t=>[t.name,t.code,t.dsp]),s=[{caption:"\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435:",value:C||"",message:l.ENTER_CAPTION,type:T.TEXT},{caption:"\u041A\u043E\u0434:",value:m,message:l.ENTER_CODE,type:T.TEXT},{caption:"\u0421\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435 \u0414\u0421\u041F:",value:L,list:I,message:l.ENTER_CORRESPOND,type:T.LIST}];return E.exports.useEffect(()=>{c(0)},[u]),y(U,{children:[o(_,{heads:n,content:r,onSelectRow:t=>{c(t)}}),e!=null&&e.Read?o(O,{name:C,items:s,onUpdate:e!=null&&e.Update?async(t,a)=>{const A=t[0]?a[0]:"",R=t[1]?a[1]:"",N=t[2]?a[2]:"";return await p({name:C,newName:A,code:R,dsp:N})}:void 0,onDelete:e!=null&&e.Delete?async()=>{const t=await M(u[i]);return c(0),t}:void 0,onAdd:e!=null&&e.Create?async(t,a)=>{const A=a[0],R=a[1],N=a[2];return u.find(X=>X.name===A)?{success:!1,message:l.MATERIAL_EXIST}:await x({name:A,dsp:N,code:R})}:void 0}):o("div",{})]})}function Le(){const{permissions:f}=S(v),e=f.get(P.MATERIALS),d=S(k),u=E.exports.useMemo(()=>d.toSorted((n,r)=>n.name>r.name?1:-1),[d]),[g,i]=E.exports.useState(0),{name:c,code:I}=u[g]||{name:"",code:""},C=D(re),L=D(le),m=D(me),M=["\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435","\u041A\u043E\u0434"],x=u.map(n=>[n.name,n.code]),p=[{caption:"\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435:",value:c,message:l.ENTER_CAPTION,type:T.TEXT},{caption:"\u041A\u043E\u0434:",value:I,message:l.ENTER_CODE,type:T.TEXT}];return E.exports.useEffect(()=>{i(0)},[u]),y(U,{children:[o(_,{heads:M,content:x,onSelectRow:n=>{i(n)}}),e!=null&&e.Read?o(O,{name:c,items:p,onUpdate:e!=null&&e.Update?async(n,r)=>{const s=n[0]?r[0]:"",t=n[1]?r[1]:"";return await m({name:c,newName:s,code:t})}:void 0,onDelete:e!=null&&e.Delete?async n=>{const r=u.findIndex(t=>t.name===n),s=await C(u[r]);return i(0),s}:void 0,onAdd:e!=null&&e.Create?async(n,r)=>{const s=r[0],t=r[1];return u.find(A=>A.name===s)?{success:!1,message:l.MATERIAL_EXIST}:await L({name:s,code:t})}:void 0}):o("div",{})]})}function Me(){const{permissions:f}=S(v),e=f.get(P.MATERIALS),d=S(Ee),u=E.exports.useMemo(()=>d.toSorted((p,n)=>p.caption>n.caption?1:-1),[d]),[g,i]=E.exports.useState(0),{name:c,caption:I,code:C}=u[g]||{name:"",caption:"",code:""},L=D(pe),m=["\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435","\u041A\u043E\u0434"],M=u.map(p=>[p.caption,p.code]),x=[{caption:"\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435:",value:I,message:l.ENTER_CAPTION,type:T.TEXT},{caption:"\u041A\u043E\u0434:",value:C,message:l.ENTER_CODE,type:T.TEXT}];return E.exports.useEffect(()=>{i(0)},[d]),y(U,{children:[o(_,{heads:m,content:M,onSelectRow:p=>{i(p)}}),e!=null&&e.Read?o(O,{name:c,items:x,onUpdate:e!=null&&e.Update?async(p,n)=>{const r=p[0]?n[0]:"",s=p[1]?n[1]:"";return await L({name:c,caption:r,code:s})}:void 0}):o("div",{})]})}function Ne(){const{permissions:f}=S(v),e=f.get(P.MATERIALS),d=S(Ae),u=E.exports.useMemo(()=>d.toSorted((n,r)=>n.name>r.name?1:-1),[d]),[g,i]=E.exports.useState(0),{name:c,code:I}=u[g]||{name:"",code:""},C=D(Te),L=D(De),m=D(ge),M=["\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435","\u041A\u043E\u0434"],x=u.map(n=>[n.name,n.code]),p=[{caption:"\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435:",value:c||"",message:l.ENTER_CAPTION,type:T.TEXT},{caption:"\u041A\u043E\u0434:",value:I,message:l.ENTER_CODE,type:T.TEXT}];return E.exports.useEffect(()=>{i(0)},[d]),y(U,{children:[o(_,{heads:M,content:x,onSelectRow:n=>{i(n)}}),e!=null&&e.Read?o(O,{name:c,items:p,onUpdate:e!=null&&e.Update?async(n,r)=>{const s=n[0]?r[1]:"",t=n[1]?r[2]:"";return await m({name:c,code:s,caption:t})}:void 0,onDelete:e!=null&&e.Delete?async()=>{const n=await C(u[g]);return i(0),n}:void 0,onAdd:async(n,r)=>{const s=r[0];return u.find(a=>a.name===c)?{success:!1,message:l.MATERIAL_EXIST}:await L({name:c,code:s})}}):o("div",{})]})}function we(){const{permissions:f}=S(v),e=f.get(P.PRICES),[d,u]=E.exports.useState(w.PLATE),g=[...Se.entries()].map((c,I)=>o("div",{className:d===c[0]?"tab-button-active":"tab-button-inactive",onClick:()=>{u(c[0])},role:"button",children:c[1]},I)),i=ye(d);return E.exports.useEffect(()=>{e!=null&&e.Read||window.location.replace("/")},[e]),y("div",{className:"database-edit-container",children:[o("div",{className:"tab-header-container",children:g}),i]})}function ye(f){return{[w.PLATE]:o(Ie,{}),[w.PROFILE]:o(xe,{}),[w.EDGE]:o(Re,{}),[w.ZAGLUSHKI]:o(Ce,{}),[w.BRUSH]:o(Le,{}),[w.TREMPEL]:o(Me,{}),[w.UPLOTNITEL]:o(Ne,{})}[f]||o(fe,{})}export{we as default};
