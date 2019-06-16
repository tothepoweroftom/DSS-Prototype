// Component to change to a sequential color on click.

let sliderBuffer = [];



AFRAME.registerComponent('cursor-listener', {
  init: function () {
    var lastIndex = -1;


    var COLORS = ['red', 'green', 'blue'];
    this.el.addEventListener('click', function (evt) {

      if(isActive === false) {
        isActive = true;
        $('#submit').fadeOut();



        let id = evt.target.id
        globalID = id;
  

        document.getElementById('marker-'+globalID).children.namedItem(`graph-${globalID}`).setAttribute('visible', true);
        setSlider();


        if(prevID != -1 && globalID!=prevID) {
          document.getElementById('marker-'+prevID).children.namedItem(`graph-${prevID}`).setAttribute('visible', false);


        }

        prevID = globalID
      }


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
  // alert(event)
  $('#rs-bullet').css({'color': `hsla(${360}, 100%, 50%, 1)`})

  $('#submit').fadeIn();
  setTimeout(() => {
    $('#gui').fadeOut();

    //set the data
    $('#answer').html(`${map2Index[globalID].answer}%`)
    let answer = Math.round(map2Index[globalID].answer/10)
    for(let i=0; i<10; i++) {
      if(i<answer) {
        $(`#man-A-${10-i}`).css({'color': '#ffe600'})
      } else {
        $(`#man-A-${10-i}`).css({'color': '#282864'})

      }
    }
    document.getElementById('marker-'+globalID).children.namedItem(`graph-${globalID}`).setAttribute('visible', false);

    $('.result-overlay').fadeIn();
    document.getElementById('camera').setAttribute('visible', false);
    setTimeout(()=>{
      isActive = false;
      $('.result-overlay').fadeOut();
      document.getElementById('camera').setAttribute('visible', true);

    }, 5000)
    $('#submit').fadeOut();


  }, 3000);

 


}

function setSlider() {
  
  $('#rs-range-line').val(0);
  $('#rs-bullet').html('0%');
  $('#rs-bullet').css({'color': `rgb(255,255,255)`})



  $('#gui').fadeIn();


  for (let i = 0; i < 100; i++) {
    globalManRef[globalID][i].material.emissive.set('#000948');

  }
 


}




$('#x-butt').on('click touchstart', function () {


})
