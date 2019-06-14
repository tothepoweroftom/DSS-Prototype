let globalManRef = {};
let globalManState = {};
let globalID = -1;
let prevID = -1;


// 1. Get a target element that you want to persist scrolling for (such as a modal/lightbox/flyout/nav). 
const targetElement = document.querySelector("body");
const targetElement2 = document.querySelector(".container");

// 2. ...in some event handler after showing the target element...disable body scroll




var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1Pxpuoz8DglBbYWpyB9rXbIVAKvkhcC9j913MBdMjJAw/edit?usp=sharing';

function init() {
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: showInfo,
    simpleSheet: true
  })
  bodyScrollLock.disableBodyScroll(targetElement);
  bodyScrollLock.disableBodyScroll(targetElement2);

  $('#gui').hide();


  setTimeout(function () {
    // Hide the address bar!
    window.scrollTo(0, 10)
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
  schema: {default: 0}, 
  init: function () {
    this.el.object3D.userData.ref = [];

    let localRef = {};
    let localManState = [];

    console.log(this.data)
    // Wait for model to load.
    this.el.addEventListener('model-loaded', () => {

      console.log("loaded model")
      // Grab the mesh / scene.
      const obj = this.el.getObject3D('mesh');
      // Go over the submeshes and modify materials we want.
      let groups = {};
      let sceneEl = document.querySelector('a-scene')
      let els = sceneEl.querySelectorAll('a-marker');
      for (var i = 0; i < els.length; i++) {
        console.log(i)
        let localManState = [];
        let localRef = {};
        let clone = obj.clone();
        clone.children.forEach((element, index) => {
          let groupIndex = element.name[element.name.length - 1];
          if (groupIndex >= 0) {
            groups[groupIndex] = element;
            element.children.forEach((mesh, index) => {
              let meshIndex = mesh.name[mesh.name.length - 1];
              if (meshIndex >= 0) {
                let numIndex = 10 * parseInt(groupIndex) + parseInt(meshIndex);


                localRef[numIndex] = mesh;
                localManState[numIndex] = false;
              }
            })
          }
        })
        $('.loading').fadeOut();

        globalManRef[i] = localRef;
        globalManState[i] = localManState;

        var el = document.createElement('a-entity');
        el.object3D = clone;
        el.setAttribute('visible', false);
        el.setAttribute('scale', "0.5 0.5 0.5");
        el.setAttribute('position', "0 1 0");

        els[i].appendChild(el);
      }



      // obj.children.forEach((element, index) => {
      //   let groupIndex = element.name[element.name.length - 1];

      //   if (groupIndex >= 0) {
      //     groups[groupIndex] = element;
      //     element.children.forEach((mesh, index) => {
      //       let meshIndex = mesh.name[mesh.name.length - 1];
      //       if (meshIndex >= 0) {
      //         let numIndex = 10 * parseInt(groupIndex) + parseInt(meshIndex);


      //         localRef[numIndex] = mesh;
      //         localManState[numIndex] = false;
      //       }
      //     })
      //   }
      // })



      // globalManRef[this.data] = localRef;
      // globalManState[this.data] = localManState;
      // console.log(globalManRef)
    });

  }
});