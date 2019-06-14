let globalManRef = {};
let globalManState = {};
let globalID = -1;
let prevID = -1;

let pollData = [60, 60, 60, 60, 60, 60, 60];



let questions = {
  center: {
    title: "100 Adults",
    where: "Living in Centre",
    line1: "How many of them",
    line2: "have sound pollution complaints?",
    line3: " ",
    answer: 43.1,
  },
  southeast: {
    title: "100 Adults",
    where: "Living in South East",
    line1: "How many experience",
    line2: "social exclusion?",
    line3: " ",
    answer: 18.3
  },
  newwest: {
    title: "100 Teens",
    subtitle: "(between 15 and 16 years old)",
    where: "Living in New-West",
    line1: "How many teens ",
    line2: "work out often?",
    line3: "",
    answer: 30.5,
  },
  east: {
    title: "100 Adults",

    where: "Living in East",

    line1: "How many of them",
    line2: "have fallen twice or more",
    line3: "in the past year?",
    answer: 18.1,
  },
  south: {
    title: "100 Adults",

    where: "Living in South",
    line1: "How many of them are",
    line2: "satisfied with the green",
    line3: "spaces in their neighbourhood?",
    answer: 90.9
  },
  north: {
    title: "100 Adults",

    where: "Living in North",
    line1: "How many adults ",
    line2: "experience moderate or",
    line3: "severe loneliness?",
    answer: 51.2
  },
  west: {
    title: "100 Adults",

    where: "Living in West",
    line1: "How many adults ",
    line2: "have had unprotected sex?",
    line3: "", 
    answer: 15.0,
  },
}

let map2Index = {
  0: questions.north,
  1: questions.south,
  2: questions.east,
  3: questions.west,
  4: questions.newwest,
  5: questions.southeast,
  6: questions.center

}

// 1. Get a target element that you want to persist scrolling for (such as a modal/lightbox/flyout/nav). 
const targetElement = document.querySelector("body");
const targetElement2 = document.querySelector(".container");

// 2. ...in some event handler after showing the target element...disable body scroll





function init() {

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

      const obj = this.el.getObject3D('mesh');
      // console.log(obj);
      let groups = {};
      let sceneEl = document.querySelector('a-scene')
      let els = sceneEl.querySelectorAll('a-marker');
      sceneEl.appendChild(createResultText());

      // Make the entity for each marker from base
      for (var i = 0; i < els.length; i++) {
        var el = document.createElement('a-entity');
        el.setAttribute('id', `result-${i}`);
        let roundedAns = Math.floor(map2Index[i].answer/10);
        // ---- A - Answer
        let cloneA = document.createElement('a-entity');
        cloneA.object3D = obj.clone();
 
        cloneA.setAttribute("position", "-4 0 0");


        // ---- B - Average
        let cloneB = document.createElement('a-entity');
        cloneB.object3D = obj.clone();
        cloneB.setAttribute("position", "4 0 0");

        //ADD Text:

        // ADD both lines to marker
        el.appendChild(cloneA)
        el.appendChild(cloneB)
        el.setAttribute('visible', false);
        el.setAttribute('scale', "0.25 0.25 0.25");
        els[i].appendChild(el);
      }
      $('.loading').delay(1000).fadeOut();

    })
  },

});


function createResultText() {

  let el = document.createElement('a-entity');
  el.setAttribute('id', "result-text");
  el.setAttribute('visible', false);



    var title = document.createElement('a-entity');
    title.setAttribute('scale', "3 3 1");
    title.setAttribute('material', {color:'red'});

    title.setAttribute('position', "-2 6.0 0");
    title.setAttribute('id', "result-number");
    title.setAttribute('text-geometry', {font: "#helv", value:'%'});
    el.appendChild(title);

    var subtitle = document.createElement('a-entity');
    subtitle.setAttribute('scale', "2 2 1");
    subtitle.setAttribute('material', {color:"#0087c1"});

    subtitle.setAttribute('position', "0 4.0 0");
    subtitle.setAttribute('text-geometry', {font: "#helv", value:"Data from GGD"});
    el.appendChild(subtitle);

    var poll = document.createElement('a-entity');
    poll.setAttribute('scale', "3 3 1");
    poll.setAttribute('material', {color:'#ffeb00'});
    poll.setAttribute('id', "poll-number");

    poll.setAttribute('position', "5 6.0 0");
    poll.setAttribute('text-geometry', {font: "#helv", value:'%'});
    el.appendChild(poll);

    var subPoll = document.createElement('a-entity');
    subPoll.setAttribute('scale', "2 2 1");
    subPoll.setAttribute('material', {color:"#0087c1"});

    subPoll.setAttribute('position', "5 4.0 0");
    subPoll.setAttribute('text-geometry', {font: "#helv", value:"Average response from users"});
    el.appendChild(subPoll);
  
  return el;

}



AFRAME.registerComponent('modify-materials', {
  schema: {default: 0}, 
  init: function () {
    this.el.object3D.userData.ref = [];

    let localRef = {};
    let localManState = [];

   

    // console.log(this.data)
    // Wait for model to load.
    this.el.addEventListener('model-loaded', () => {

      // console.log("loaded model")
      // Grab the mesh / scene.
      const obj = this.el.getObject3D('mesh');
      // Go over the submeshes and modify materials we want.
      let groups = {};
      let sceneEl = document.querySelector('a-scene')
      let els = sceneEl.querySelectorAll('a-marker');
      for (var i = 0; i < els.length; i++) {
        // console.log(i)
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