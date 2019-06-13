let globalManRef = {};
let globalManState = [];

// 1. Get a target element that you want to persist scrolling for (such as a modal/lightbox/flyout/nav). 
const targetElement = document.querySelector("body");

// 2. ...in some event handler after showing the target element...disable body scroll




var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1Pxpuoz8DglBbYWpyB9rXbIVAKvkhcC9j913MBdMjJAw/edit?usp=sharing';

function init() {
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: showInfo,
    simpleSheet: true
  })
  bodyScrollLock.disableBodyScroll(targetElement);


  setTimeout(function () {
    // Hide the address bar!
    window.scrollTo(0, 1)
  }, 100);



  // check if in portrait
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  if (w < 500) {
    $('#portrait-text').html("This experience only works in portrait mode");

    if (h > w) {
      $('#mobile-portrait').hide();
    } else {
      $('#mobile-portrait').show();

    }

  } else {
    if (h > w) {
      $('#mobile-portrait').show();
    } else {
      $('#mobile-portrait').hide();

    }
  }


}

function showInfo(data, tabletop) {
  console.log(data);
}


window.addEventListener('DOMContentLoaded', init)
window.addEventListener("orientationchange", () => {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  if (w < 500) {
    if (window.orientation === 0) {
      $('#mobile-portrait').hide();

    } else {
      $('#mobile-portrait').show();

    }
  } else {
    if (window.orientation === 0) {
      $('#mobile-portrait').show();

    } else {
      $('#mobile-portrait').hide();

    }
  }


}, false);





AFRAME.registerComponent('modify-materials', {
  init: function () {
    this.el.object3D.userData.ref = [];

    let localRef = {};
    // Wait for model to load.
    this.el.addEventListener('model-loaded', () => {

      console.log("loaded model")
      // Grab the mesh / scene.
      const obj = this.el.getObject3D('mesh');
      // Go over the submeshes and modify materials we want.
      let groups = {};
      obj.children.forEach((element, index) => {
        let groupIndex = element.name[element.name.length - 1];

        if (groupIndex >= 0) {
          groups[groupIndex] = element;
          element.children.forEach((mesh, index) => {
            let meshIndex = mesh.name[mesh.name.length - 1];
            if (meshIndex >= 0) {
              let numIndex = 10 * parseInt(groupIndex) + parseInt(meshIndex);


              globalManRef[numIndex] = mesh;
              globalManState[numIndex] = false;
            }
          })
        }
      })

      // console.log(globalManRef)
    });

  }
});