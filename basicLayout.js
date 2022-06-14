let urw;
let urh;
let pageLayout;

function layout () {
  // document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);


  // Determine what orientation device has.
  if (window.innerWidth <= window.innerHeight) {
    let aspectRatio = window.innerHeight / window.innerWidth;
    if (aspectRatio < 1.777) {
      let width = ((0.5625 * window.innerHeight) / window.innerWidth) * window.innerWidth;
      document.documentElement.style.setProperty("--w", width);
      urw = width;
      document.documentElement.style.setProperty("--wpx", `${width}px`);
      document.documentElement.style.setProperty("--h", window.innerHeight);
      urh = window.innerHeight;
      document.documentElement.style.setProperty("--gh", window.innerHeight +1);
      document.documentElement.style.setProperty("--gw", ((window.innerWidth - width)/2) +1);
      document.documentElement.style.setProperty("--vg", "none");
      document.documentElement.style.setProperty("--hg", "block");
    }
    else {
      document.documentElement.style.setProperty("--h", window.innerWidth * 1.777);
      urh = window.innerWidth * 1.777;
      document.documentElement.style.setProperty("--w", window.innerWidth);
      urw = window.innerWidth;
      document.documentElement.style.setProperty("--wpx", `${window.innerWidth}px`);
      document.documentElement.style.setProperty("--gh", ((window.innerHeight - (window.innerWidth * 1.777))/2) +1);
      document.documentElement.style.setProperty("--gw", window.innerWidth + 1);
      document.documentElement.style.setProperty("--vg", "block");
      document.documentElement.style.setProperty("--hg", "none");
    };
    document.documentElement.style.setProperty("--orientation", "portrait");
    pageLayout = "portrait";
  }
  else {
    let aspectRatio = window.innerWidth / window.innerHeight;
    if(aspectRatio < 1.6) {
      let height = ((0.625 * window.innerWidth) / window.innerHeight) * window.innerHeight;
      document.documentElement.style.setProperty("--h", height);
      urh = height;
      document.documentElement.style.setProperty("--w", window.innerWidth);
      urw = window.innerWidth;
      document.documentElement.style.setProperty("--wpx", `${window.innerWidth}px`);
      document.documentElement.style.setProperty("--gh", ((window.innerHeight - height)/2) +1);
      document.documentElement.style.setProperty("--gw", (window.innerWidth) +1);
      document.documentElement.style.setProperty("--vg", "block");
      document.documentElement.style.setProperty("--hg", "none");
    }
    else {
      let width = window.innerHeight * 1.6;
      document.documentElement.style.setProperty("--h", window.innerHeight);
      urh = window.innerHeight;
      document.documentElement.style.setProperty("--w", width);
      urw = width;
      document.documentElement.style.setProperty("--wpx", `${width}px`);
      document.documentElement.style.setProperty("--gh", window.innerHeight +1);
      document.documentElement.style.setProperty("--gw", ((window.innerWidth - width)/2) +1);
      document.documentElement.style.setProperty("--vg", "none");
      document.documentElement.style.setProperty("--hg", "block");
    }
    document.documentElement.style.setProperty("--orientation", "landscape");
    pageLayout = "landscape";
  }
}

layout();

let numOfResizes = 0;
window.addEventListener("resize", ()=> {
  numOfResizes += 1;
  const thisResizeNum = numOfResizes;
  const timerId = setTimeout(()=> {
    if (numOfResizes === thisResizeNum) {
      location.reload();
    }
  }, 2000);
});