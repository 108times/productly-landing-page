"use strict";

import './ripple.css';

function getRippleContainer(element) {
    return (
        element.rippleContainer ??
        (function () {
            const res = document.createElement("div");
            res.className = "ripple-container";
            element.append(res);
            element.rippleContainer = res
            return res;
        })()
    );
}

function createRipple(container) {
    const ripple = document.createElement("div");
    ripple.className = "ripple";
    container.append(ripple);
    return ripple;
}

function rippleAppear(ripple, elem, event, onRippleStart) {
    return new Promise((resolve) => {
        setTimeout(function () {
            const { x, y, width, height } = elem.getBoundingClientRect();
            const { transitionDuration } = getComputedStyle(ripple);

            ripple.style.left = event.clientX - x + "px";
            ripple.style.top = event.clientY - y + "px";
            ripple.style.setProperty('--size',
                Math.ceil(Math.max(width, height) * 2.1) + 'px'
            )

            const duration = transitionDuration.replace("s", "") * 1000;

            setTimeout(function () {
                ripple.classList.add("appear");

                setTimeout(() => {
                    onRippleStart && onRippleStart();
                })
            })

            setTimeout(function () {
                resolve(duration);
            }, duration);
        });
    });
}

function rippleDisappear(ripple, duration) {
    ripple.classList.add("disappear");
    setTimeout(() => {
        ripple.remove();
    }, duration);
}

function singleRippleEffect(event, options) {
    const elem = event.target;
    if (elem.isRippled) return 1;

    const rippleContainer = getRippleContainer(elem);

    const ripple = createRipple(rippleContainer);
    rippleAppear(ripple, elem, event)
        .then((duration) => {
            elem.isRippled = true;
            document.addEventListener("mousemove", function handler(event) {
                event.stopPropagation()
                const tm = setInterval(function () {
                    if (event.target !== elem) {
                        elem.isRippled = false;
                        rippleDisappear(ripple, duration);
                        document.removeEventListener('mousemove', handler)
                        clearInterval(tm)
                    }
                }, 300)
            });
        });

    return 0;
}

function multipleRippleEffect(event, {onRippleStart}) {
    const elem = event.target;
    if (elem.isRippled) return 1;

    const rippleContainer = getRippleContainer(elem);

    const ripple = createRipple(rippleContainer);
    rippleAppear(ripple, elem, event, onRippleStart)
    .then((duration) => rippleDisappear(ripple, duration)
    );

    return 0;
}

export {singleRippleEffect, multipleRippleEffect}
