(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();const A={threshold:.2},f=document.querySelector(".ani-2"),S=function(e){e[0].isIntersecting&&f&&f.style.setProperty("--play-state","running")},E=new IntersectionObserver(S,A);f&&E.observe(f);const y=document.getElementById("spark"),n=document.querySelector(".ani-3");var p;for(let e=0;e<90;e++){const t=y&&((p=y.content.firstElementChild)==null?void 0:p.cloneNode(!0));t.setAttribute("data-index",e.toString()),n==null||n.appendChild(t)}const l=[72,54,36,18,0,19,38,57,76,58,40,22,4,6,24,42,60,78,7,79,8,80,43,44,82,65,48,31,14,10,29,67,86,88,70,52,34,16,15,17],c=1e3;let h,d=!0;function g(e,t){if(!e)return;let o;clearTimeout(o),o=setTimeout(()=>{e.setAttribute("data-state","off"),e.style.transform="unset"},t)}function m(){d&&(l.forEach(e=>{if(!n)return;let t=n.querySelector(`[data-index="${String(e)}"]`);if(t.getAttribute("data-state")==="off"){const i=Math.random()>.5?"medium":"off";t.style.transform="unset",t.setAttribute("data-state",i),i==="medium"&&(Math.random()>.7?setTimeout(()=>{t.setAttribute("data-state","high"),t.style.transform="scale(2.4)",g(t,Math.random()*c+400)},Math.random()*c):g(t,Math.random()*c))}}),clearTimeout(h),h=setTimeout(()=>{m()},c))}m();function M(){n&&(d=!1,l.forEach((e,t)=>{let o=n.querySelector(`[data-index="${String(e)}"]`);setTimeout(()=>{o.setAttribute("data-state","high"),o.style.transform="scale(2.4)"},10*t)}))}function x(){n&&(d=!1,l.forEach((e,t)=>{let o=n.querySelector(`[data-index="${String(e)}"]`);setTimeout(()=>{o.setAttribute("data-state","off"),o.style.transform="unset"},10*t)}),d=!0,m())}n==null||n.addEventListener("mouseenter",M);n==null||n.addEventListener("mouseout",x);document.getElementById("mySvg");const u=document.getElementById("gradient-0");function b(){if(!u)return;const e=Date.now()*.001,t=.9,o=.2,i=(Math.sin(e*t)*.5+.5)*100,r=(Math.cos(e*t)*.5+.5)*100,s=(Math.sin(e*t+o)*.5+.5)*100,a=(Math.cos(e*t+o)*.5+.5)*100;u.setAttribute("x1",`${i}%`),u.setAttribute("y1",`${r}%`),u.setAttribute("x2",`${s}%`),u.setAttribute("y2",`${a}%`),requestAnimationFrame(b)}b();