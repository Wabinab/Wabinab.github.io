import{Ia as s,Ja as C,Q as m,U as u,X as d,Y as g,ac as w,cc as E,db as _,fb as h,gb as v,hb as o,ib as a,jb as x,kb as y,lb as f,mb as l,qb as p,sb as k,xb as b}from"./chunk-YMYA36DF.js";function T(n,t){if(n&1){let c=y();o(0,"li",2),f("click",function(){let r=d(c).$implicit,M=l();return g(M.set_category(r))}),p(1),a()}if(n&2){let c=t.$implicit,i=t.$index,e=l();s(),k("",c," (",e.resp_length[i],")")}}var I=(()=>{let t=class t{constructor(i){this.http=i,this.emitCallback=new m,this.categories=[],this.resp_length=[],this.http.get("assets/categories.json",{responseType:"json"}).subscribe(e=>{this.categories=Object.keys(e),this.resp_length=this.categories.map(r=>e[r].length)})}set_category(i){this.emitCallback.emit({category:i})}};t.\u0275fac=function(e){return new(e||t)(C(w))},t.\u0275cmp=u({type:t,selectors:[["app-article-categories"]],outputs:{emitCallback:"emitCallback"},standalone:!0,features:[b],decls:6,vars:0,consts:[[1,"pt-5p5","category"],[1,"pt-5p5"],[3,"click"]],template:function(e,r){e&1&&(o(0,"h5",0),p(1,"Explore Articles By Category:"),a(),o(2,"ul"),h(3,T,2,2,"li",null,_),a(),x(5,"div",1)),e&2&&(s(3),v(r.categories))},dependencies:[E],styles:["ul[_ngcontent-%COMP%]{--percol: 4;--separation: 1.2em;-moz-column-count:var(--percol);-moz-column-gap:var(--separation);-webkit-column-count:var(--percol);-webkit-column-gap:var(--separation);column-count:var(--percol);column-gap:var(--separation);list-style-type:none}li[_ngcontent-%COMP%]:hover{color:var(--bs-primary);text-decoration:underline;cursor:pointer}"]});let n=t;return n})();export{I as ArticleCategoriesComponent};