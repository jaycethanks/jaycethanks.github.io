"use strict";
const rippleBtn = document.querySelector('.cus-btn--ripple');
function clickHandler() {
    console.log('clicked');
}
const ripple = document.createElement('div');
ripple.classList.add('cus-ripple');
rippleBtn.addEventListener('click', (e) => {
    const { offsetLeft, offsetTop } = rippleBtn;
    const { clientX, clientY } = e;
    const x = clientX - offsetLeft;
    const y = clientY - offsetTop;
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    rippleBtn.appendChild(ripple);
    setTimeout(() => {
        rippleBtn.removeChild(ripple);
    }, 600);
});
document.addEventListener('click', (e) => {
    const { nodeName } = e.target;
    nodeName === 'BUTTON' && clickHandler();
});
const particleBtn = document.querySelector('.cus-btn--particle');
particleBtn.addEventListener('click', (e) => {
    const particles = [];
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particles.push(particle);
        particleBtn.appendChild(particle);
    }
    particles.forEach(function (particle) {
        setTimeout(function () {
            particle.remove();
        }, 1000);
    });
});
