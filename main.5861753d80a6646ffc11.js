(()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{H:()=>v});var t="todos";function o(){var e=sessionStorage.getItem(t);return e?JSON.parse(e):[]}var n=function(e){var n=document.createElement("li");n.classList.add("todo-item");var s=document.createElement("span");s.innerText=e,s.classList.add("todo-text"),n.appendChild(s);var d=document.createElement("button");d.innerHTML='<i class="fas fa-check"></i>',d.classList.add("todo-check-button"),d.addEventListener("click",function(e){return function(t){var n=o(),s=Array.from(e.childNodes).find((function(e){return e.classList.contains("todo-text")}));if(s){var d=n.map((function(e){return e.value==s.innerText&&"uncompleted"===e.status?{value:s.innerText,status:"completed"}:e.value==s.innerText&&"completed"===e.status?{value:s.innerText,status:"uncompleted"}:e}));sessionStorage.setItem("todos",JSON.stringify(d))}t.preventDefault(),e.classList.toggle("todo-item_completed")}}(n)),n.appendChild(d);var r=document.createElement("button");return r.innerHTML='<i class="fas fa-trash"></i>',r.classList.add("todo-remove-button"),r.addEventListener("click",function(e){return function(n){n.preventDefault(),e.classList.add("todo-item_fall"),e.addEventListener("transitionend",(function(){!function(e){var n=o(),s=Array.from(e.childNodes).find((function(e){return e.classList.contains("todo-text")}));if(s){var d=n.filter((function(e){return e.value!==s.innerText}));sessionStorage.setItem(t,JSON.stringify(d))}}(e),e.remove(),v()}))}}(n)),n.appendChild(r),n};function s(e){return{todoInput:e.querySelector(".todo-input"),todoHelper:e.querySelector(".todo-helper"),todoButton:e.querySelector(".todo-button")}}function d(e){var t=s(e),o=t.todoInput,n=t.todoHelper,d=t.todoButton;o.value.length>=3?(d.classList.remove("todo-button_disabled"),n.classList.remove("todo-helper_visible")):(d.classList.add("todo-button_disabled"),n.classList.add("todo-helper_visible"))}var r=document.querySelector(".todo-input-wrapper"),a=s(r),i=a.todoInput,l=a.todoButton,c=document.querySelector(".todo-list"),u=document.querySelector(".todo-select"),p=document.querySelector(".todo-select-wrapper");function v(){c.children.length||(u.setAttribute("disabled","disabled"),p.classList.add("todo-select-wrapper_disabled"))}document.addEventListener("DOMContentLoaded",(function(){var e;e=o(),console.log(e),e.forEach((function(e){var t=n(e.value);"completed"===e.status&&t.classList.add("todo-item_completed"),c.appendChild(t)})),v()})),i.addEventListener("input",(function(){return d(r)})),i.addEventListener("keydown",(function(e){"Enter"===e.key&&i.value.length<3&&e.preventDefault()})),i.addEventListener("focus",(function(){return d(r)})),i.addEventListener("blur",(function(){return function(e){s(e).todoHelper.classList.remove("todo-helper_visible")}(r)})),l.addEventListener("click",(function(e){var d,a;e.preventDefault(),d={value:i.value,status:"uncompleted"},(a=o()).push(d),sessionStorage.setItem(t,JSON.stringify(a));var l=n(i.value);c.appendChild(l),c.children.length&&(u.removeAttribute("disabled"),p.classList.remove("todo-select-wrapper_disabled")),function(e){var t=s(e),o=t.todoInput,n=t.todoHelper,d=t.todoButton;o.value="",d.classList.add("todo-button_disabled"),n.classList.add("todo-helper_visible")}(r)})),u.addEventListener("change",(function(e){var t,o;t=c.childNodes,o=e.target.value,t.length&&t.forEach((function(e){switch(o){case"completed":e.classList.contains("todo-item_completed")?e.style.display="flex":e.style.display="none";break;case"uncompleted":e.classList.contains("todo-item_completed")?e.style.display="none":e.style.display="flex";break;default:return void(e.style.display="flex")}}))}))})();