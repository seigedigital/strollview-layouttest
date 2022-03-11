function isIOS() {
  let retval = [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  console.log("isIOS: "+retval)
  return retval
}

function isTouchDevice() {
  let retval = ( 'ontouchstart' in window ) ||
    ( navigator.maxTouchPoints > 0 ) ||
    ( navigator.msMaxTouchPoints > 0 );
  console.log("isTouchDevice: "+retval)
  return retval
}

function isFullScreen() {
  let retval = (document.fullscreenElement||iOSFullScreenFlag)
  console.log("isFullScreen: "+retval)
  return retval
}

function isLandscape() {
  let retval = window.screen.width>window.screen.height
  console.log("isLandscape: "+retval)
  return retval
}

function isSmallScreen() {
  let calcWidth = window.screen.width<window.innerWidth?window.screen.width:window.innerWidth
  let retval = calcWidth<800
  console.log("isSmallScreen: "+retval)
  return retval
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
  iOSFullScreenFlag=iOSFullScreenFlag==false?true:false
  if(iOSFullScreenFlag) {
    disableScrolling()
    configurePlayer()
  } else {
    enableScrolling()
    configurePlayer()
  }
}

function configurePlayer() {
  console.log("configurePlayer")
  console.log("Screen width: "+window.screen.width)
  console.log("Window width: "+window.innerWidth)

  document.getElementById("container").className="contained"
  if(iOSFullScreenFlag) {
    document.getElementById("container").classList.add("iosfullscreen")
  } else {
    document.getElementById("container").classList.remove("iosfullscreen")
  }

  if( ((!isTouchDevice()) && (!isSmallScreen())) || isFullScreen() ) {
    document.getElementById("textarea_content").style.display="grid"
    document.getElementById("textbelow").style.display="none"
    document.getElementById("heading1").style.display="none"
    document.getElementById("heading2").style.display="none"
    if(isLandscape()) {
      document.getElementById("textarea").className="contained_left"
    } else {
      document.getElementById("textarea").className="contained_bottom"
    }
  } else {
    document.getElementById("textarea_content").style.display="none"
    document.getElementById("textbelow").style.display="block"
    document.getElementById("heading1").style.display="block"
    document.getElementById("heading2").style.display="block"
    document.getElementById("textarea").className="contained_superbottom"
  }

}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMLoaded event.")
  configurePlayer()
})
window.addEventListener('resize', () => {
  console.log("Resize event.")
  configurePlayer()
})
