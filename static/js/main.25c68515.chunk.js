(this.webpackJsonpnordicprediction=this.webpackJsonpnordicprediction||[]).push([[0],{110:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(13),o=n.n(i),c=n(66),l=(n(77),n(78),n(79),n(80),n(81),n(30)),s=n(31),u=n(34),m=n(32),g=n(35),d=n(17),h=n(62),p=n.n(h),f=n(22),v=n(114),E=n(116),b=n(115),y=n(117),S=n(33),x=n(113);var R=Object(S.a)((function(e){return r.a.createElement(E.a,{content:r.a.createElement("div",{width:200,style:{padding:10}},r.a.createElement(x.a,e))},r.a.createElement(y.b,{icon:"filter",minimal:!0}))}));var j=Object(S.a)((function(e){var t=e.history,n=e.companies,a=e.onChange,i=e.fittRange,o=e.dividendRatioRange,c=e.peRange,l=e.yieldRange,s=n.filter((function(e){return e.get("estimate")})).sortBy((function(e){return-e.get("estimate")}));return r.a.createElement("table",{class:"bp3-html-table .modifier"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Name"),r.a.createElement("th",null,"Estimate"),r.a.createElement("th",null,"Yield",r.a.createElement(R,{value:l,onChange:function(e){return a({yieldRange:e})},min:0,max:.2,stepSize:.01,labelStepSize:.02,vertical:!0})),r.a.createElement("th",null,"P/E",r.a.createElement(R,{value:c,onChange:function(e){return a({peRange:e})},min:-100,max:100,stepSize:1,labelStepSize:20,vertical:!0})),r.a.createElement("th",null,"Avg Div Ratio",r.a.createElement(R,{value:o,onChange:function(e){return a({dividendRatioRange:e})},min:0,max:2,stepSize:.1,labelStepSize:.1,vertical:!0})),r.a.createElement("th",null,"Model fitt",r.a.createElement(R,{value:i,onChange:function(e){return a({fittRange:e})},min:0,max:1,stepSize:.1,labelStepSize:.2,vertical:!0})),r.a.createElement("th",null,"Momentum 90"))),r.a.createElement("tbody",null,s.map((function(e,n){return r.a.createElement("tr",{key:n},r.a.createElement("td",null,r.a.createElement(y.a,{href:e.get("borsdataLink"),rightIcon:"share",target:"_blank",minimal:!0}),r.a.createElement(y.a,{onClick:function(){return t.push(e.get("CountryShortName"))},rightIcon:"share",target:"_blank",minimal:!0}),e.getIn(["Name"])),r.a.createElement("td",null,(100*e.getIn(["estimate"])).toFixed(2)+"%"),r.a.createElement("td",null,(100*e.getIn(["yield"])).toFixed(1)+"%"),r.a.createElement("td",null,e.getIn(["pe"]).toFixed(2)),r.a.createElement("td",null,(100*e.getIn(["avgDividendRatio"])).toFixed(1)+"%"),r.a.createElement("td",null,e.getIn(["fitt"]).toFixed(2)),r.a.createElement("td",null,Math.round(36500*e.getIn(["stockPriceMomentum"]))+"%"))}))))})),k=n(29),w=r.a.createContext(),O=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(u.a)(this,Object(m.a)(t).call(this))).startDrag=function(t,n){t.preventDefault();var a=function(t){t.preventDefault();var a=e.svg.createSVGPoint();a.x=t.clientX,a.y=t.clientY,a=a.matrixTransform(e.svg.getScreenCTM().inverse()),e.setState({points:e.state.points.map((function(e,t){return n===t?{x:Math.max(Math.min(a.x,1e3),0),y:Math.max(Math.min(a.y,1e3),0)}:e}))})};document.addEventListener("mousemove",a),document.addEventListener("mouseup",(function e(t){document.removeEventListener("mousemove",a),document.removeEventListener("mouseup",e)}))},e.state={historic:[[100,8,-10],[10,8,-10],[30,-100,15]],projection:[[10,18],[12,10],[-10,10],[10,10*Math.random()]],points:[{x:30,y:900},{x:900,y:900}]},e}return Object(g.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.companies,a=t.match,i=this.state,o=i.historic,c=i.projection,l=this.state.points,s=n.find((function(e){return e.get("ShortName")===a.params.id}));console.log("props",this.props,a.params.id),console.log("state",this.state),console.log("companies",n.toJS()),console.log("company",s);var u=Math.max.apply(Math,[0].concat(Object(k.a)(o.flat()),Object(k.a)(c.flat()))),m=1e3/(u-Math.min.apply(Math,[0].concat(Object(k.a)(o.flat()),Object(k.a)(c.flat())))),g=u*m,d=o.length+c.length,h=(1200-50*d)/d,p=o.concat(c).map((function(e,t){return e.map((function(n,a){return{x:50*t+h*(t+a/e.length),y:n>0?g-n*m:g,width:10,height:Math.abs(n)*m,fill:n>0?"blue":"red"}}))})).flat();return console.log("historicBars",m,p),r.a.createElement("div",null,r.a.createElement("svg",{width:"100%",height:"100%",viewBox:"0 0 ".concat(1200," ").concat(1e3),ref:function(t){return e.svg=t}},p.map((function(e,t){return r.a.createElement("rect",Object.assign({},e,{key:t}))})),r.a.createElement("line",{x1:l[0].x,y1:l[0].y,x2:l[1].x,y2:l[1].y,fill:"transparent",stroke:"gray",strokeWidth:"4",strokeDasharray:"5,5",key:"line"}),l.map((function(t,n){return r.a.createElement("g",{transform:"translate(-15, -15)",key:n},r.a.createElement("rect",{x:t.x,y:t.y,key:n,width:"30",height:"30",onMouseDown:function(t){return e.startDrag(t,n)}}))}))))}}]),t}(r.a.Component);O.contextType=w;var C=O;n(44);function I(e){var t=e.length,n=e.reduce((function(e,t,n){return e+n}),0)/t,a=e.reduce((function(e,t,n){return e+t}),0)/t,r=e.reduce((function(e,t,a){return e+(a-n)*(a-n)}),0),i=e.reduce((function(e,t,n){return e+(t-a)*(t-a)}),0),o=e.reduce((function(e,t,n){return e+n*t}),0)-t*n*a,c=o/r;return{biasStart:a,biasEnd:a-c*n+(t-1)*c,slope:c,std:Math.sqrt(i),fitt:o*o/r/i}}function M(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;return e.biasEnd+n*e.slope/2-Math.max(t,0)*a}var z=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={selected:"avanza",estimateType:"earnings",minimumFittDynamic:.2,minimumFitt:.2,revenueGrowth:!1,earningsGrowth:!1,fittRange:[0,1],dividendRatioRange:[0,1],peRange:[0,100],yieldRange:[0,.2],projectionTime:5,estimationTime:4,companiesExternal:Object(f.a)({}),companiesInternal:Object(f.a)({})},n}return Object(g.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;p.a.get("https://bofa.github.io/stock-prediction/earnings.json").then((function(t){var n=t.data.reduce((function(e,t,n){return e[t.ShortName]=t,e}),{});e.setState({companiesExternal:Object(f.a)(n)})}))}},{key:"render",value:function(){var e=this,t=this.state,n=t.projectionTime,a=t.estimationTime,i=t.companiesExternal,o=t.companiesInternal,c=t.estimateType,l=(t.minimumFitt,t.minimumFittDynamic,t.revenueGrowth),s=t.earningsGrowth,u=t.fittRange,m=t.dividendRatioRange,g=t.peRange,h=t.yieldRange;if(i.size<1)return null;var p=i.filter((function(e){return e.has("earnings")&&e.get("earnings").size>=a})).map((function(e){var t=function(e,t,n,a){var r,i=e.toJS(),o=i.avgDividendRatio,c=i.netBrowing,l=i.earnings,s=Math.min(o,.8);if(void 0===(r="combo"===a?i.earnings.map((function(e,t){return(e+i.freeCashFlow[t])/2})):i[a])||r.length<t)return NaN;var u=I(r.slice(l.length-t,l.length));return{estimate:s*M(u,c,t,n),fitt:u.fitt}}(e,n,0,c),r=t.estimate,i=t.fitt,o=I(e.get("revenue").slice(-a).toJS()),l=I(e.get("earnings").slice(-a).toJS());return e.set("estimate",r/e.get("price")/e.getIn(["numberOfStocks",-1])).set("fitt",i).set("revenueLs",Object(f.a)(o)).set("earningsLs",Object(f.a)(l)).set("yield",e.getIn(["dividend",-1])/e.getIn(["price"])/e.getIn(["numberOfStocks",-1])).set("pe",e.getIn(["price"])*e.getIn(["numberOfStocks",-1])/e.getIn(["earnings",-1])).set("borsdataLink","https://borsdata.se/".concat(e.get("CountryUrlName"),"/nyckeltal"))})).filter((function(e){return!l||e.getIn(["revenueLs","slope"])>0})).filter((function(e){return!s||e.getIn(["earningsLs","slope"])>0})).mergeDeep(o).filter((function(e){return e.get("fitt")>=u[0]&&e.get("fitt")<=u[1]})).filter((function(e){return e.get("pe")>=g[0]&&e.get("pe")<=g[1]})).filter((function(e){return e.get("yield")>=h[0]&&e.get("yield")<=h[1]})).filter((function(e){return e.get("avgDividendRatio")>=m[0]&&e.get("avgDividendRatio")<=m[1]})).toList();console.log("mergedCompanies",p.toJS());var S={fittRange:u,dividendRatioRange:m,peRange:g,yieldRange:h};return[r.a.createElement("nav",{class:"bp3-navbar .modifier"},r.a.createElement("div",{class:"bp3-navbar-group bp3-align-left"},r.a.createElement("div",{class:"bp3-navbar-heading"},"Prediction"),r.a.createElement("div",{class:"bp3-select .modifier"},r.a.createElement("select",{value:c,onChange:function(t){return e.setState({estimateType:t.currentTarget.value})}},r.a.createElement("option",{value:"earnings"},"Earnings"),r.a.createElement("option",{value:"revenue"},"Revenue"),r.a.createElement("option",{value:"freeCashFlow"},"Free Cash Flow"),r.a.createElement("option",{value:"combo"},"Combo"))),r.a.createElement("div",{class:"bp3-navbar-group"},r.a.createElement(v.a,{checked:l,inline:!0,label:"Revenue Growth",onChange:function(t){return e.setState({revenueGrowth:t.target.checked})}}),r.a.createElement(v.a,{checked:s,inline:!0,label:"Earnings Growth",onChange:function(t){return e.setState({earningsGrowth:t.target.checked})}})),r.a.createElement("div",null,r.a.createElement(E.a,{content:r.a.createElement("div",{width:200,style:{padding:10}},r.a.createElement(b.a,{value:a,onChange:function(t){return e.setState({estimationTime:t})},min:2,max:10,stepSize:1,labelStepSize:2,vertical:!0}))},r.a.createElement(y.b,{icon:"filter",minimal:!0},a," Est Time"))),r.a.createElement("div",null,r.a.createElement(E.a,{content:r.a.createElement("div",{width:200,style:{padding:10}},r.a.createElement(b.a,{value:n,onChange:function(t){return e.setState({projectionTime:t})},min:2,max:10,stepSize:1,labelStepSize:2,vertical:!0}))},r.a.createElement(y.b,{icon:"filter",minimal:!0},n," Proj Time"))))),r.a.createElement(d.a,{path:"/",exact:!0,render:function(t){return r.a.createElement(j,Object.assign({},t,{companies:p},S,{onChange:function(t){return e.setState(t)}}))}}),r.a.createElement(d.a,{path:"/:id",exact:!0,render:function(e){return r.a.createElement(C,Object.assign({},e,{companies:p}))}})]}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(c.a,null,r.a.createElement(z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},72:function(e,t,n){e.exports=n(110)},81:function(e,t,n){}},[[72,1,2]]]);
//# sourceMappingURL=main.25c68515.chunk.js.map