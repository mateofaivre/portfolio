<template>
  <div class="project" @click="clickProject()">
    <div class="project__title">
      {{ project[ 1 ][ 0 ] }}
    </div>
    <div class="project__content">
      <div class="project__content--top">
        <div class="project__content--icon">
          <Flash/>
        </div>
        <div class="project__content--title">
          {{ datasProject.datasProject.project.title[ project[ 0 ] ] }}
        </div>
      </div>
      <div class="project__content--middle">
        <img src="https://www.verse.sh/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnightfm.b7d24981.png&w=1920&q=75" alt="" class="project__content--img">
        <div class="project__content--text">
          A cyberpunk radio station I built for fun.
        </div>
      </div>
      <div class="project__content--bottom">
        <a href="#" target="_blank" rel="nofollow noopener noreferrer" class="project__content--cta">
          Visit ->
        </a>
      </div>


    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
import datasProject from "../assets/json/datas-project.json"
import Flash from "../assets/flash.svg";


export default {
  name:       "Project",
  components: {
    Flash
  },
  data() {
    return {
      datasProject: {
        datasProject
      }
    }
  },
  props: {
    project: {}
  },
  mounted() {
    this.currentProject = document.querySelectorAll( '.project' )[ this.project[ 0 ] ]
    this.currentProject.children[ 0 ].style.font = this.project[ 1 ][ 1 ][ 0 ]
    if ( this.project[ 1 ][ 1 ][ 1 ] == true ) {
      this.currentProject.children[0].style.textTransform = 'uppercase'
    }

    gsap.set(
        this.currentProject,
        {
          transformStyle:       "preserve3d",
          transformPerspective: 1000
        }
    )

    gsap.set(
        this.currentProject.children, {
          transformStyle:  "preserve3d",
          transformOrigin: "50% 50%"
        }
    )

    gsap.set(
        this.currentProject.children[ 1 ], {
          rotateX: 180,
          rotateZ: 180
        }
    )

    this.dragWindows( false, false );

  },
  methods: {
    dragWindows( desactivate, drag ) {
      // Make the DIV element draggable:
      dragElement( this.currentProject, desactivate );


      function dragElement( elmnt, desactivate ) {

        let projectsChilds = Array.from( elmnt.parentElement.children );
        let pos1           = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        // otherwise, move the DIV from anywhere inside the DIV:
        if ( desactivate == false ) {
          projectsChilds.forEach( project => {
            // project != elmnt ? project.style.pointerEvents = "auto" : "";
          } )
          elmnt.onmousedown = dragMouseDown;
        } else {
          elmnt.onmousedown = "";
          projectsChilds.forEach( project => {
            // project != elmnt ? project.style.pointerEvents = "none" : "";
          } )
        }

        function dragMouseDown( e ) {
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3                 = e.clientX;
          pos4                 = e.clientY;
          document.onmouseup   = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
        }


        function elementDrag( e ) {
          e = e || window.event;
          e.preventDefault();
          // calculate the new cursor position:
          pos1             = pos3 - e.clientX;
          pos2             = pos4 - e.clientY;
          pos3             = e.clientX;
          pos4             = e.clientY;
          // set the element's new position:
          elmnt.style.top  = ( elmnt.offsetTop - pos2 ) + "px";
          elmnt.style.left = ( elmnt.offsetLeft - pos1 ) + "px";
        }


        function closeDragElement() {
          // stop moving when mouse button is released:
          document.onmouseup   = null;
          document.onmousemove = null;
          console.log('end drag')
          setTimeout(() => drag = false)
        }
      }
    },

    clickProject() {
      this.drag = this.dragWindows( true, false );
      console.log(this.drag)
      if(!this.drag) { //change click only if not draged
        this.click = !this.click
        this.$parent.scaleCard()
      }
    }
  }

}
</script>

<style scoped lang="scss">

$card-scale: 1.9;

.project {
  position: absolute;
  width: 290px;
  height: 390px;
  overflow: hidden;
}

.project__title, .project__content {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  color: $ft-light-black;
  background: $ft-dark-white2;
  display: flex;
  backface-visibility: hidden;
}

.project__title {
  font-size: 30px;
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  backdrop-filter: blur(15px);
  box-shadow: rgba(0, 0, 0, 0) 0px 0px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  cursor: pointer;
}

.project__content {
  flex-direction: column;
  justify-content: space-between;
  padding: calc(24px / #{$card-scale});
  border-radius: calc(16px / #{$card-scale});
}

.project__content--top {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-self: flex-start;
  column-gap: calc(12px / #{$card-scale});
}

.project__content--icon {
  background: $ft-light-grey;
  width: calc(48px / #{$card-scale});
  height: calc(48px / #{$card-scale});
  border-radius: calc(12px / #{$card-scale});
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: calc(24px / #{$card-scale});
    height: calc(24px / #{$card-scale});
  }
}

.project__content--title {
  font-size: calc(18px / #{$card-scale});
  //line-height: calc(28px / #{$card-scale});
  font-weight: 500;
  text-transform: uppercase;
}

.project__content--img {
  max-width: 100%;
  max-height: auto;
  width: auto;
  height: auto;
  align-self: center;
  margin-bottom: calc(16px / #{$card-scale});
}

.project__content--text {
  font-size: calc(14px / #{$card-scale});
  line-height: calc(20px / #{$card-scale});
  max-width: 80%;
  margin: 0 auto;
  text-align: center;
  color: $ft-grey-text;
}

.project__content--bottom {
  align-self: flex-end;
  display: flex;
  justify-content: center;
  align-items: center;
}

.project__content--cta {
  background: $ft-light-grey;
  color: $ft-grey-text;
  font-weight: 500;
  padding: calc(12px / #{$card-scale}) calc(16px / #{$card-scale});
  border-radius: calc(12px / #{$card-scale});
  font-size: calc(16px / #{$card-scale});
  text-decoration: none;
}

</style>