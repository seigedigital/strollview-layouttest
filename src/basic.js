function toggleFullScreen() {
  console.log("toggleFullScreen")
  let e = document.getElementById("container")
  console.log(e.fullscreenElement)
  if (!document.fullscreenElement) {
      document.getElementById("textarea").style.display="grid"
      document.getElementById("shield").style.display="none"
      e.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.getElementById("textarea").style.display="none"
      document.getElementById("shield").style.display="flex"
      document.exitFullscreen()
    }
  }
}

function configurePlayer() {
  console.log("configurePlayer")
  console.log(window.screen.width)
  if(window.screen.width<800 && !document.fullscreenElement) {
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
