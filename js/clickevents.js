// Component to change to a sequential color on click.

let sliderBuffer = [];



AFRAME.registerComponent('cursor-listener', {
  init: function () {
    var lastIndex = -1;
    $('#submit').fadeOut();


    var COLORS = ['red', 'green', 'blue'];
    this.el.addEventListener('click', function (evt) {

      lastIndex = (lastIndex + 1) % COLORS.length;

      this.setAttribute('material', 'color', 'red');

      setTimeout(() => {
        this.setAttribute('material', 'color', 'yellow');

      }, 1000)
      let id = evt.target.id
      globalID = id;

      document.getElementById('marker-'+globalID).children.namedItem(`graph-${globalID}`).setAttribute('visible', true);
      setSlider();


      if(prevID != -1 && globalID!=prevID) {
        document.getElementById('marker-'+prevID).children.namedItem(`graph-${prevID}`).setAttribute('visible', false);


      }

      prevID = globalID



    });


  }
});

function handleSlider() {


  let value = $('#rs-range-line').val();
  $('#rs-bullet').html(value + '%');
  // $('.rs-range').css({'background': `hsla(${173+value}, 100%, 50%, 1)`})

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
  $('#rs-bullet').css({'color': `hsla(${360}, 100%, 50%, 1)`})
  let result = document.getElementById('result-text').object3D.clone();

  $('#submit').fadeIn();
  setTimeout(() => {

    $('#show-submitted-text').fadeIn().delay(1000).fadeOut();

    $('#submit').fadeOut();
    setSlider();

    //Show the result, hide graph
    document.getElementById('marker-'+globalID).children.namedItem(`graph-${globalID}`).setAttribute('visible', false);



  }, 3000);


}

function setSlider() {
  $('#rs-range-line').val(0);
  $('#rs-bullet').html('0%');
  $('#rs-bullet').css({'color': `rgb(255,255,255)`})



  $('#gui').fadeIn();
  // $('.loader').fdeOut();


  // for (let i = 0; i < 100; i++) {
  //   globalManRef[globalID][i].material.emissive.set('#000948');

  // }
 

}




$('#x-butt').on('click touchstart', function () {


})
