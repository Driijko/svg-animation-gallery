window.addEventListener("load", ()=> {
  const tl = gsap.timeline();
  const pageLoadingScreen = document.getElementById("page-loading-screen");
  tl.to(pageLoadingScreen, {
    opacity: 0,
    duration: 1,
    ease: Power4.easein,
  });
  tl.to(pageLoadingScreen, {
    display: "none",
    duration: 0,
  })
});