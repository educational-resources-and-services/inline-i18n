module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=2)}([function(e,t){function r(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}const i={},c=e=>{if(!e||"string"!=typeof e)throw new Error("You must pass a single string parameter to getI18nByNamespace. Use “default” for the base set.");return i[e]||(i[e]=l()),i[e]},l=()=>{const e=e=>{return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>").replace(/  /g,"&nbsp; ")},t={};let i="en";const c=["en"],l={};let s,a,u,f,p=e=>e;const y=e=>l[e]||i,g=e=>Object.assign({},...Object.values(e)),b=({locale:e,category:t})=>(t?l[t]=e:i=e,d(e)),d=e=>new Promise(r=>{if(!c.includes(e)){c.push(e);try{if(s)return s(e).then(n=>{t[e]=g(n),r()});if(a)return fetch(`${a}/${e}.json`).then(n=>n.json().then(n=>{t[e]=g(n),r()}))}catch(t){console.log(`Failed to get translations for ${e}`,t)}}r()}),h=e=>p(m(e),function(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?r(o,!0).forEach((function(t){n(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):r(o).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}({},e,{locale:y(e.category)})),m=({str:e="",desc:r="",category:n="default",options:o={}})=>{const c=o.locale||u&&u(o)||l[n]||i,s=(t[c]||{})[e];return void 0===s?e:(f&&!f[c]&&(f[c]={}),void 0===s[r]?(f&&(f[c][e]=s),s):(f&&!f[c][e]&&(f[c][e]={}),f&&(f[c][e][r]=s[r]),s[r]))},O=Array(200).fill(0).map((e,t)=>{let r=t,n="";return r>=100&&(n+="ק",r-=100),15===r&&(n+="טו",r=0),16===r&&(n+="טז",r=0),r>=10&&(n+="יכלמנסעפצ".substr(parseInt(r/10)-1,1),r%=10),r>=1&&(n+="אבגדהוזחט".substr(r-1,1),r=0),n});return{i18n:(...t)=>{if(0===t.length)return"";const r=t.shift(),n="string"==typeof t[0]?t.shift():void 0,o="string"==typeof t[0]?t.shift():void 0,i="object"==typeof t[0]?t.shift():{},c="object"==typeof t[0]?t.shift():{};let l=h({str:r,desc:n,category:o,options:c});return c.textToHtml&&(l=e(l)),l=l.replace(/{{([^}]+)}}/g,(e,t)=>void 0!==i[t]?i[t]:"")},i18nSetup:e=>{let{locales:r,translations:n,prepDump:i,hydrate:c}=e,l=o(e,["locales","translations","prepDump","hydrate"]);return new Promise(e=>{if(s=l.fetchLocale,a=l.localesUrl,u=l.determineLocaleFromOptions,p=l.translationModifier||p,i&&!f&&(f={}),n&&Object.keys(n).forEach(e=>{t[e]=g(n[e])}),c&&Object.keys(c).forEach(e=>{t[e]||(t[e]=JSON.parse(JSON.stringify(c[e])))}),(r||[]).length>0)return Promise.all(r.map(e=>b({locale:e}))).then(()=>{b({locale:r[0]}).then(e)});e()})},getLocale:y,isRTL:e=>["he","ar","dv","ku","fa","ur"].includes(e||i),setLocale:b,i18nPrefetch:d,i18nDump:()=>{return JSON.stringify(f||{})},getPreSwapTranslation:h,textToHtml:e,i18nNumber:({num:e,type:t,category:r})=>{switch(y(r)){case"he":if(["formal","chapter"].includes(t))return O[e]}return e}}},s=c("default");for(let e in s)c[e]=s[e];e.exports=c},function(e,t){e.exports=require("react")},function(e,t,r){"use strict";r.r(t),r.d(t,"i18nReact",(function(){return s}));var n=r(1),o=r.n(n),i=r(0),c=r.n(i);const l=e=>(...t)=>{const{getPreSwapTranslation:r,textToHtml:n}=c()(e);if(0===t.length)return"";const i=t.shift(),l="string"==typeof t[0]?t.shift():void 0,s="string"==typeof t[0]?t.shift():void 0,a="object"==typeof t[0]?t.shift():{},u="object"==typeof t[0]?t.shift():{};let f=r({str:i,desc:l,category:s,options:u});return u.textToHtml&&(f=n(f)),f.split(/({{(?:[^}]+)}})/g).map(e=>{const[t,r]=e.match(/^{{([^}]+)}}$/)||[];return r?void 0!==a[r]?o.a.createElement(o.a.Fragment,{key:r},a[r]):"":e})},s=l("default");t.default=l}]);