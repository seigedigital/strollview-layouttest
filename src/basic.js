function isIOS() {
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
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
    e.requestFullscreen()
  } else if (document.exitFullscreen) {
    document.getElementById("textarea").style.display="none"
    document.getElementById("shield").style.display="flex"
    document.exitFullscreen()
  }
}

var iOSFullScreenFlag = false

function disableScrolling() {
  document.body.style.overflow="none"
  // TopScroll = window.pageYOffset || document.documentElement.scrollTop
  // LeftScroll = window.pageXOffset || document.documentElement.scrollLeft
  // window.onscroll = function() {
  //   window.scrollTo(LeftScroll, TopScroll)
  // }
}

function enableScrolling() {
  document.body.style.overflow=""
  // window.onscroll = function() {}
}

function toggleFullScreenIOS() {
  console.log("toggleFullScreenIOS "+iOSFullScreenFlag)
  let e = document.getElementById("container")
  iOSFullScreenFlag=iOSFullScreenFlag==false?true:false
  let offset = 0 //  Math.floor(document.documentElement.scrollTop || document.body.scrollTop)+"px"
  console.log("off >"+offset+"<")
  if(iOSFullScreenFlag) {
    disableScrolling()
    document.getElementById("textarea").style.display="grid"
    document.getElementById("shield").style.display="none"
    e.style.top=offset
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
  configurePlayer()
});

window.addEventListener('resize', configurePlayer);
