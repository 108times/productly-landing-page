// import gsap and register plugins
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { CSSRulePlugin } from "gsap/CSSRulePlugin.js";
gsap.registerPlugin(ScrollTrigger, CSSRulePlugin);

// scroll trigger default values for all triggers
ScrollTrigger.defaults({
  toggleActions: "restart resume resume pause",
});

import { doActionToMultipleElements, textTypingAnimation } from "./utils.js";

const sections = {
  navigation: document.querySelector(".navigation"),
  header: document.querySelector(".header"),
  features: document.querySelector(".features"),
  professionals: document.querySelector(".professionals"),
  // managers: document.querySelector(".managers"),
  // marketers: document.querySelector(".marketers"),
  // testimonials: document.querySelector(".testimonials"),
  // strategies: document.querySelector(".strategies"),
  // footer: document.querySelector(".footer"),
};

const sectionRemoveClass = (sectionName, className) =>
  sections[sectionName].classList.remove(className);

const getClientWidth = () =>
  Math.max(
    window.innerWidth,
    document.documentElement.clientWidth,
    document.body.clientWidth
  );

const isMobile = +getClientWidth() < 550;

export default async function enableAnimations(delay) {
  delay && (await new Promise((resolve) => setTimeout(resolve, delay)));

  const beforeAnimations = async (duration) => {
    return new Promise((res) => {
      // document.documentElement.scrollTop = 1;
      setTimeout(() => {
        // added white overlay, so that elements don't
        // blink when animations start
        // remove it on load
        document.querySelector(".overlay").classList.remove("visible");

        // hide all elements to show them later on scroll
        Object.keys(sections).forEach((name) => {
          sections[name].classList.add("hidden");
        });
        res();
      }, 50);
    });
  };

  const navigationAnimations = async (duration) => {
    duration = duration || 0.5;
    return new Promise((res) => {
      const tl = gsap.timeline({
        defaults: { duration },
        onComplete: res,
        onStart: () => sectionRemoveClass("navigation", "hidden"),
        ease: "slow",
        id: "navigation",
        scrollTrigger: {
          trigger: ".navigation",
        },
      });
      // const before = CSSRulePlugin.getRule(".navigation .menu__item:before");
      tl.from(".navigation", { opacity: 0, duration: 0.1 });
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

  const headerAnimations = async (duration) => {
    duration = duration || 1.3;
    return new Promise((res) => {
      const tl = gsap.timeline({
        onStart: () =>
          setTimeout(() => sectionRemoveClass("header", "hidden"), 50),
        defaults: { duration },
        onComplete: res,
        scrollTrigger: {
          trigger: ".header",
        },
        delay: isMobile ? 0 : 1,
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
          duration: duration / 1.5,
          onStart: () => {
            doActionToMultipleElements({
              handler: (el) => el.style.setProperty("opacity", "1"),
              elementsSelectors: `.header__text`,
            });
            textTypingAnimation(".header__text", duration / 1.5);
          },
        })
        .from(".header__buttons .btn, .header__buttons .link", {
          scaleY: 0,
          delay: 0.2,
          ease: "elastic",
          stagger: 0.05,
          duration: duration * 1,
        })
        .from(
          ".header__img",

          {
            y: 200,
            duration: 1.5,
            opacity: 0,
            ease: "elastic",
          },
          isMobile ? "-=5" : "-=3"
        );
    });
  };

  const featuresAnimations = async (duration) => {
    duration = duration || 0.7;
    return new Promise((res) => {
      const tl = gsap.timeline({
        defaults: { duration },
        onComplete: res,
        onStart: () =>
          setTimeout(() => sectionRemoveClass("features", "hidden"), 50),
        scrollTrigger: {
          trigger: ".features",
          id: "features",
          start: "top 500px",
          end: "+=300",

          toggleActions: "play none none none",
        },
      });

      tl.from(".features__title", {
        // opacity: 0, y: "-10vh"
        onStart: () => textTypingAnimation(".features__title", 1.5),
        duration: 1.5,
      });
      tl.from(".feature__icon", { scale: 0, stagger: 0.05 }, "-=0.5");
      tl.from(".features__background", { scaleY: 0 }, "-=1");
      tl.from(
        ".feature__title",
        {
          opacity: 0,
          x: "-3vh",
          stagger: 0.05,
        },
        "-=1"
      );
      tl.from(
        ".feature__text",
        {
          opacity: 0,
          x: "3vh",
          stagger: 0.05,
        },
        "-=1"
      );
      tl.from(
        ".features__cta-btn",
        {
          scale: 0,
          opacity: 0,
          duration: duration * 2,
          ease: "bounce",
        },
        "-=.5"
      );
    });
  };

  const professionalsAnimations = async (duration) => {
    duration = duration || 0.5;
    return new Promise((res) => {
      const tl = gsap.timeline({
        defaults: { duration },
        onComplete: res,
        onStart: () => {
          document
            .querySelector(".professionals .description__title")
            .classList.add("hidden");
          setTimeout(() => sectionRemoveClass("professionals", "hidden"), 50);
        },
        scrollTrigger: {
          trigger: ".professionals",
          start: "top 500px",
          end: "+=300",

          toggleActions: "play resume resume resume",
        },
        id: "professionals",
      });

      tl.from(".professionals .description__pretitle", { opacity: 0, x: -100 });
      tl.from(".professionals .description__title", {
        onStart: () => {
          document
            .querySelector(".professionals .description__title")
            .classList.remove("hidden");
          textTypingAnimation(".professionals .description__title", duration);
        },
      });
      tl.from(".professionals .description__text", { opacity: 0, x: -100 });
      tl.from(".professionals .advantage__title", {
        opacity: 0,
        x: -100,
        stagger: 0.15,
      });
      tl.from(
        ".professionals .advantage__text",
        {
          opacity: 0,
          x: -100,
          stagger: 0.15,
        },
        "-=.8"
      );
      tl.from(
        ".professionals__img",
        { y: -200, opacity: 0, ease: "bounce", duration: 2 },
        "-=1"
      );
    });
  };

  beforeAnimations();
  navigationAnimations();
  headerAnimations();
  featuresAnimations();
  professionalsAnimations();
}
