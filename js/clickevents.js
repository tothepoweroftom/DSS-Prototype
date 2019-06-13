// Component to change to a sequential color on click.

let sliderBuffer = [];


let questions = {
  southeast: {
    1: "How many experience",
    2: "social exclusion?",
    3: " "
  },
  newwest: {
    1: "How many teens ",
    2: "between 15 and 16 years old",
    3: " work out often?"
  },
  east: {
    1: "How many of them",
    2: "have fallen twice or more",
    3: "in the past year?"
  },
  south: {
    1: "How many of them are",
    2: "satisfied with the green",
    3: "spaces in their neighbourhood?"
  },
  north: {
    1: "How many adults ",
    2: "experience moderate or",
    3: " severe loneliness?"
  },
  west: {
    1: "How many adults ",
    2: "have had unprotected sex?",
    3: ""
  },
}
AFRAME.registerComponent('cursor-listener', {
  init: function () {
    var lastIndex = -1;
    var COLORS = ['red', 'green', 'blue'];
    this.el.addEventListener('click', function (evt) {
      lastIndex = (lastIndex + 1) % COLORS.length;

      this.setAttribute('material', 'color', 'red');

      setTimeout(() => {
        this.setAttribute('material', 'color', 'yellow');

      }, 1000)
      console.log('I was clicked at: ', evt.detail.intersection.point);
      let id = evt.target.id

      // $('#rs-range-slider').val(0);
      setSlider();

      switch (id) {
        case "0":
          break;
        case "1":
          document.getElementById('livingIn').setAttribute('text-geometry', {
            value: 'Living in South-East'
          })
          document.getElementById('question1').setAttribute('text-geometry', {
            value: questions.southeast[1]
          })
          document.getElementById('question2').setAttribute('text-geometry', {
            value: questions.southeast[2]
          })
          document.getElementById('question3').setAttribute('text-geometry', {
            value: questions.southeast[3]
          })

          break;
        case "2":
          document.getElementById('livingIn').setAttribute('text-geometry', {
            value: 'Living in New-West'
          })
          document.getElementById('question1').setAttribute('text-geometry', {
            value: questions.newwest[1]
          })
          document.getElementById('question2').setAttribute('text-geometry', {
            value: questions.newwest[2]
          })
          document.getElementById('question3').setAttribute('text-geometry', {
            value: questions.newwest[3]
          })
          break;
        case "3":
          document.getElementById('livingIn').setAttribute('text-geometry', {
            value: 'Living in South'
          })
          document.getElementById('question1').setAttribute('text-geometry', {
            value: questions.south[1]
          })
          document.getElementById('question2').setAttribute('text-geometry', {
            value: questions.south[2]
          })
          document.getElementById('question3').setAttribute('text-geometry', {
            value: questions.south[3]
          })
          break;
        case "4":
          document.getElementById('livingIn').setAttribute('text-geometry', {
            value: 'Living in West'
          })
          document.getElementById('question1').setAttribute('text-geometry', {
            value: questions.west[1]
          })
          document.getElementById('question2').setAttribute('text-geometry', {
            value: questions.west[2]
          })
          document.getElementById('question3').setAttribute('text-geometry', {
            value: questions.west[3]
          })
          break;
        case "5":
          document.getElementById('livingIn').setAttribute('text-geometry', {
            value: 'Living in North'
          })
          document.getElementById('question1').setAttribute('text-geometry', {
            value: questions.north[1]
          })
          document.getElementById('question2').setAttribute('text-geometry', {
            value: questions.north[2]
          })
          document.getElementById('question3').setAttribute('text-geometry', {
            value: questions.north[3]
          })
          break;
        case "5":
          document.getElementById('livingIn').setAttribute('text-geometry', {
            value: 'Living in East'
          })
          document.getElementById('question1').setAttribute('text-geometry', {
            value: questions.east[1]
          })
          document.getElementById('question2').setAttribute('text-geometry', {
            value: questions.east[2]
          })
          document.getElementById('question3').setAttribute('text-geometry', {
            value: questions.east[3]
          })
          break;
        default:
          break;
      }
    });


  }
});

function handleSlider() {


  let value = $('#rs-range-line').val();
  $('#rs-bullet').html(value + '%');

  for (let i = 0; i < 100; i++) {

    if (i <= value) {

      // if not already true - to save DOM calls - ie Entire dom has to be rerendered 
      if (globalManState[i] != true) {
        globalManRef[i].material.emissive.set('red');
        globalManState[i] = true

      }
    } else {

      if (globalManState[i] != false) {

        globalManRef[i].material.emissive.set('blue');
        globalManState[i] = false

      }
    }

  } // globalManRef[100-i].material.emissive.set('blue')

}

function setSlider() {




  for (let i = 0; i < 100; i++) {


    globalManRef[i].material.emissive.set('blue');
    globalManState[i] = false;


  } // globalManRef[100-i].material.emissive.set('blue')

}


function getAverageDirection(elmt) {

  var sum = 0;
  for (var i = 0; i < elmt.length; i++) {
    sum += parseInt(elmt[i], 10); //don't forget to add the base
  }

  var avg = sum / elmt.length;
  return avg;
}

$('#rs-range-line').change(function () {
  // console.log()



})


$('#x-butt').on('click touchstart', function () {
  let sphere = document.getElementById('test');
  sphere.setAttribute('material', {
    color: 'red'
  })

})

$('#y-butt').on('click touchstart', function () {
  let sphere = document.getElementById('test');
  sphere.setAttribute('material', {
    color: 'blue'
  })
})