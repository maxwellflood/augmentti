gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  markers: false
});

// Loader
let pageInitTl = gsap.timeline({paused: true});
pageInitTl.from(".nav_wrap",
    {
	    y:"-100%",
  	    duration: 0.5
	})
    .from(".header_text_move", 
    {
  	    y:"-100%",
  	    duration: 0.5,
  	    stagger: 0.2
})

let loadTl = gsap.timeline({
	onComplete: () => {
		pageInitTl.restart();
	},
});

loadTl.from(".nav_logo, .loader_code_container",{
		opacity: 0,
	})
    .to(".loader_bar",{
		width:"100%",
		duration: 7,
  	    ease:"power2.inOut"
	})
    .to(".loader-code-wrap, .loader_bar, .loader_code_container",{opacity:0})
    .to(".loader-top",{yPercent:-100},)
	.to(".loader-bottom",{yPercent:100},"<")
    .set(".loader-wrap",{display:"none", delay: 0.5});


// Hero Section
// Animate From
// $(".header_text_move").each(function (index) {
//   let triggerElement = $(this);
//   let targetElement = $(this);

//   let tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: triggerElement,
//       // trigger element - viewport
//       start: "120px top",
//       end: "120px top",
//       scrub: 1
//     }
//   });
//   tl.to(targetElement, {
//     y:"100%",
//     duration: 1
//   });
// });

// ANIMATE IMAGES

let heroImgTl = gsap.timeline({repeat:-1});
heroImgTl.to(".hero-image-wrap", {yPercent: -100, duration: 20, ease: "none" })

// ANIMATE NAV LOGO

let logoNavTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.section_hero',
        start: 'top -20px',
        end: 'top top',
        // markers: true,
        scrub: 1
    }
})

logoNavTl.to(".logo-wrapper", {width: "1.75rem", duration: 0.1, ease:"power1.inOut"});


// IMAGE HOVER

$(".hero-img").each(function(index){
    let bgImage = $(this).children().eq(0)
    let fgImage = $(this).children().eq(1)
    let heroHoverTl = gsap.timeline({paused: true, defaults:{duration:0.3, ease:"power2.inOut"}})

    heroHoverTl.set(bgImage, {opacity:1})
    heroHoverTl.fromTo(fgImage,{clipPath:"polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)"},{clipPath:"polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"})
    heroHoverTl.fromTo(bgImage,{clipPath:"polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"},{clipPath:"polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)"},"<")

    $(this).on("mouseenter", function(){
        heroHoverTl.play()
    })
    $(this).on("mouseleave", function(){
        heroHoverTl.reverse()
    })
})


// TYPEWRITER LOADER

const loaderText = [
	"connecting (engineers) && (hedge-funds)",
	"insights",
    "options",
	"opportunities",
	"advice",
	"complete"
];

let tlLoadText = gsap.timeline({ delay: 1 });

loaderText.forEach((lText) => {
  let tlText = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 0.4 });
  tlText.to("#code-text", { duration: 0.4, text: lText });
  tlLoadText.add(tlText);
});


// IDE

let moreBtn = document.getElementById('more-btn')
let closeAboutTxt = document.getElementById('close-about')
let outputDiv = document.getElementById('output');

moreBtn.addEventListener('click', function(){
    console.log("Hello More BTN")
    document.getElementById('ide-input').focus()
})

moreBtn.addEventListener('click', function(){
    outputDiv.innerHTML = commandsTxt + dividerTxt;
})

let commandsTxt = `<p>Availible commands<br/><br/><strong>~ <span class="text-pink">about</span></strong><br/><strong>~ <span class="text-pink">values</span><br/></strong><strong>~ <span class="text-pink">join</span></strong></p>`
let dividerTxt = `<hr class="dotted">`

let aboutTxt = document.querySelector('[text-type="about"]').innerHTML;
let joinTxt = document.querySelector('[text-type="join"]').innerHTML;
let valuesTxt = document.querySelector('[text-type="values"]').innerHTML;

