(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(e){if(e.ep)return;e.ep=!0;const n=o(e);fetch(e.href,n)}})();const f=function(t){return document.querySelector(t)},a=(t,i,o)=>{t==null||t.addEventListener(i,o)},c=f(".the-btn");let d=!1;function u(){c&&c.textContent!==void 0&&(c.textContent=d?"Set light":"Set dark")}function l(){d=document.documentElement.classList.toggle("dark"),u()}a(c,"click",m);a(document,"DOMContentLoaded",u);function m(t){if(!document.startViewTransition){l();return}const i=(t==null?void 0:t.clientX)??innerWidth/2,o=(t==null?void 0:t.clientY)??innerHeight/2,r=Math.hypot(Math.max(i,innerWidth-i),Math.max(o,innerHeight-o));document.startViewTransition(()=>{console.log("trigger"),l()}).ready.then(()=>{document.documentElement.animate({clipPath:[`circle(0 at ${i}px ${o}px)`,`circle(${r}px at ${i}px ${o}px)`]},{duration:400,direction:d?"reverse":"normal",easing:"ease-in",pseudoElement:"::view-transition-new(root)"})})}