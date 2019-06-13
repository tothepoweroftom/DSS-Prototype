const targetElement = document.querySelector("#aframe-scene");

let globalManRef = {};
let globalManState = [];

// 2. ...in some event handler after showing the target element...disable body scroll
bodyScrollLock.disableBodyScroll(targetElement);


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
                let numIndex = 10*parseInt(groupIndex) + parseInt(meshIndex);


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

