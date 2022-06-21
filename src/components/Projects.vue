<template>
  <div class="projects__wrapper projects__wrapper--hidden">
    <div class="projects__close" @click="closeClick">
      <Close/>
    </div>
    <div class="projects">
      <Project v-bind:project="[i, projects[i]]" v-for="(project, i) in projects" :key="project[0]"/>
    </div>
    <div class="projects__bottom">
      Drag a card to move it around, or click to flip it over
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
import Project from "../components/Project";
import Close from "../assets/close.svg";


export default {
  name:       "Projects",
  components: {
    Project, Close
  },
  data() {
    return {
      projects: []
    }
  },

  mounted() {
    this.projects.push(
        [ 'Chopard', [ '900 30px/36px Pilat', true ] ],
        [ 'Sneaky World', [ '600 30px/36px Inter ', false ] ],
        [ 'Fcinq', [ '700 30px/36px Chakra', true ] ],
        [ 'DS Automobiles', [ '600 30px/36px Inter', false ] ],
        [ 'Comté', [ '600 30px/36px Azeret', false ] ]
    )

    this.tlScale = gsap.timeline( { paused: true } )


  },
  created() {
  },
  updated() {


  },
  methods: {
    closeClick() {
      if ( typeof this.tlScale != "undefined" ) {
        this.tlScale.reverse().then( () => {
              this.$parent.manageClass()
            }
        );
      } else {
        this.$parent.manageClass()
      }

    },
    checkClickOutside( specifiedElement ) {
      //I'm using "click" but it works with any event
      const onClick = ( event ) => {
        let isClickInside = specifiedElement.contains( event.target );

        if ( !isClickInside ) {
          console.log( 'outside' )
          specifiedElement.classList.remove( "project--opened" )
          this.tlScale.reverse();
          this.tlScale = gsap.timeline( { paused: true } )
          document.removeEventListener( 'click', onClick )
        } else {
          console.log( 'inside' )
        }
      }
      document.addEventListener( 'click', onClick );

    },


    scaleCard() {
      // this.projectTarget  = event.target.parentElement
      this.projectsDom     = document.querySelectorAll( '.project' )
      this.projectAllClass = Array.prototype.slice.call( this.projectsDom, 0 );
      this.projectIndex    = ( this.projectAllClass.indexOf( event.currentTarget ) );
      this.projectTarget   = this.projectsDom[ this.projectIndex ]
      if ( this.projectTarget.classList.contains( "project--opened" ) ) {
        return;
      }
      this.projectTitle   = this.projectTarget.children[ 0 ]
      this.projectContent = this.projectTarget.children[ 1 ]

      const timing = 0.5

      this.tlScale.set(
          this.projectTarget.children,
          {
            backdropFilter: "none"
          }
      )

      this.tlScale.to( this.projectTarget.children,
          {
            rotationY: "+=180",
            duration:  timing,
            ease:      "sine.out"
          }
      );

      this.tlScale.to( this.projectTarget,
          {
            z:        50,
            duration: timing / 2,
            yoyo:     true,
            repeat:   1,
            ease:     "sine.out"
          }, 0 );

      this.tlScale.to( this.projectTarget,
          {
            scale:    1.9,
            zIndex:   100,
            rotate:   0,
            duration: timing / 2,
            top:      '50%',
            left:     '50%',
            x:        '-50%',
            y:        '-50%',
            ease:     "sine.out"
          }, 0 );

      this.tlScale.to(
          this.projectTarget.children[ 0 ],
          {
            backdropFilter: "blur(15px)",
            duration:       timing / 2,
            ease:           "sine.out",
            onComplete:     () => {
              this.projectTarget.classList.add( "project--opened" )
              this.checkClickOutside( this.projectTarget )
            }
          },
          '>'
      )

      if ( !this.tlScale.isActive() ) {
        this.tlScale.play();
      }
    }
  }

}
</script>

<style scoped lang="scss">
.projects__wrapper {
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0px;
  left: 0;
  background: $ft-black;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  //transition: opacity .1s ease-out;
  //opacity: 1;

  &.projects__wrapper--hidden {
    //transition: opacity .1s ease-out;
    //z-index: -1;
    //opacity: 0;
    display: none;
  }

  .projects__close {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin: 0 auto;
    background: rgba($ft-light-black, 0.7);
    cursor: pointer;
    z-index: 1;

    svg {
      width: 50%;
      height: 50%;
    }
  }
}

.projects {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.projects__bottom {
  font-size: 14px;
  color: $ft-grey;
  margin-bottom: 20px;
}
</style>