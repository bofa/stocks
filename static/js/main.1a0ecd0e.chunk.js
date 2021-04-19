(this.webpackJsonpstocks=this.webpackJsonpstocks||[]).push([[0],{112:function(e,t,n){e.exports=n(165)},121:function(e,t,n){},165:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(9),o=n.n(i),l=n(65),c=(n(117),n(118),n(119),n(120),n(121),n(19)),u=n(22),s=n(23),m=n(27),g=n(24),d=n(28),f=n(25),v=n(20),p=n(14),h=n(29),E=n.n(h),b=n(8),S=n(168),y=n(26);var j=Object(y.a)((function(e){return r.a.createElement(S.e,{content:r.a.createElement("div",{width:200,style:{padding:10}},r.a.createElement(S.f,e))},r.a.createElement(S.b,{icon:"filter",minimal:!0}))}));var I=Object(y.a)((function(e){var t=e.history,n=e.companies,a=e.onChange,i=e.fittRange,o=e.dividendRatioRange,l=e.peRange,c=e.yieldRange,u=n.sortBy((function(e){return-e.get("estimate")}));return r.a.createElement("table",{className:"bp3-html-table .modifier",key:"insideTable"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Name"),r.a.createElement("th",null,"Estimate"),r.a.createElement("th",null,"Yield",r.a.createElement(j,Object.assign({onChange:function(e){return a({yieldRange:e})}},c,{stepSize:.01,labelStepSize:.2,vertical:!0}))),r.a.createElement("th",null,"P/E",r.a.createElement(j,Object.assign({onChange:function(e){return a({peRange:e})}},l,{stepSize:1,labelStepSize:10,vertical:!0}))),r.a.createElement("th",null,"Avg Div Ratio",r.a.createElement(j,Object.assign({value:o,onChange:function(e){return a({dividendRatioRange:e})}},o,{stepSize:.1,labelStepSize:.2,vertical:!0}))),r.a.createElement("th",null,"Model fitt",r.a.createElement(j,{value:i.value,onChange:function(e){return a({fittRange:e})},min:0,max:1,stepSize:.1,labelStepSize:.2,vertical:!0})),r.a.createElement("th",null,"Momentum 90"))),r.a.createElement("tbody",null,u.map((function(e,n){return r.a.createElement("tr",{key:n},r.a.createElement("td",null,r.a.createElement(S.a,{href:e.get("borsdataLink"),rightIcon:"share",target:"_blank",minimal:!0}),r.a.createElement(S.a,{onClick:function(){return t.push(e.get("ShortName"))},rightIcon:"grouped-bar-chart",target:"_blank",minimal:!0}),e.getIn(["Name"])),r.a.createElement("td",null,(100*e.getIn(["estimate"])).toFixed(2)+"%"),r.a.createElement("td",null,Math.round(1e3*e.getIn(["yield"]))/10+"%"),r.a.createElement("td",null,e.getIn(["pe"]).toFixed(2)),r.a.createElement("td",null,(100*e.getIn(["avgDividendRatio"])).toFixed(1)+"%"),r.a.createElement("td",null,e.getIn(["fitt"]).toFixed(2)),r.a.createElement("td",null,Math.round(36500*e.getIn(["stockPriceMomentum"]))+"%"))}))))})),w=n(40);var O=Object(a.memo)((function(e){var t=e.company,n=e.onHome,a=e.onClear,i=e.onTrash,o=t.get("ShortName");return r.a.createElement(S.d,null,r.a.createElement(S.d.Group,{align:"left"},r.a.createElement(S.b,{minimal:!0,icon:"home",onClick:function(){return n()}}),r.a.createElement(S.d.Heading,null,t.get("Name")),r.a.createElement(S.d.Divider,null),r.a.createElement(S.a,{href:t.get("borsdataLink"),rightIcon:"share",target:"_blank",minimal:!0}),r.a.createElement(S.b,{minimal:!0,icon:"eraser",onClick:function(){return a(o)}}),r.a.createElement(S.b,{minimal:!0,icon:"trash",onClick:function(){return i(o)}}),r.a.createElement(S.d.Divider,null),r.a.createElement("div",null,"Estimate: ",(100*t.get("estimate")).toFixed(1),"%/y"),r.a.createElement(S.d.Divider,null),r.a.createElement("div",null,"Fitt: ",(100*t.get("fitt")).toFixed(1),"%"),r.a.createElement(S.d.Divider,null),r.a.createElement("div",null,"Dividend Ratio: ",(100*t.get("avgDividendRatio")).toFixed(1),"%")))})),k=function(e){function t(){return Object(u.a)(this,t),Object(m.a)(this,Object(g.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.companies,a=t.match,i=t.projectionTime,o=t.estimationTime,l=n.find((function(e){return e.get("ShortName")===a.params.id})),c=l.get("estimateFunc");console.log("company",l.toJS());var u=l.get("revenue").map((function(e,t){return Object(b.b)([{value:e,fill:e>0?"#123456":"red"},{value:-l.getIn(["netBrowing",t]),fill:l.getIn(["netBrowing",t])>0?"#ff00ff":"green"},{value:l.getIn(["freeCashFlow",t]),fill:l.getIn(["freeCashFlow",t])>0?"#0eefcd":"red"},{value:l.getIn(["earnings",t]),fill:l.getIn(["earnings",t])>0?"#2d578b":"red"},{value:l.getIn(["dividend",t]),fill:l.getIn(["dividend",t])>0?"#035C43":"red"}])})).toJS(),s=new Array(i).fill(0).map((function(e,t){return isNaN(l.getIn(["estimateAdjusted",""+t]))?{value:c(t),fill:"#035C43"}:{value:l.getIn(["estimateAdjusted",""+t]),fill:"#145C23"}})).map((function(e,t){return[Object(v.a)({},e,{onMouseDown:function(e){return R(e,t)}})]})),m=u.concat(s).flat().map((function(e){return e.value})),g=Math.max.apply(Math,[0].concat(Object(w.a)(m))),d=1e3/(g-Math.min.apply(Math,[0].concat(Object(w.a)(m)))),f=g*d,p=u.length+s.length,h=(1200-40*p)/p,E=function(e,t){return{x:40*e+h*(e+.5),y:f-t*d}},S=u.concat(s).map((function(e,t){return e.map((function(n,a){return{x:40*t+h*(t+a/e.length),y:n.value>0?f-n.value*d:f,width:8,height:Math.abs(n.value)*d,fill:n.fill,onMouseDown:n.onMouseDown}}))})).flat(),y=u.length-o,j=u.length+i,I=E(y,c(-o)),k=E(j,c(i)),R=function(t,n){t.preventDefault();document.addEventListener("mouseup",(function t(a){var r=e.svg.createSVGPoint();r.x=a.clientX,r.y=a.clientY;var i=(r=r.matrixTransform(e.svg.getScreenCTM().inverse())).y,o=(f-i)/d;e.props.setEstimateAdjusted(l.get("ShortName"),""+n,o),document.removeEventListener("mouseup",t)}))};return r.a.createElement("div",null,r.a.createElement(O,{company:l,onHome:function(){return e.props.history.goBack()},onClear:this.props.onClear,onTrash:this.props.onTrash}),r.a.createElement("div",{style:{margin:20}},r.a.createElement("svg",{width:"90vw",height:"100%",viewBox:"0 0 ".concat(1200," ").concat(1e3),ref:function(t){return e.svg=t}},S.map((function(e,t){return r.a.createElement("rect",Object.assign({},e,{key:t}))})),r.a.createElement("line",{x1:I.x,y1:I.y,x2:k.x,y2:k.y,fill:"transparent",stroke:"gray",strokeWidth:"4",strokeDasharray:"5,5",key:"line"}))))}}]),t}(r.a.Component);function R(e){var t=e.length,n=e.reduce((function(e,t,n){return e+n}),0)/t,a=e.reduce((function(e,t,n){return e+t}),0)/t,r=e.reduce((function(e,t,a){return e+(a-n)*(a-n)}),0),i=e.reduce((function(e,t,n){return e+(t-a)*(t-a)}),0),o=e.reduce((function(e,t,n){return e+n*t}),0)-t*n*a,l=o/r;return{biasStart:a,biasEnd:a-l*n+(t-1)*l,slope:l,std:Math.sqrt(i),fitt:o*o/r/i}}var x=function(e){function t(){var e;Object(u.a)(this,t),e=Object(m.a)(this,Object(g.a)(t).call(this));var n=localStorage.getItem("filterSettings"),a=localStorage.getItem("companiesInternal");return e.state=Object(v.a)({selected:"avanza",estimateType:"earnings",estimateDividendType:"sumAverage",revenueGrowth:!0,earningsGrowth:!0,netBrowingDecline:!0,fittRange:[.5,1],dividendRatioRange:[0,1],peRange:[0,50],yieldRange:[0,.2],estimationTime:6,projectionTime:4},JSON.parse(n),{companiesExternal:Object(b.a)(),companiesInternal:a?Object(b.b)(JSON.parse(a)):Object(b.a)(),companiesSheets:Object(b.a)()}),e}return Object(d.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=E.a.get("/earnings.json").then((function(e){return Object(b.b)(e.data.reduce((function(e,t,n){return e[t.ShortName]=t,e}),{}))})),n=E.a.get("/earnings2.json").then((function(e){return Object(b.b)(e.data.reduce((function(e,t,n){return e[t.ShortName]=t,e}),{}))}));n.then((function(e){return console.log("result",e.toJS())})),Promise.all([t,n]).then((function(t){return e.setState({companiesExternal:t[0].concat(t[1])})}));var a=E.a.get("https://spreadsheets.google.com/feeds/list/183-e_Hf_ZLD4D-91TtqpI35C6TQO_HanD-NKg-XjvAY/od6/public/values?alt=json").then((function(e){return e.data.feed.entry.map((function(e){return[e.gsx$keyborsdata.$t,e.gsx$price.$t]})).filter((function(e){return e[0].length>0}))}));Promise.all([t,a]).then((function(e){var t=Object(c.a)(e,2),n=t[0];return t[1].map((function(e){var t=Object(c.a)(e,2),a=t[0],r=t[1];return[n.find((function(e){return e.get("CountryUrlName")===a})),r]})).filter((function(e){return e[0]})).map((function(e){var t=Object(c.a)(e,2),n=t[0],a=t[1];return[n.get("ShortName"),{price:a}]}))})).then((function(e){return Object(b.b)(e.reduce((function(e,n){return Object(v.a)({},e,Object(f.a)({},n[t],n))}),{}));var t})).then((function(t){return e.setState({companiesSheets:t})}))}},{key:"render",value:function(){var e=this,t=this.state,n=t.projectionTime,a=t.estimationTime,i=t.companiesExternal,o=t.companiesInternal,l=t.companiesSheets,c=t.estimateType,u=t.estimateDividendType,s=t.revenueGrowth,m=t.earningsGrowth,g=t.netBrowingDecline,d=t.fittRange,f=t.dividendRatioRange,v=t.peRange,h=t.yieldRange;if(i.size<1)return null;console.log("state",this.state.companiesExternal.toJS(),o.toJS(),l.toJS());var E=i.mergeDeep(o).mergeDeep(l);console.log("Debug!",E.toJS());var y=i.mergeDeep(o).mergeDeep(l).filter((function(e){return e.has("dividend")})).map((function(e){var t=function(e,t,n,a,r,i){var o;if(void 0===(o="combo"===a?e.get("earnings").map((function(t,n){return(t+e.getIn(["freeCashFlow",n]))/2})):e.get(a))||o.length<i)return NaN;var l=o.slice(-i),c=l.reduce((function(e,t,n,a){return e+t})),u=e.get("dividend").slice(-i).reduce((function(e,t,n,a){return e+t}))/c,s=e.get("dividend").slice(-i).reduce((function(e,t,n,a){return e+t/l.get(n)/a.size}),0),m={all:1,sumAverage:Math.max(0,Math.min(.85,u)),individualAverage:s}[r],g=R(l.toJS()),d=function(e,t,n){arguments.length>3&&void 0!==arguments[3]&&arguments[3];var a=e.biasEnd,r=e.slope;return function(e){return a+r*(e+1)}}(g,e.get("netBrowing"),t,n);return{fitt:g.fitt,estimateFunc:function(e){return m*d(e)},dividendRatio:m}}(e,n,0,c,u,a),r=t.fitt,i=t.estimateFunc,o=t.dividendRatio,l=new Array(n).fill(0).map((function(t,n){return e.getIn(["estimateAdjusted",""+n])||i(n)})).reduce((function(e,t){return e+t}))/n,s=R(e.get("revenue").slice(-a).toJS()),m=R(e.get("earnings").slice(-a).toJS()),g=R(e.get("netBrowing").slice(-a).toJS());return e.set("estimate",l/e.get("price")/e.getIn(["numberOfStocks",-1])).set("estimateFunc",i).set("fitt",r).set("revenueLs",Object(b.b)(s)).set("earningsLs",Object(b.b)(m)).set("netBrowingLs",Object(b.b)(g)).set("avgDividendRatio",o).set("yield",e.getIn(["dividend",-1])/e.getIn(["price"])/e.getIn(["numberOfStocks",-1])).set("pe",e.getIn(["price"])*e.getIn(["numberOfStocks",-1])/e.getIn(["earnings",-1])).set("borsdataLink","https://borsdata.se/".concat(e.get("CountryUrlName"),"/nyckeltal"))})).toList();console.log("mergedCompanies",y.toJS());var j={projectionTime:n,estimationTime:a,estimateType:c,revenueGrowth:s,earningsGrowth:m,fittRange:d,dividendRatioRange:f,peRange:v,yieldRange:h,netBrowingDecline:g},w=y.map((function(e){return e.get("yield")})).filter((function(e){return!isNaN(e)})),O=y.map((function(e){return e.get("avgDividendRatio")})).filter((function(e){return!isNaN(e)})).filter((function(e){return e<1e3}));console.log("avgDividendRatioValues",O.toJS(),O.min(),O.max());var x={projectionTime:n,estimationTime:a,estimateType:c,revenueGrowth:s,netBrowingDecline:g,earningsGrowth:m,fittRange:{value:d,min:0,max:1},dividendRatioRange:{value:f,min:O.min(),max:O.max()},peRange:{value:v,min:0,max:50},yieldRange:{value:h,min:w.min(),max:w.max()}},C=y.filter((function(e){return!e.get("remove")})).filter((function(e){return e.has("earnings")&&e.get("earnings").size>=a})).filter((function(e){return!s||e.getIn(["revenueLs","slope"])>0})).filter((function(e){return!m||e.getIn(["earningsLs","slope"])>0})).filter((function(e){return!g||e.getIn(["netBrowingLs","slope"])<0})).filter((function(e){return e.get("fitt")>=d[0]&&e.get("fitt")<=d[1]})).filter((function(e){return(e.get("pe")>=v[0]||v[0]<=0)&&(e.get("pe")<=v[1]||v[1]===x.peRange.max)})).filter((function(e){return e.get("yield")>=h[0]&&e.get("yield")<=h[1]})).filter((function(e){return e.get("avgDividendRatio")>=f[0]&&e.get("avgDividendRatio")<=f[1]}));return localStorage.setItem("filterSettings",JSON.stringify(j)),localStorage.setItem("companiesInternal",JSON.stringify(o)),[r.a.createElement(S.d,null,r.a.createElement(S.d.Group,{align:"left"},r.a.createElement(S.d.Heading,null,"Stock Prediction"),r.a.createElement(S.d.Divider,null),r.a.createElement("select",{value:c,onChange:function(t){return e.setState({estimateType:t.currentTarget.value})}},r.a.createElement("option",{value:"earnings"},"Earnings"),r.a.createElement("option",{value:"revenue"},"Revenue"),r.a.createElement("option",{value:"freeCashFlow"},"Free Cash Flow"),r.a.createElement("option",{value:"combo"},"Combo")),r.a.createElement("select",{value:u,onChange:function(t){return e.setState({estimateDividendType:t.currentTarget.value})}},r.a.createElement("option",{value:"all"},"All"),r.a.createElement("option",{value:"sumAverage"},"Sum Average"),r.a.createElement("option",{value:"individualAverage"},"Individual Average")),r.a.createElement(S.c,{checked:s,inline:!0,label:"Revenue Growth",onChange:function(t){return e.setState({revenueGrowth:t.target.checked})}}),r.a.createElement(S.c,{checked:m,inline:!0,label:"Earnings Growth",onChange:function(t){return e.setState({earningsGrowth:t.target.checked})}}),r.a.createElement(S.c,{checked:g,inline:!0,label:"Net Borow Decline",onChange:function(t){return e.setState({netBrowingDecline:t.target.checked})}}),r.a.createElement(S.e,{content:r.a.createElement("div",{width:200,style:{padding:10}},r.a.createElement(S.g,{value:a,onChange:function(t){return e.setState({estimationTime:t})},min:2,max:10,stepSize:1,labelStepSize:2,vertical:!0}))},r.a.createElement(S.b,{icon:"filter",minimal:!0},a," Est Time")),r.a.createElement(S.e,{content:r.a.createElement("div",{width:200,style:{padding:10}},r.a.createElement(S.g,{value:n,onChange:function(t){return e.setState({projectionTime:t})},min:2,max:10,stepSize:1,labelStepSize:2,vertical:!0}))},r.a.createElement(S.b,{icon:"filter",minimal:!0},n," Proj Time")))),r.a.createElement(p.a,{key:"routeTable",path:"/",exact:!0,render:function(t){return r.a.createElement(I,Object.assign({key:"table"},t,{companies:C},x,{onChange:function(t){return e.setState(t)}}))}}),r.a.createElement(p.a,{key:"routeGraph",path:"/:id",exact:!0,render:function(t){return r.a.createElement(k,Object.assign({key:"graph"},t,{estimationTime:a,projectionTime:n,companies:y,onClear:function(t){return e.setState({companiesInternal:e.state.companiesInternal.setIn([t,"estimateAdjusted"],Object(b.b)({}))})},onTrash:function(t){return e.setState({companiesInternal:e.state.companiesInternal.setIn([t,"remove"],!0)})},setEstimateAdjusted:function(t,n,a){return e.setState({companiesInternal:e.state.companiesInternal.setIn([t,"estimateAdjusted",n],a)})}}))}})]}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(l.a,null,r.a.createElement(x,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[112,1,2]]]);
//# sourceMappingURL=main.1a0ecd0e.chunk.js.map