// DATA //////////////////////////////////////////////////////
const contentLayers = [
  {
    name: "#title",
    contentEntrance: false,
    specialEntrance: titleContentEntrance,
    // optionDisplay: titleOptionDisplay,
    // optionSelect: titleOptionSelect,
  },
  {
    name: "#introduction",
    contentEntrance: false,
    // specialEntrance: introductionContentEntrance,
    specialEntrance: function() {console.log("hi");},
    // optionDisplay: introductionOptionDisplay,
    optionSelect: introductionOptionSelect,
  },
  {
    name: "#animations",
    contentEntrance: false,
    // specialEntrance: tableOfContentsContentEntrance,
    // optionDisplay: tableOfContentsOptionDisplay,
    // optionSelect: tableOfContentsOptionSelect,
  },
];

const nameToNum = {
  "#title": 0,
  "#introduction": 1,
  "#animations": 2,
};

// INITIALIZATION /////////////////////////////////////////////
let currentContent = 0;

gsap.set(".layer", {pointerEvents: "none",});
gsap.set([".layer-background", "#menu-toggle"], {transformOrigin: "0% 0%"});
gsap.set([".layer-content", "#page-background", "#title"], {
  opacity: 0,
});
gsap.set("#menu-layer", {zIndex:0});
gsap.set("#title .content-layer-link", {display: "none"});

// TITLE ----------------------------------------------------
gsap.set(".l1-paths1", {transformOrigin: "center", scale: 0.1});
gsap.set("#title h2", {opacity: 0});
if (pageLayout === "landscape") {
  gsap.set(".layer-content svg", {
    // transform: "scale(0.5)",
  });
};

// MENU -----------------------------------------------------
gsap.set(["#menu-layer .layer-background rect","#menu-toggle"], {opacity: 0});


const tlInitial = gsap.timeline();
contentOptions(0, tlInitial);
menuConfig1(tlInitial, 0);

// OPTION /////////////////////////////////////////////////////
// GENERAL ---------------------------------------------
function contentOptions(skipLayerNum, tl) {
  let verticalOffset = 10;
  contentLayers.forEach((layer, index)=> {
    if (index !== skipLayerNum) {
      tl.set(layer.name, {
        zIndex: 0,
        opacity: 0,
      }); 
      tl.set(`${layer.name} .layer-background`, {
        transform: "scale(0.2, 0.1)",
        left: "35%",
        top: `${verticalOffset}%`,
      });
      tl.set(`${layer.name} .content-layer-link`, {
        display: "block",
      });
      tl.set(`${layer.name} .layer-content`, {
        opacity: 0,
      });
      verticalOffset += 25;
    };
  });
};

function contentOptionSelected(layer) {
  const layerNum = nameToNum[layer.name];
  console.log(layerNum);
  const tl = gsap.timeline();
  tl.set(layer.name, {
    zIndex: 5,
    pointerEvents: "initial",
  });
  tl.set(`${layer.name} .content-layer-link`, {display: "none"});
  layer.optionSelect(tl);
  contentOptions(layerNum, tl);
  tl.set("#menu-layer", {zIndex: 0, opacity: 0});
  document.getElementById("menu-checkbox").checked = false;
  menuConfig1(tl, 0);
  tl.set(layer.name, {
    pointerEvents: "none",
  });
  currentContent = layerNum;
  contentCurrent(layer, tl);
}

function contentCurrent(layer, tl, pos) {
  tl.set(layer.name, {
    zIndex: 2,
  }, pos);
  if (layer.contentEntrance) {
    genericEntrance(`${layer.name} .layer-content`, tl, 0);
  } else {
    layer.specialEntrance(tl, pos);
    layer.contentEntrance = true;
  };
};

// MENU CONFIGURATIONS ---------------------------------------------
function menuConfig1(tl, duration) {
  tl.to("#menu-layer .layer-background", {
    transform: "scale(0.25, 0.13)",
    x: "38%",
    y: "75%",
    duration: duration,
  });
  tl.to("#menu-toggle", {
    x: urw * 0.43,
    y: urh * 0.77, 
    duration: duration,
  }, "<0");
  tl.to("#menu-checkbox-label", {
    scale: 0.7,
    duration: duration,
  }, "<0");
};

function menuConfig2(tl, duration) {
  tl.to("#menu-layer .layer-background", {
    transform: "scale(1)",
    duration: duration,
    x: "0%",
    y: "0%", 
    pointerEvents: "initial",
  });
  tl.to("#menu-toggle", {
    backgroundColor: "purple",
    x: "40%",
    y: "80%",
    duration: duration,
  }, "<0");
  tl.to("#menu-checkbox-label", {
    backgroundColor: "orange",
    duration: duration,
    transform: "scale(0.7)",
  }, "<0");
};

