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
    name: "#table-of-contents",
    contentEntrance: false,
    // specialEntrance: tableOfContentsContentEntrance,
    // optionDisplay: tableOfContentsOptionDisplay,
    // optionSelect: tableOfContentsOptionSelect,
  },
  {
    name: "#about",
    contentEntrance: false,
    // specialEntrance: aboutContentEntrance,
    // optionDisplay: aboutOptionDisplay,
    // optionSelect: aboutOptionSelect,
  },
];

const nameToNum = {
  "#title": 0,
  "#introduction": 1,
  "#table-of-contents": 2,
  "#about": 3,
};

const menuConfigs = [
  menuConfig1,
  menuConfig2,
]

// INITIALIZATION /////////////////////////////////////////////
let currentContent = 0;

gsap.set(".layer", {
  pointerEvents: "none",
});

gsap.set(".layer-background", {
  transformOrigin: "0% 0%",
});

gsap.set([".layer-content", "#page-background", "#title", "#menu-layer"], {
  opacity: 0,
});

gsap.set("#menu-layer", {zIndex:0});

gsap.set("#title .content-layer-link", {
  display: "none",
});

const tlInitial = gsap.timeline();
contentOptions(0, tlInitial);
menuConfig1(tlInitial, 0);

// OPTION /////////////////////////////////////////////////////
function menuConfig1(tl, duration) {
  tl.to("#menu-layer .layer-background", {
    transform: "scale(0.3, 0.5)",
    left: "35%",
    top: "30%",
    duration: duration,
  });
  tl.to("#menu-toggle", {
    backgroundColor: "red",
    left: "40%",
    top: "50%", 
    duration: duration,
  }, "<0");
  tl.to("#menu-checkbox-label", {
    backgroundColor: "white",
    duration: duration,
    transform: "scale(0.9)",
  }, "<0");
};

function menuConfig2(tl, duration) {
  tl.to("#menu-layer .layer-background", {
    transform: "scale(1)",
    duration: duration,
    left: "0%",
    top: "0%", 
    pointerEvents: "initial",
  });
  tl.to("#menu-toggle", {
    backgroundColor: "purple",
    left: "40%",
    top: "80%",
    duration: duration,
  }, "<0");
  tl.to("#menu-checkbox-label", {
    backgroundColor: "orange",
    duration: duration,
    transform: "scale(0.7)",
  }, "<0");
};

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

function contentCurrent(layer, tl) {
  tl.set(layer.name, {
    zIndex: 2,
  });
  if (layer.contentEntrance) {
    genericEntrance(`${layer.name} .layer-content`, tl, 0);
  } else {
    layer.specialEntrance(tl);
    layer.contentEntrance = true;
  };
  tl.set("#menu-layer", {zIndex: 3});
  tl.to("#menu-layer", {duration: 2, opacity: 1, ease: "power2.in"});
};

function introductionOptionSelect(tl) {
  tl.to("#introduction .layer-background", {
    transform: "scale(1)",
    left: "0%",
    top: "0%",
  });
}

// STAGES //////////////////////////////////////////////////////
// GENERAL -----------------------------------------------
function genericEntrance(element, tl, duration, delay, pos) {
  tl.to(element, {
    duration: duration,
    opacity: 1,
    delay: delay,
  }, pos);
};

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

// TITLE ----------------------------------------------
function titleContentEntrance(tl) {
  tl.to("#title .layer-content", {
    opacity: 1,
    duration: 3,
  });
  tl.to("#title .layer-content h1", {
    color: "red",
    duration: 2,
  });
}

// EVENTS //////////////////////////////////////////////
// PAGE LOAD & SPLASH ----------------------------------------
// let loadingScreenDelayed = false;

// const timerId1 = setTimeout(()=> {
//   loadingScreenDelayed = true;
//   clearTimeout(timerId1);
// },2000);

// function transitionToSplash() {
//   const tl = gsap.timeline();
//   tl.to("#page-loading-screen", {duration: 1, opacity: 0,}); 
//   tl.set("#page-loading-screen", {display: "none"});
//   tl.to(["#page-background","#title"], {duration: 2, opacity: 1,});
//   contentCurrent(contentLayers[0], tl);
// }

// window.addEventListener("load",()=> {
//   if (loadingScreenDelayed) {
//     transitionToSplash();
//   } else {
//     const timerId2 = setTimeout(()=> {
//       transitionToSplash();
//       clearTimeout(timerId2);
//     }, 1000);
//   }
// });

function postSplash() {
  gsap.set("#page-loading-screen", {opacity: 0,}); 
  gsap.set("#page-loading-screen", {display: "none"});
  gsap.set(["#page-background","#title"], {opacity: 1,});
  gsap.set("#title", {zIndex: 2 });
  gsap.set("#title .layer-content", {opacity: 1});
  gsap.set("#title .layer-content h1", {color: "red"});
  gsap.set("#menu-layer", {zIndex: 3});
  gsap.set("#menu-layer", {opacity: 1});
}

postSplash();

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
    // console.log(nameToNum[`${e.target.dataset.layer}`]);
    contentOptionSelected(contentLayers[nameToNum[e.target.dataset.layer]])
  });
}