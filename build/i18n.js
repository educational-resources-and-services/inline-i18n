module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t){function r(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}const l=e=>{return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>").replace(/  /g,"&nbsp; ")},c={};let i="en";const u=["en"],a={};let s,f,p,y,b=e=>e;const g=e=>a[e]||i,d=e=>Object.assign({},...Object.values(e)),O=({locale:e,category:t})=>(t?a[t]=e:i=e,h(e)),h=e=>new Promise(t=>{if(!u.includes(e)){u.push(e);try{if(s)return s(e).then(r=>{c[e]=d(r),t()});if(f)return fetch(`${f}/${e}.json`).then(r=>r.json().then(r=>{c[e]=d(r),t()}))}catch(t){console.log(`Failed to get translations for ${e}`,t)}}t()}),m=e=>b(j(e),function(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?r(o,!0).forEach((function(t){n(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):r(o).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}({},e,{locale:g(e.category)})),j=({str:e="",desc:t="",category:r="default",options:n={}})=>{const o=n.locale||p&&p(n)||a[r]||i,l=(c[o]||{})[e];return void 0===l?e:(y&&!y[o]&&(y[o]={}),void 0===l[t]?(y&&(y[o][e]=l),l):(y&&!y[o][e]&&(y[o][e]={}),y&&(y[o][e][t]=l[t]),l[t]))},v=Array(200).fill(0).map((e,t)=>{let r=t,n="";return r>=100&&(n+="ק",r-=100),15===r&&(n+="טו",r=0),16===r&&(n+="טז",r=0),r>=10&&(n+="יכלמנסעפצ".substr(parseInt(r/10)-1,1),r%=10),r>=1&&(n+="אבגדהוזחט".substr(r-1,1),r=0),n});e.exports={i18n:(...e)=>{if(0===e.length)return"";const t=e.shift(),r="string"==typeof e[0]?e.shift():void 0,n="string"==typeof e[0]?e.shift():void 0,o="object"==typeof e[0]?e.shift():{},c="object"==typeof e[0]?e.shift():{};let i=m({str:t,desc:r,category:n,options:c});return c.textToHtml&&(i=l(i)),i=i.replace(/{{([^}]+)}}/g,(e,t)=>void 0!==o[t]?o[t]:"")},i18nSetup:e=>{let{locales:t,prepDump:r,hydrate:n}=e,l=o(e,["locales","prepDump","hydrate"]);return new Promise(e=>{if(s=l.fetchLocale,f=l.localesUrl,p=l.determineLocaleFromOptions,b=l.translationModifier||b,r&&!y&&(y={}),n&&Object.keys(n).forEach(e=>{c[e]||(c[e]=JSON.parse(JSON.stringify(n[e])))}),(t||[]).length>0)return Promise.all(t.map(e=>O({locale:e}))).then(()=>{O({locale:t[0]}).then(e)});e()})},getLocale:g,isRTL:e=>["he","ar","dv","ku","fa","ur"].includes(e||i),setLocale:O,i18nPrefetch:h,i18nDump:()=>{return JSON.stringify(y||{})},getPreSwapTranslation:m,textToHtml:l,i18nNumber:({num:e,type:t,category:r})=>{switch(g(r)){case"he":if("formal"===t)return v[e]}return e}}}]);