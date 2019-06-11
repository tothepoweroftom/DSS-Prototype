// Component to change to a sequential color on click.

let sliderBuffer = [];
AFRAME.registerComponent('cursor-listener', {
  init: function () {
    var lastIndex = -1;
    var COLORS = ['red', 'green', 'blue'];
    this.el.addEventListener('click', function (evt) {
      lastIndex = (lastIndex + 1) % COLORS.length;
      this.setAttribute('material', 'color', COLORS[lastIndex]);
      console.log('I was clicked at: ', evt.detail.intersection.point);
      let id = evt.target.id
      switch (id) {
        case "0":
          document.getElementById('one').setAttribute('src', 'foo.jpg')
          break;
        case "1":

          break;
        case "2":

          break;
        case "3":

          break;
        case "4":

          break;
        case "5":

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