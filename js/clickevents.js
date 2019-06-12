// Component to change to a sequential color on click.

let sliderBuffer = [];


let questions = {
  southeast: {
    1: "How many experience",
    2: " ",
    3: " "
  },
  newwest: {
    1: "How many teens ",
    2: "between 15 and 16 years old",
    3: " work out often?"
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
            value: 'Living in New-East'
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
        default:
          break;
      }
    });


  }
});

function handleSlider() {


  let value = $('#rs-range-line').val();
  console.log(value)

  for (let i = 0; i < 100; i++) {

    if (i <= value) {
      globalManRef[i].material.emissive.set('red');
    } else {
      globalManRef[i].material.emissive.set('blue');

    }

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