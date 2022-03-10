function isIOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
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
    configurePlayer()
    enterFullScreenVariants(e)
  } else if (document.exitFullscreen) {
    configurePlayer()
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
    configurePlayer()
    e.classList.add("iosfullscreen")
  } else {
    enableScrolling()
    configurePlayer()
    e.classList.remove("iosfullscreen")
  }
}

function configurePlayer() {
  console.log("configurePlayer")
  document.getElementById("container").className="contained"
  document.getElementById("textarea").className="contained_left"
  console.log("Screen width: "+window.screen.width)
  if( window.screen.width<800 && !(document.fullscreenElement||iOSFullScreenFlag) ) {
    // mobile mode
    document.getElementById("textarea_content").style.display="none"
    document.getElementById("textbelow").style.display="block"
    document.getElementById("heading1").style.display="block"
    document.getElementById("heading2").style.display="block"
    // document.getElementById("shield").style.display="flex"
    if(window.screen.width>window.screen.height) {
      document.getElementById("textarea").className="contained_left"
    } else {
      document.getElementById("textarea").className="contained_superbottom"
    }
  } else {
    document.getElementById("textarea_content").style.display="grid"
    document.getElementById("textbelow").style.display="none"
    document.getElementById("heading1").style.display="none"
    document.getElementById("heading2").style.display="none"
    // document.getElementById("shield").style.display="none"
    if(window.screen.width>window.screen.height) {
      document.getElementById("textarea").className="contained_left"
    } else {
      document.getElementById("textarea").className="contained_bottom"
    }
  }
}

document.addEventListener("DOMContentLoaded", configurePlayer)
window.addEventListener('resize', configurePlayer)
