(this.webpackJsonpnordicprediction=this.webpackJsonpnordicprediction||[]).push([[0],{110:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(13),o=n.n(i),c=n(65),l=(n(77),n(78),n(79),n(80),n(81),n(30)),s=n(31),u=n(33),m=n(32),h=n(34),g=n(17),d=n(60),f=n.n(d),p=n(22),v=n(115),E=n(116),b=n(61),y=n(117),x=n(114),w=n(118);var j=Object(b.a)((function(e){var t=e.companies,n=e.onChange,a=e.fittRange,i=t.filter((function(e){return e.get("estimate")})).sortBy((function(e){return-e.get("estimate")})),o=r.a.createElement(y.a,{content:r.a.createElement("div",{width:200,style:{padding:10}},r.a.createElement(x.a,{min:0,max:1,stepSize:.1,labelStepSize:.1,onChange:function(e){return n({fittRange:e})},value:a,vertical:!0}))},r.a.createElement(w.a,{icon:"filter",minimal:!0}));return r.a.createElement("table",{class:"bp3-html-table .modifier"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Name"),r.a.createElement("th",null,"Estimate"),r.a.createElement("th",null,"Yield"),r.a.createElement("th",null,"P/E"),r.a.createElement("th",null,"Avg Dividend Ratio"),r.a.createElement("th",null,"Model fitt ",o),r.a.createElement("th",null,"Momentum 90"))),r.a.createElement("tbody",null,i.map((function(e){return r.a.createElement("tr",null,r.a.createElement("td",null,e.getIn(["Name"])),r.a.createElement("td",null,(100*e.getIn(["estimate"])).toFixed(2)+"%"),r.a.createElement("td",null,(100*e.getIn(["yield"])).toFixed(1)+"%"),r.a.createElement("td",null,e.getIn(["pe"]).toFixed(2)),r.a.createElement("td",null,(100*e.getIn(["avgDividendRatio"])).toFixed(1)+"%"),r.a.createElement("td",null,e.getIn(["fitt"]).toFixed(2)),r.a.createElement("td",null,Math.round(36500*e.getIn(["stockPriceMomentum"]))+"%"))}))))})),O=n(29),S=r.a.createContext(),k=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(u.a)(this,Object(m.a)(t).call(this))).startDrag=function(t,n){t.preventDefault();var a=function(t){t.preventDefault();var a=e.svg.createSVGPoint();a.x=t.clientX,a.y=t.clientY,a=a.matrixTransform(e.svg.getScreenCTM().inverse()),e.setState({points:e.state.points.map((function(e,t){return n===t?{x:Math.max(Math.min(a.x,1e3),0),y:Math.max(Math.min(a.y,1e3),0)}:e}))})};document.addEventListener("mousemove",a),document.addEventListener("mouseup",(function e(t){document.removeEventListener("mousemove",a),document.removeEventListener("mouseup",e)}))},e.state={historic:[[100,8,-10],[10,8,-10],[30,-100,15]],projection:[[10,18],[12,10],[-10,10],[10,10*Math.random()]],points:[{x:30,y:900},{x:900,y:900}]},e}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.companies,a=t.match,i=this.state,o=i.historic,c=i.projection,l=this.state.points,s=n.find((function(e){return e.get("ShortName")===a.params.id}));console.log("props",this.props,a.params.id),console.log("state",this.state),console.log("companies",n.toJS()),console.log("company",s);var u=Math.max.apply(Math,[0].concat(Object(O.a)(o.flat()),Object(O.a)(c.flat()))),m=1e3/(u-Math.min.apply(Math,[0].concat(Object(O.a)(o.flat()),Object(O.a)(c.flat())))),h=u*m,g=o.length+c.length,d=(1200-50*g)/g,f=o.concat(c).map((function(e,t){return e.map((function(n,a){return{x:50*t+d*(t+a/e.length),y:n>0?h-n*m:h,width:10,height:Math.abs(n)*m,fill:n>0?"blue":"red"}}))})).flat();return console.log("historicBars",m,f),r.a.createElement("div",null,r.a.createElement("svg",{width:"100%",height:"100%",viewBox:"0 0 ".concat(1200," ").concat(1e3),ref:function(t){return e.svg=t}},f.map((function(e,t){return r.a.createElement("rect",Object.assign({},e,{key:t}))})),r.a.createElement("line",{x1:l[0].x,y1:l[0].y,x2:l[1].x,y2:l[1].y,fill:"transparent",stroke:"gray",strokeWidth:"4",strokeDasharray:"5,5",key:"line"}),l.map((function(t,n){return r.a.createElement("g",{transform:"translate(-15, -15)",key:n},r.a.createElement("rect",{x:t.x,y:t.y,key:n,width:"30",height:"30",onMouseDown:function(t){return e.startDrag(t,n)}}))}))))}}]),t}(r.a.Component);k.contextType=S;var M=k;n(43);function I(e){var t=e.length,n=e.reduce((function(e,t,n){return e+n}),0)/t,a=e.reduce((function(e,t,n){return e+t}),0)/t,r=e.reduce((function(e,t,a){return e+(a-n)*(a-n)}),0),i=e.reduce((function(e,t,n){return e+(t-a)*(t-a)}),0),o=e.reduce((function(e,t,n){return e+n*t}),0)-t*n*a,c=o/r;return{biasStart:a,biasEnd:a-c*n+(t-1)*c,slope:c,std:Math.sqrt(i),fitt:o*o/r/i}}function C(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;return e.biasEnd+n*e.slope/2-Math.max(t,0)*a}var F=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={selected:"avanza",estimateType:"earnings",minimumFittDynamic:.2,minimumFitt:.2,revenueGrowth:!1,earningsGrowth:!1,fittRange:[0,1],companiesExternal:Object(p.a)({}),companiesInternal:Object(p.a)({})},n}return Object(h.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;f.a.get("https://bofa.github.io/stock-prediction/earnings.json").then((function(t){var n=t.data.reduce((function(e,t,n){return e[t.ShortName]=t,e}),{});e.setState({companiesExternal:Object(p.a)(n)})}))}},{key:"render",value:function(){var e=this,t=this.state,n=t.companiesExternal,a=t.companiesInternal,i=t.estimateType,o=(t.minimumFitt,t.minimumFittDynamic),c=t.revenueGrowth,l=t.earningsGrowth,s=t.fittRange;if(n.size<1)return null;var u=n.filter((function(e){return e.has("earnings")&&e.get("earnings").size>=4})).map((function(e){var t=function(e,t,n,a){var r,i=e.toJS(),o=i.avgDividendRatio,c=i.netBrowing,l=i.earnings,s=Math.min(o,.8);if(void 0===(r="combo"===a?i.earnings.map((function(e,t){return(e+i.freeCashFlow[t])/2})):i[a])||r.length<t)return NaN;var u=I(r.slice(l.length-t,l.length));return{estimate:s*C(u,c,t,n),fitt:u.fitt}}(e,5,0,i),n=t.estimate,a=t.fitt,r=I(e.get("revenue").slice(-4).toJS()),o=I(e.get("earnings").slice(-4).toJS());return e.set("estimate",n/e.get("price")/e.getIn(["numberOfStocks",-1])).set("fitt",a).set("revenueLs",Object(p.a)(r)).set("earningsLs",Object(p.a)(o)).set("yield",e.getIn(["dividend",-1])/e.getIn(["price"])/e.getIn(["numberOfStocks",-1])).set("pe",e.getIn(["price"])*e.getIn(["numberOfStocks",-1])/e.getIn(["earnings",-1])).set("borsdataLink","https://borsdata.se/".concat(e.get("CountryUrlName"),"/nyckeltal"))})).filter((function(e){return!c||e.getIn(["revenueLs","slope"])>0})).filter((function(e){return!l||e.getIn(["earningsLs","slope"])>0})).mergeDeep(a).filter((function(e){return e.get("fitt")>=s[0]&&e.get("fitt")<=s[1]})).toList();console.log("revenueGrowth",c);var m={fittRange:s};return[r.a.createElement("nav",{class:"bp3-navbar .modifier"},r.a.createElement("div",{class:"bp3-navbar-group bp3-align-left"},r.a.createElement("div",{class:"bp3-navbar-heading"},"Prediction"),r.a.createElement("div",{class:"bp3-select .modifier"},r.a.createElement("select",{value:i,onChange:function(t){return e.setState({estimateType:t.currentTarget.value})}},r.a.createElement("option",{value:"earnings"},"Earnings"),r.a.createElement("option",{value:"revenue"},"Revenue"),r.a.createElement("option",{value:"freeCashFlow"},"Free Cash Flow"),r.a.createElement("option",{value:"combo"},"Combo"))),r.a.createElement("div",{class:"bp3-navbar-group"},r.a.createElement(v.a,{checked:c,inline:!0,label:"Revenue Growth",onChange:function(t){return e.setState({revenueGrowth:t.target.checked})}}),r.a.createElement(v.a,{checked:l,inline:!0,label:"Earnings Growth",onChange:function(t){return e.setState({earningsGrowth:t.target.checked})}}))),r.a.createElement("div",{class:"bp3-navbar-group bp3-align-right"},r.a.createElement("div",null,r.a.createElement(E.a,{min:0,max:1,stepSize:.01,labelStepSize:.14,onChange:function(t){return e.setState({minimumFittDynamic:t})},onRelease:function(t){return e.setState({minimumFitt:t})},labelRenderer:function(e){return"".concat(Math.round(100*e),"%")},value:o})))),r.a.createElement(g.a,{path:"/",exact:!0,render:function(t){return r.a.createElement(j,Object.assign({},t,{companies:u},m,{onChange:function(t){return e.setState(t)}}))}}),r.a.createElement(g.a,{path:"/:id",exact:!0,render:function(e){return r.a.createElement(M,Object.assign({},e,{companies:u}))}})]}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(c.a,null,r.a.createElement(F,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},72:function(e,t,n){e.exports=n(110)},81:function(e,t,n){}},[[72,1,2]]]);
//# sourceMappingURL=main.6df50deb.chunk.js.map