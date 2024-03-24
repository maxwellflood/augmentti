gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  markers: false,
});

// Loader
let pageInitTl = gsap.timeline({ paused: true });

pageInitTl
  .to(".hero-overlay", {
    opacity: 0,
    duration: 0.25,
  })
  .from(
    ".page-wrapper",
    {
      opacity: 0,
      duration: 0.25,
    },
    "<"
  )
  .from(".nav_wrap", {
    y: "-100%",
    duration: 0.25,
  })
  .from(".header_text_move", {
    y: "-100%",
    duration: 0.75,
    stagger: 0.2,
    ease: "expo.out",
  });

if (sessionStorage.getItem("visited") == null) {
  // LOADER BAR + PAGE SPLIT
  let loadTl = gsap.timeline({
    onComplete: () => {
      pageInitTl.restart();
    },
  });

  loadTl
    .from(".nav_logo, .loader_code_container", {
      opacity: 0,
    })
    .to(".loader_bar", {
      width: "100%",
      duration: 4,
      ease: "power2.inOut",
    })
    .to(".loader-code-wrap, .loader_bar, .loader_code_container", {
      opacity: 0,
    })
    .to(".loader-top", { yPercent: -100 })
    .to(".loader-bottom", { yPercent: 100 }, "<")
    .set(".loader-wrap", { display: "none", delay: 0.125 });

  // TYPEWRITER LOADER
  const loaderText = ["insights", "opportunities", "advice", "complete"];

  let tlLoadText = gsap.timeline({ delay: 1 });

  loaderText.forEach((lText) => {
    let tlText = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 0.3 });
    tlText.to("#code-text", { duration: 0.3, text: lText });
    tlLoadText.add(tlText);
  });

  sessionStorage.setItem("visited", "true");
} else {
  function hideLoader() {
    let loader = document.querySelector(".loader-wrap");
    loader.style.display = "none";
  }
  hideLoader();

  pageInitTl.restart();
}

// ANIMATE NAV LOGO

let logoNavTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section_hero",
    start: "top -10px",
    end: "top top",
    // markers: true,
    scrub: 1,
  },
});

logoNavTl
  .to(".logo-wrapper", {
    width: "1.75rem",
    duration: 0.1,
    ease: "power1.inOut",
  })
  .to(".nav_menu_wrap", {
    backdropFilter: "blur(16px)",
    duration: 0.01,
    ease: "none",
  });

// ANIMATE NAV BLUR

let navTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-wrapper",
    start: "top 0px",
    end: "top 2px",
    // markers: true,
    scrub: 1,
  },
});

navTl
  .to(".nav_wrap", {
    backgroundColor: "rgba(19, 17, 19, 1)",
    duration: 0.001,
    ease: "none",
  })
  .to(".logo-lockup", { opacity: "0", duration: 0.001, ease: "none" }, "<")
  .to(
    ".logo-lockup.is-grad",
    { opacity: "100", duration: 0.001, ease: "none" },
    "<"
  );

// TYPEWRITER

//GITHUB
//https://cdn.jsdelivr.net/gh/maxwellflood/augmentti/typewriter.js

// const words = [
//     "Engineers",
//     "Researchers",
//     "Traders",
//     "Mathematicians",
//     "Scientists",
//     "Developers",
//     "Risk-Takers",
//   ];

//   gsap.to("#cursor", {
//     opacity: 0,
//     repeat: -1,
//     yoyo: true,
//     duration: 0.5,
//     ease: "power1.inOut"
//   });

//   let tlMaster = gsap.timeline({ repeat: -1 });

//   words.forEach((word) => {
//     let tlText = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 });
//     tlText.to("#animated-text", { duration: 1, text: word });
//     tlMaster.add(tlText);
//   });