// Function to handle commands
function handleCommand(command) {
    
    switch(command) {
        case 'about':
            outputDiv.innerHTML += aboutTxt += dividerTxt;
            break;
        case 'values':
            outputDiv.innerHTML += valuesTxt += dividerTxt;
            break;
        case 'join':
            outputDiv.innerHTML += joinTxt += dividerTxt;
            break;
        default:
            outputDiv.innerHTML += `<p> <span class="text-gold">** Command not recognized ${command} ** <span></p><hr class="dotted">`;
    }


}

// Function to handle user input
function handleInput() {
    const inputField = document.getElementById('ide-input');
    const command = inputField.value.trim();

    if (command.startsWith('')) {
        handleCommand(command);
    } else {
        // Do something with non-command input
    }

    // Clear the input field after processing
    inputField.value = '';
}

// Listen for Enter key press in the input field
document.getElementById('ide-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        handleInput();
    }
});


// TYPEWRITER

//GITHUB
//https://cdn.jsdelivr.net/gh/maxwellflood/augmentti/typewriter.js

const words = [
  "Engineers",
  "Researchers",
  "Traders",
  "Mathematicians",
  "Scientists",
  "Developers",
  "Risk-Takers",
];

gsap.to("#cursor", {
  opacity: 0,
  repeat: -1,
  yoyo: true,
  duration: 0.5,
  ease: "power1.inOut"
});

let tlMaster = gsap.timeline({ repeat: -1 });

words.forEach((word) => {
  let tlText = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 });
  tlText.to("#animated-text", { duration: 1, text: word });
  tlMaster.add(tlText);
});


// AJAX MODAL POWER-UP
window.addEventListener("DOMContentLoaded", (event) => {
  // ajaxmodal component
  function adjaxModal() {
    let lightbox = $("[tr-ajaxmodal-element='lightbox']");
    let lightboxClose = $("[tr-ajaxmodal-element='lightbox-close']").attr("aria-label", "Close Modal");
    let lightboxModal = $("[tr-ajaxmodal-element='lightbox-modal']");
    let cmsLink = "[tr-ajaxmodal-element='cms-link']";
    let cmsPageContent = "[tr-ajaxmodal-element='cms-page-content']";
    let initialPageTitle = document.title;
    let initialPageUrl = window.location.href;
    let focusedLink;

    function updatePageInfo(newTitle, newUrl) {
      lightboxModal.empty();
      document.title = newTitle;
      window.history.replaceState({}, "", newUrl);
    }

    let tl = gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        focusedLink.focus();
        updatePageInfo(initialPageTitle, initialPageUrl);
      },
      onComplete: () => {
        lightboxClose.focus();
      }
    });
    tl.set("body", { overflow: "hidden" });
    tl.set(lightbox, { display: "block", onComplete: () => lightboxModal.scrollTop(0) });
    tl.from(lightbox, { opacity: 0, duration: 0.2 });
    tl.from(lightboxModal, { y: "5em", duration: 0.2 }, "<");

    function keepFocusWithinLightbox() {
      let lastFocusableChild = lightbox
        .find("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")
        .not(":disabled")
        .not("[aria-hidden=true]")
        .last();
      lastFocusableChild.on("focusout", function () {
        lightboxClose.focus();
      });
    }

    function lightboxReady() {
      // your code here
    }

    $(document).on("click", cmsLink, function (e) {
      focusedLink = $(this);
      initialPageUrl = window.location.href;
      e.preventDefault();
      let linkUrl = $(this).attr("href");
      $.ajax({
        url: linkUrl,
        success: function (response) {
          let cmsContent = $(response).find(cmsPageContent);
          let cmsTitle = $(response).filter("title").text();
          let cmsUrl = window.location.origin + linkUrl;
          updatePageInfo(cmsTitle, cmsUrl);
          lightboxModal.append(cmsContent);
          tl.play();
          keepFocusWithinLightbox();
          lightboxReady();
        }
      });
    });

    lightboxClose.on("click", function () {
      tl.reverse();
    });
    $(document).on("keydown", function (e) {
      if (e.key === "Escape") tl.reverse();
    });
    $(document).on("click", lightbox, function (e) {
      if (!$(e.target).is(lightbox.find("*"))) tl.reverse();
    });
  }
  adjaxModal();
});
