let globalManRef = {};
let globalManState = {};
let globalID = -1;
let prevID = -1;



let questions = {
  southeast: {
    title: "100 Adults",
    where: "Living in South East",
    line1: "How many experience",
    line2: "social exclusion?",
    line3: " "
  },
  newwest: {
    title: "100 Teens",
    subtitle: "(between 15 and 16 years old)",
    where: "Living in New-West",
    line1: "How many teens ",
    line2: "work out often?",
    line3: ""
  },
  east: {
    title: "100 Adults",

    where: "Living in East",

    line1: "How many of them",
    line2: "have fallen twice or more",
    line3: "in the past year?"
  },
  south: {
    title: "100 Adults",

    where: "Living in South",
    line1: "How many of them are",
    line2: "satisfied with the green",
    line3: "spaces in their neighbourhood?"
  },
  north: {
    title: "100 Adults",

    where: "Living in North",
    line1: "How many adults ",
    line2: "experience moderate or",
    line3: "severe loneliness?"
  },
  west: {
    title: "100 Adults",

    where: "Living in West",
    line1: "How many adults ",
    line2: "have had unprotected sex?",
    line3: ""
  },
}

let map2Index = {
  0: questions.north,
  1: questions.south,
  2: questions.east,
  3: questions.west,
  4: questions.newwest,
  5: questions.southeast
}

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
  $('#show-submitted-text').fadeOut()

  setTimeout(function () {
    // Hide the address bar!
    window.scrollTo(0, 10)
  }, 100);



  // check if in portrait
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  if (h > w) {
    $('#mobile-portrait').show();
    $('#gui').hide();

  } else {
    $('#mobile-portrait').hide();

  }
  


}

function showInfo(data, tabletop) {
  console.log(data);
}


window.addEventListener('DOMContentLoaded', init)
window.addEventListener("orientationchange", () => {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  if (window.orientation === 0) {
    $('#mobile-portrait').show();
    $('#gui').hide();

  } else {
    $('#mobile-portrait').hide();

  }
  


}, false);

AFRAME.registerComponent('oneman-graph', {
  schema: {
    message: {type: 'string', default: 'Hello, World!'},
    color: {type: 'color', default: '#aa0000'},
    index: {type: 'number', default: 1},
 
  }, 
  init: function () {
    this.el.addEventListener('model-loaded', () => {


    })
  },
  update: function () {
    console.log(this.data);
    const obj = this.el.getObject3D('mesh');
    obj.children.forEach((element, index) => {
      if(index < this.data) {
        element.setAttribute("color", this.data.color);
      }
    })
  }
});



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
        el.setAttribute('id', `graph-${i}`);

        el.setAttribute('visible', false);
        el.setAttribute('scale', "0.25 0.25 0.25");
        el.setAttribute('position', "-1 1 0");

        createText(i, el);


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


function createText(i, el) {
  let children = [];
  var title = document.createElement('a-entity');
  title.setAttribute('scale', "3 3 1");
  title.setAttribute('material', {color:"black"});

  title.setAttribute('position', "5 12.0 0");
  title.setAttribute('text-geometry', {font: "#helv", value:map2Index[i].title});
  el.appendChild(title);

  if(map2Index[i].subtitle) {
    var subtitle = document.createElement('a-entity');
    subtitle.setAttribute('scale', "1.5 1.5 1");
    subtitle.setAttribute('material', {color:"black"});

    subtitle.setAttribute('position', "5 11.0 0");
    subtitle.setAttribute('text-geometry', {font: "#helv", value:map2Index[i].subtitle});
    el.appendChild(subtitle);

  }

  var where = document.createElement('a-entity');
  where.setAttribute('scale', "2 2 2");
  where.setAttribute('material', {color:"black"});

  where.setAttribute('position', "5.5 9.0 0");
  where.setAttribute('text-geometry', {font: "#helv", value:map2Index[i].where});
  el.appendChild(where);

  var line1 = document.createElement('a-entity');
  line1.setAttribute('scale', "3 3 2");
  line1.setAttribute('position', "5.5 5 0");
  line1.setAttribute('text-geometry', {font: "#helv", value:map2Index[i].line1});
  line1.setAttribute('material', {color:"black"});

  el.appendChild(line1);

  var line2 = document.createElement('a-entity');
  line2.setAttribute('scale', "3 3 2");
  line2.setAttribute('position', "5.5 3.0 0");
  line2.setAttribute('text-geometry', {font: "#helv", value:map2Index[i].line2});
  line2.setAttribute('material', {color:"black"});

  el.appendChild(line2);

  var line3 = document.createElement('a-entity');
  line3.setAttribute('scale', "3 3 2");
  line3.setAttribute('position', "5.5 1 0");
  line3.setAttribute('text-geometry', {font: "#helv", value:map2Index[i].line3});
  line3.setAttribute('material', {color:"black"});

  el.appendChild(line3);


  return children
}