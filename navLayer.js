// ELEMENTS //////////////////////////////////////////////////////////
const nlts = document.getElementsByClassName("nav-layer-trigger");
const nls = document.getElementsByClassName("nav-layer");

// VARIABLES ////////////////////////////////////////////////////
let released = false;

// FUNCTIONS //////////////////////////////////////////////////////
function displayNavLayer(navLayer) {
  released = false;
  const timerId = setTimeout(()=> {
    if (released === false) {
      gsap.to(navLayer, {
        duration: 0.5,
        opacity: 1,
      });
    }
    clearTimeout(timerId);
  }, 100);
}

function hideNavLayer(navLayer, keyTrigger) {
  if (released === false || keyTrigger) {
    gsap.to(navLayer, {
      duration: 0.5,
      opacity: 0,
    });
  }
  released = true;
}

// EVENTS ////////////////////////////////////////////////////////
// Click and hold on nav layer triggers ----------------------------
for (const nlt of nlts) {
  let navLayer = nlt.nextElementSibling;
  while (navLayer) {
    if (navLayer.className === "nav-layer") {
      break;
    }
    else {
      navLayer = navLayer.nextElementSibling;
    }
  };

  nlt.addEventListener("pointerdown", ()=> displayNavLayer(navLayer));
  nlt.addEventListener("pointermove", ()=> hideNavLayer(navLayer));
  nlt.addEventListener("pointerup", ()=> hideNavLayer(navLayer));
}

// Press 'n' key ----------------------------------------------
document.addEventListener("keydown", e=> {
  if (e.key === "n" && e.repeat === false) {
    for (const nl of nls) {
      displayNavLayer(nl);
    }
    console.log("hi");
  }
});

document.addEventListener("keyup", e=> {
  if (e.key === "n") {
    for (const nl of nls) {
      hideNavLayer(nl, true);
    }
  }
});

