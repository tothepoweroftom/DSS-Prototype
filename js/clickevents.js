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
      let id = evt.target.id
      globalID = id;

      console.log(document.getElementById('marker-'+globalID).children)
      document.getElementById('marker-'+globalID).children[1].setAttribute('visible', true);


      if(prevID != -1) {
        document.getElementById('marker-'+prevID).children[1].setAttribute('visible', false);

      }
      prevID = globalID
      setSlider();


    });


  }
});

function handleSlider() {


  let value = $('#rs-range-line').val();
  $('#rs-bullet').html(value + '%');
  $('#rs-bullet').css({'color': `hsla(${173+value}, 100%, 50%, 1)`})
  $('.rs-range').css({'background': `hsla(${173+value}, 100%, 50%, 1)`})

  for (let i = 0; i < 100; i++) {

    if (i <= value) {

      // if not already true - to save DOM calls - ie Entire dom has to be rerendered 
      if (globalManState[globalID][i] != true) {
        globalManRef[globalID][i].material.emissive.set('#787105');
        globalManState[globalID][i] = true

      }
    } else {

      if (globalManState[globalID][i] != false) {

        globalManRef[globalID][i].material.emissive.set('#000948');
        globalManState[globalID][i] = false

      }
    }

  } // globalManRef[100-i].material.emissive.set('blue')

}

function handleTouchEnd(event) {
  // alert(event)


}

function setSlider() {
  $('#rs-range-line').val(0);
  $('#gui').fadeIn();

  for (let i = 0; i < 100; i++) {
    globalManRef[globalID][i].material.emissive.set('#000948');

  }
 

}




$('#x-butt').on('click touchstart', function () {


})

$('#y-butt').on('click touchstart', function () {

})