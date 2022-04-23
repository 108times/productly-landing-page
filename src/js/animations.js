import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { CSSRulePlugin } from "gsap/CSSRulePlugin.js";
gsap.registerPlugin(ScrollTrigger, CSSRulePlugin);

import { doActionToMultipleElements, textTypingAnimation } from "./utils.js";

export default async function enableAnimations(delay) {
  // const sections = {
  //   navigation: document.querySelector(".navigation"),
  //   header: document.querySelector(".header"),
  //   features: document.querySelector(".features"),
  //   professionals: document.querySelector(".professionals"),
  //   managers: document.querySelector(".managers"),
  //   marketers: document.querySelector(".marketers"),
  //   testimonials: document.querySelector(".testimonials"),
  //   strategies: document.querySelector(".strategies"),
  //   footer: document.querySelector(".footer"),
  // };

  delay && (await new Promise((resolve) => setTimeout(resolve, delay)));

  // const beforeAnimations = async (duration) => {
  //   return new Promise((res) => {
  //     doActionToMultipleElements({
  //       handler: (el) => el.style.setProperty("opacity", "0"),
  //       elementsSelectors: ` .header__img`,
  //     });
  //     res();
  //   });
  // };

  const navigationAnimations = async (duration) => {
    duration = duration || 0.5;
    return new Promise((res) => {
      const tl = gsap.timeline({
        defaults: { duration },
        onComplete: res,
        ease: "slow",
      });
      // const before = CSSRulePlugin.getRule(".navigation .menu__item:before");
      tl.from(".navigation .logo", {
        y: 50,
        opacity: 0,
        delay: 0.2,
      });

      tl.from(".navigation .menu__item", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
      });
      tl.from(".navigation .btn--secondary, .navigation .btn--primary", {
        y: 50,
        opacity: 0,
        stagger: 0.25,
      });
    });
  };

  // navigation and header
  const headerAnimations = async (duration) => {
    duration = duration || 1.8;
    return new Promise((res) => {
      const tl = gsap.timeline({
        defaults: { duration },
        onComplete: res,
        scrollTrigger: {
          trigger: ".header",
        },
        delay: 2,
      });
      tl.to(".header__title", {
        onStart: () => {
          doActionToMultipleElements({
            handler: (el) => el.style.setProperty("opacity", "1"),
            elementsSelectors: `.header__title`,
          });
          textTypingAnimation(".header__title", duration);
        },
      })
        .to(".header__text", {
          delay: 0.1,
          duration: duration,
          onStart: () => {
            doActionToMultipleElements({
              handler: (el) => el.style.setProperty("opacity", "1"),
              elementsSelectors: `.header__text`,
            });
            textTypingAnimation(".header__text", duration);
          },
        })
        .from(".header__buttons .btn, .header__buttons .link", {
          scaleY: 0,
          delay: 0.4,
          ease: "elastic",
          stagger: 0.05,
          duration: duration * 1,
        })
        .fromTo(
          ".header__img",
          {
            duration: 0.1,
            x: 100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
          },
          "-=1.7"
        );
    });
  };

  // await beforeAnimations();
  navigationAnimations();
  await headerAnimations();
}