// CONTENT LAYERS ---------------------------------------------
function introductionOptionSelect(tl) {
  tl.to("#introduction .layer-background", {
    transform: "scale(1)",
    x: "0%",
    y: "0%",
  });
}

// STAGES //////////////////////////////////////////////////////
// GENERAL -----------------------------------------------
function revealContentOptions(tl) {
  let delay = 0;
  contentLayers.forEach((layer, index)=> {
    if (index !== currentContent) {
      tl.set(layer.name, {zIndex:4});
    };
  });
  contentLayers.forEach((layer, index)=> {
    if (index !== currentContent) {
      tl.to(layer.name, {duration:1, opacity:1, ease: "power1.in"}, `reveal+=${delay}`);
      delay += 0.3;
    }
  });
};

function hideContentOptions(tl) {
  let delay = 0.6;
  contentLayers.forEach((layer, index)=> {
    if (index !== currentContent) {
      tl.to(layer.name, {duration:1, opacity:0}, `reveal+=${delay}`);
      delay -= 0.3;
    }
  });
  contentLayers.forEach((layer, index)=> {
    if (index !== currentContent) {
      tl.set(layer.name, {zIndex:0});
    };
  });
};

// CONTENT LAYERS ----------------------------------------------
function titleContentEntrance(tl, pos) {
  tl.set("#menu-layer", {zIndex: 3}, pos);
  tl.to("#title .layer-content", {
    opacity: 1,
    duration: 3,
  }, pos);
  tl.to(".l1-paths1", {
    stroke: "hsl(0, 0%, 0%)",
    duration: 11,
    ease: "power1.out",
    scale: 1,
    fill: "hsla(0, 0%, 0%, 0.25)",
  }, pos);
  tl.to("#l1-path1", {
    rotation: 360,
    duration: 11,
    ease: "power1.out",
  }, pos);
  tl.to("#l1-path2", {
    rotation: -360,
    duration: 11,
    ease: "power1.out",
  }, pos);
  tl.to("#l1-path3", {
    rotation: 1800,
    duration: 11,
    ease: "power1.out",
  }, pos);
  tl.to("#title h2", {
    opacity: 1,
    duration: 5,
    ease: "power1.in"
  }, pos + 7);
  tl.to(["#menu-layer .layer-background rect"], {
    opacity: 1,
    duration: 1,
    ease: "none"
  }, pos + 11);
  tl.to(["#menu-toggle"], {
    opacity: 1,
    duration: 3,
    ease: "power1.in"
  }, pos + 12);
  tl.to("#m-rec1", {
    fill: "hsl(0, 0%, 4%)",
    duration: 1,
    ease: "power1.in"
  }, pos + 12);
};



// EVENTS //////////////////////////////////////////////
// PAGE LOAD & SPLASH ----------------------------------------
let loadingScreenDelayed = false;

const timerId1 = setTimeout(()=> {
  loadingScreenDelayed = true;
  clearTimeout(timerId1);
},2000);

function transitionToSplash() {
  const tl = gsap.timeline();
  tl.to(["#page-background","#title"], {duration: 2, opacity: 1,}, 0);
  tl.set("#page-loading-screen", {display: "none"}, 2);
  contentCurrent(contentLayers[0], tl, 2);
}

window.addEventListener("load",()=> {
  if (loadingScreenDelayed) {
    transitionToSplash();
  } else {
    const timerId2 = setTimeout(()=> {
      transitionToSplash();
      clearTimeout(timerId2);
    }, 1000);
  }
});

// function postSplash() {
//   gsap.set("#page-loading-screen", {opacity: 0,}); 
//   gsap.set("#page-loading-screen", {display: "none"});
//   gsap.set(["#page-background","#title"], {opacity: 1,});
//   gsap.set("#title", {zIndex: 2 });
//   gsap.set("#title .layer-content", {opacity: 1});
//   gsap.set("#menu-layer", {zIndex: 3, opacity: 1});
//   gsap.set(["#menu-layer .layer-background rect","#menu-toggle"], {opacity: 0});
// }

// postSplash();

// const tl = gsap.timeline();
// tl.to(".gutter", {backgroundColor: "blue", duration: 5});
// contentCurrent(contentLayers[0], tl, 5);
// titleContentEntrance(tl);
// tl.progress(1);

// MENU CHECKBOX CHECKED / UNCHECKED ---------------------------------
document.getElementById("menu-checkbox").addEventListener("change", (e)=> {
  const tl = gsap.timeline();
  if (e.target.checked) {
    menuConfig2(tl, 0.5);
    revealContentOptions(tl);
  } else {
    hideContentOptions(tl);
    menuConfig1(tl, 0.5);
  };
});

// CONTENT OPTION SELECTED -------------------------------------------
for (const link of document.getElementsByClassName("content-layer-link")) {
  link.addEventListener("click", (e)=> {
    contentOptionSelected(contentLayers[nameToNum[e.target.dataset.layer]])
  });
};