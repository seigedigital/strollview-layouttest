function isIOS() {
  if (/iPhone/i.test(navigator.userAgent)) {
    return true
  }
  return false
}

function toggleFullScreen() {
    if(isIOS()) {
      toggleFullScreenIOS()
    } else {
      toggleFullScreenReal()
    }
}

function toggleFullScreenReal() {
  console.log("toggleFullScreenReal")
  let e = document.getElementById("container")
  if (!document.fullscreenElement) {
    document.getElementById("textarea").style.display="grid"
    document.getElementById("shield").style.display="none"
    enterFullScreenVariants(e)
  } else if (document.exitFullscreen) {
    document.getElementById("textarea").style.display="none"
    document.getElementById("shield").style.display="flex"
    exitFullscreenVariants()
  }
}

function enterFullScreenVariants(e) {
    if (e.requestFullScreen) {
        e.requestFullScreen();
    } else if (e.webkitRequestFullScreen) {
        e.webkitRequestFullScreen();
    } else if (e.mozRequestFullScreen) {
        e.mozRequestFullScreen();
    } else if (e.msRequestFullscreen) {
        e.msRequestFullscreen();
    } else if (e.webkitEnterFullscreen) {
       e.webkitEnterFullscreen();
    }
}

function exitFullscreenVariants() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

var iOSFullScreenFlag = false

function disableScrolling() {
  document.body.style.overflow="none"
}

function enableScrolling() {
  document.body.style.overflow=""
}

function toggleFullScreenIOS() {
  console.log("toggleFullScreenIOS "+iOSFullScreenFlag)
  let e = document.getElementById("container")
  iOSFullScreenFlag=iOSFullScreenFlag==false?true:false
  if(iOSFullScreenFlag) {
    disableScrolling()
    document.getElementById("textarea").style.display="grid"
    document.getElementById("shield").style.display="none"
    e.classList.add("iosfullscreen")
  } else {
    enableScrolling()
    document.getElementById("textarea").style.display="none"
    document.getElementById("shield").style.display="flex"
    e.classList.remove("iosfullscreen")
  }
}

function configurePlayer() {
  console.log("configurePlayer")
  console.log(window.screen.width)
  if( window.screen.width<800 && !(document.fullscreenElement||iOSFullScreenFlag) ) {
    document.getElementById("textarea").style.display="none"
    document.getElementById("shield").style.display="flex"
  } else {
    document.getElementById("textarea").style.display="grid"
    document.getElementById("shield").style.display="none"
  }
  if(window.screen.width>window.screen.height) {
    document.getElementById("textarea").className="textarea_left"
  } else {
    document.getElementById("textarea").className="textarea_bottom"
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("iconmetainfo").innerHTML=navigator.platform
  configurePlayer()
});

window.addEventListener('resize', configurePlayer);
