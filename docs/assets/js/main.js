"use strict";const images=["./assets/images/kiwi.png","./assets/images/avocado.png","./assets/images/apple.png","./assets/images/orange.png","./assets/images/watermelon.png","./assets/images/pineapple.png"],searchBtn=document.querySelector(".js-search"),randomisedElements=[].concat(images,images.slice()).sort(()=>Math.random()-.5);let remainingCards=randomisedElements.length,flippedCards=[];const game=document.querySelector(".game"),checkMatch=()=>{flippedCards[0].dataset.value===flippedCards[1].dataset.value?(flippedCards.forEach(e=>{remainingCards-=1,e.removeEventListener("click",flipCard)}),flippedCards=[],0===remainingCards&&generateConfetti()):(flippedCards.forEach(e=>e.setAttribute("src","./assets/images/interrogación.jpg")),flippedCards=[])};function flipCard(){flippedCards.length<2&&!flippedCards.includes(this)&&(this.setAttribute("src",this.dataset.value),flippedCards.push(this),2===flippedCards.length&&setTimeout(checkMatch,1e3))}const cardGenerator=e=>{const t=document.createElement("img");t.classList.add("card"),t.dataset.value=e,t.setAttribute("src","./assets/images/interrogación.jpg"),t.addEventListener("click",flipCard,t),game.appendChild(t)};randomisedElements.forEach(e=>{cardGenerator(e)});const generateConfetti=()=>{const e=Date.now()+15e3,t={startVelocity:30,spread:360,ticks:60,zIndex:0},a=(e,t)=>Math.random()*(t-e)+e,s=setInterval((function(){const i=e-Date.now();if(i<=0)return clearInterval(s);const n=i/15e3*50;confetti(Object.assign({},t,{particleCount:n,origin:{x:a(.1,.3),y:Math.random()-.2}})),confetti(Object.assign({},t,{particleCount:n,origin:{x:a(.7,.9),y:Math.random()-.2}}))}),250)};