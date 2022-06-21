<template>
  <div class="content__wrapper content__wrapper--projects">
    <div class="projects__wrapper">
      <div class="projects__titles">
        <div class="projects__title">
          Projects
        </div>
        <div class="projects__subtitle">
          Internet thingies built with passion
        </div>
      </div>
      <div class="projects">
        <template v-for="index in datas.datasProjects.title.length">
          <template v-if="datas.datasProjects.hidden[ index - 1 ] != true || useHiddens">
            <div class="projects__accordion" :key="index">
              <button class="projects__accordion--btn" @click="toggleAccordion" @mouseenter="toggleCursor" @mouseleave="toggleCursor">
              <span class="projects__accordion--titles">
                <span class="projects__accordion--title">{{ datas.datasProjects.title[ index - 1 ] }}</span>
                <span class="projects__accordion--subtitle">{{ datas.datasProjects.subtitle[ index - 1 ] }}</span>
              </span>
                <span class="projects__accordion--dots"></span>
                <span class="projects__accordion--date" v-if="datas.datasProjects.date[ index - 1 ] != 'current'">{{ datas.datasProjects.date[ index - 1 ] }}</span>
                <span class="projects__accordion--date pulse__circle" v-else></span>
              </button>
              <div class="projects__accordion--panel">
                <Specs :indexSpecs="index - 1"/>
                <div class="projects__accordion--media_wrapper" :class="datas.datasProjects.media[ index - 1 ].length > 1 ? 'projects__accordion--media_wrapper--multiple' : ''">
                  <template v-for="indexMedia in datas.datasProjects.media[ index - 1 ].length">
                    <img :key="indexMedia" v-if="datas.datasProjects.media[ index - 1 ][indexMedia - 1].split('.').pop() != 'mp4' && datas.datasProjects.media[ index - 1 ][indexMedia - 1].split('.').pop() != 'mov'" :src=" '/assets/img/media/' + datas.datasProjects.media[ index - 1 ][indexMedia - 1]" class="projects__accordion--media" :class="indexMedia - 1 == 0 ? 'projects__accordion--media--first' : ''" @click="clickMediaMobile">
                    <video :key="indexMedia" v-else autoplay muted loop controls :src=" '/assets/img/media/' + datas.datasProjects.media[ index - 1 ][indexMedia - 1]" class="projects__accordion--media" :class="indexMedia - 1 == 0 ? 'projects__accordion--media--first' : ''" @click="clickMediaMobile"></video>
                  </template>
                </div>
                <div v-html=" datas.datasProjects.content[ index - 1 ] " class="projects__accordion--panel__text"></div>
                <a v-if="datas.datasProjects.link[ index - 1 ] != null" :href="datas.datasProjects.link[ index - 1 ]" class="projects__accordion--cta" target="_blank" rel="nofollow noopener noreferer">
                  <span class="projects__accordion--cta_text">Visit <span class="projects__accordion--cta_arrow">-></span></span>
                  <div class="marquee" aria-hidden="true">
                    <div class="marquee__inner">
                      <span v-for="spanIndex in 4" :key="spanIndex">Visit</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </template>
        </template>
      </div>
      <div class="cursor">
        <img :src="'/assets/img/cursor/' + datas.datasProjects.cursor[indexCursor - 1]" class="cursor--img" v-for="indexCursor in datas.datasProjects.cursor.length" :key="indexCursor"/>
      </div>
    </div>
  </div>

</template>

<script>
import datasProjects from "../assets/json/datas-projects.json";
import Specs from "../components/Specs";


export default {
  name:     'Projects',
  metaInfo: {
    title: 'Projects'
  },
  computed: {
    useHiddens() {
      if ( this.$route.query.type == 'hidden' ) {
        return true;
      } else {
        return false;
      }
    }
  },
  data() {
    return {
      datas: {
        datasProjects
      }
    }
  },
  components: {
    Specs
  },
  mounted() {
    this.$parent.$parent.$parent.cursorEmoji( document.querySelectorAll( '.link' ) );

    this.cursor        = document.querySelectorAll( '.cursor--img' );
    this.cursorWrapper = document.querySelector( '.cursor' );
    this.filesUrl      = this.datas.datasProjects.cursor
    this.customCursor();
    this.removeMediaClass();

  },
  methods: {
    _useHiddens() {
      if ( this.$route.query.type == 'hidden' ) {
        return true;
      } else {
        return false;
      }
    },
    clickMediaMobile( e ) {
      const isTouchDevice = this.$parent.$parent.$parent.isTouchDevice();
      if ( !isTouchDevice ) {
        return;
      }
      Array.from( e.currentTarget.parentElement.children ).forEach(
          media => {
            media.classList.remove( 'projects__accordion--media--clicked' )
          }
      )
      e.currentTarget.classList.add( 'projects__accordion--media--clicked' )
    },
    removeMediaClass() {
      this.mediaFirst     = document.querySelectorAll( '.projects__accordion--media_wrapper--multiple .projects__accordion--media--first' )
      const isTouchDevice = this.$parent.$parent.$parent.isTouchDevice();
      if ( !isTouchDevice ) {
        this.mediaFirst.forEach( mediaFirst => {
              mediaFirst.addEventListener( 'mouseenter', () => {
                if ( mediaFirst.classList.contains( 'projects__accordion--media--first' ) ) {
                  mediaFirst.classList.remove( 'projects__accordion--media--first' )
                }
              }, { once: true } )
            }
        )
      } else {
        this.media = document.querySelectorAll( '.projects__accordion--media_wrapper--multiple .projects__accordion--media' )
        this.media.forEach( media => {
              media.addEventListener( 'click', () => {
                this.media.forEach(
                    mediaToCheck => {
                      if ( mediaToCheck.classList.contains( 'projects__accordion--media--first' ) ) {
                        mediaToCheck.classList.remove( 'projects__accordion--media--first' )
                      }
                    }
                )
              }, { once: true } )
            }
        )
      }
    },
    customCursor() {

      if ( this._useHiddens() == false ) {
        let indexsToRemove = [];
        this.datas.datasProjects.hidden.forEach(
            ( type, index ) => {
              if ( type == true ) {
                indexsToRemove.push( index )
              }
            }
        )
        indexsToRemove.forEach(
            indexToRemove => {
              this.cursor[ indexToRemove ].parentNode.removeChild( this.cursor[ indexToRemove ] )
            }
        )
      }


      this.cursor = document.querySelectorAll( '.cursor--img' )

      window.addEventListener( 'mousemove', ( e ) => {
        this.cursorWrapper.style.left = `${e.clientX + 2}px`
        this.cursorWrapper.style.top  = `${e.clientY + 2}px`
      } );
    },

    toggleCursor:    function ( event ) {
      const isTouchDevice = this.$parent.$parent.$parent.isTouchDevice();
      if ( isTouchDevice ) {
        return;
      }

      let acc   = event.currentTarget
      let index = Array.from( acc.parentElement.parentElement.children ).indexOf( acc.parentElement )
      this.cursor.forEach( cursor => {
            cursor.classList.remove( 'cursor--img__visible' )
          }
      )

      if ( event.type != "click" && acc.parentElement.classList.contains( 'active' ) ) {
        //ouvert, ne rien faire
      } else {
        this.cursor[ index ].classList.add( 'cursor--img__visible' )
        this.cursorWrapper.classList.toggle( "cursor--visible" )
      }

      // à l'ouverture de l'accordéon remove cursor image actuelle
      if ( event.type == "click" && acc.parentElement.classList.contains( 'active' ) ) {
        this.cursor[ index ].classList.remove( 'cursor--img__visible' )
      }
    },
    toggleAccordion: function ( event ) {
      let acc         = event.currentTarget;
      this.accordions = Object.values( acc.parentElement.parentElement.children );
      this.accordions.forEach( accordion => {
        if ( accordion.classList.contains( "active" ) ) {
          let accBrothers = Object.values( acc.parentElement.parentElement.children )
          if ( this.accordions.indexOf( accordion ) != accBrothers.indexOf( acc.parentElement ) ) {
            accordion.classList.remove( "active" )
            let panelRemove             = accordion.children[ 1 ];
            panelRemove.style.maxHeight = null;
          }
        }
      } )

      acc.parentElement.classList.toggle( "active" );
      this.toggleCursor( event );

      let panel = acc.nextElementSibling;
      if ( panel.style.maxHeight ) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = ( panel.scrollHeight + 75 ) + "px";
      }
    }
  }
}
</script>

<style lang="scss">

.cursor {
  position: fixed;
  z-index: 100;
  width: 150px;
  height: 150px;
  background: $ft-icons-gradient;
  opacity: 0;
  visibility: hidden;
  transition: opacity .3s $easeOutQuad, visibility .3s $easeOutQuad;

  &.cursor--visible {
    opacity: 1;
    visibility: visible;
  }
}

.cursor--img {
  max-width: 100%;
  max-height: 100%;
  padding: 35px 15px;
  position: absolute;
  inset: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity .25s $easeOutQuad, visibility .25s $easeOutQuad;

  &.cursor--img__visible {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }
}

.projects__wrapper {
  width: 100%;
}

.projects__title {
  font: 600 32px/40px $magnat-head;
  color: $ft-black;
  margin-bottom: 8px;
}

.projects__subtitle {
  border-bottom: 2px dotted hsl(0 0% 88.7%);
  padding-bottom: 24px;
  margin-bottom: 24px;
}

.projects {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  row-gap: 18px;
}

.projects__accordion {
  font-size: 14px;
  line-height: 24px;
  width: 100%;
  transition: margin-top .3s $easeOutQuad;

  &.active {
    margin-top: 5px;
    transition: margin-top .3s $easeOutQuad;

    .projects__accordion--btn {
      background-color: $ft-light-grey-bg;
    }

    .projects__accordion--btn {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
      cursor: pointer;

      &:before {
        transform: translateY(-50%) rotate(90deg);
      }
    }

    .projects__accordion--panel {
      border: 1px solid $ft-light-grey-bg;
      padding-top: 40px;
      padding-bottom: 40px;
      opacity: 1;
    }
  }
}

.projects__accordion--titles {
  display: flex;
  justify-content: center;
  align-items: center;
}

.projects__accordion--title {
  font-weight: 500;
  color: $ft-black;
  margin-right: 4px;
}

.projects__accordion--btn {
  width: 100%;
  padding: 15px 15px 15px 34px;
  border: none;
  text-align: left;
  transition: 0.3s $easeOutQuad;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px;
  gap: 15px;
  position: relative;
  z-index: 3;
  cursor: none;


  &:before {
    content: '';
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent transparent $ft-black;
    position: absolute;
    top: 49%;
    left: 16px;
    transform: translateY(-50%) rotate(0);
    transform-origin: .2rem 50%;
    transition: .25s transform ease;
  }

  @media (min-width: $mobileMin) {
    &:hover {
      background-color: $ft-light-grey-bg;
    }
  }
}

.projects__accordion--dots {
  border-top: 2px dotted hsl(0 0% 88.7%);
  flex: 1 1 0%;
}

.projects__accordion--date {
  font-family: $menlo;
  color: hsl(0 0% 56.1%);
}


.projects__accordion--panel {
  padding: 0px 25px 0px 25px;
  //background-color: $ft-light-grey-bg;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.3s $easeOutQuad, opacity 0.6s $easeOutQuad, padding-top 0.3s $easeOutQuad, padding-bottom 0.3s $easeOutQuad;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  margin-top: -20px;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.projects__accordion--panel__text {
  padding-top: 18px;
  align-self: flex-start;

  p {
    &:not(:last-of-type) {
      margin-bottom: 12px;
    }
  }

  ul {
    margin-bottom: 12px;
  }
}

.projects__accordion--media_wrapper {
  margin: 20px auto 0px auto;

  &.projects__accordion--media_wrapper--multiple {
    width: 100%;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    .projects__accordion--media {
      max-width: none;
      max-height: none;
      min-height: 350px;
      transition: flex .3s $easeOutQuad, filter .3s $easeOutQuad;
      height: 100%;
      filter: grayscale(0.25) brightness(0.75) blur(0.2px);
      object-fit: cover;
      overflow: hidden;
      flex: 1;
      position: relative;

      @media (min-width: $mobileMin) {
        &:hover, &.projects__accordion--media--first {
          filter: grayscale(0) brightness(1.05) blur(0);
          flex: 12;
        }
      }
    }
  }
}

.projects__accordion--media {
  max-width: 100%;
  max-height: 100%;
}

.projects__accordion--cta {
  padding: 10px 20px;
  background: $ft-light-grey-bg;
  border-radius: 16px;
  line-height: 24px;
  text-decoration: none;
  color: $ft-black;
  display: block;
  align-self: flex-end;
  position: relative;

  > span {
    display: inline-block;
    transition: opacity .1s $easeOutQuad;
  }

  .marquee {
    transform: rotate(-2.75deg);
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;

    span {
      text-align: center;
      white-space: nowrap;
      font-style: italic;
      padding: 12px 6px;
    }
  }

  .marquee__inner {
    width: fit-content;
    display: flex;
    position: relative;
    --offset: 16px;
    --move-initial: calc(-25% + var(--offset));
    --move-final: calc(-50% + var(--offset));
    transform: translate3d(var(--move-initial), 0, 0);
    animation: marquee 0.8s linear infinite;
    animation-play-state: paused;
    opacity: 0;
    transition: opacity .3s $easeOutQuad;
  }

  @media (min-width: $mobileMin) {
    &:hover {
      > span {
        opacity: 0;
      }

      .marquee__inner {
        animation-play-state: running;
        opacity: 1;
        transition: opacity .3s $easeOutQuad;
        transition-duration: 0.6s;
      }
    }
  }
}

.projects__accordion--cta_arrow {
  margin-left: 5px;
}

@media (max-width: $mobileMin) {
  .cursor {
    display: none;
  }

  .projects__accordion--btn {
    cursor: auto;
  }
}

@media (max-width: $smallMin) {
  .projects {
    row-gap: 13px;
  }

  .projects__accordion {
    &.active {
      .projects__accordion--panel {
        padding-top: 25px;
        padding-bottom: 20px;
      }
    }
  }

  .projects__accordion--btn {
    padding: 13px 12px 13px 30px;

    &::before {
      left: 12px;
    }
  }

  .projects__accordion--panel {
    padding: 0px 20px 0px 20px;
  }

  projects__accordion--panel__text {
    padding-top: 15px;
    margin-bottom: 10px;
  }

  .projects__accordion--media_wrapper {
    max-width: 100%;

    &.projects__accordion--media_wrapper--multiple {
      height: 170px;
      gap: 8px;

      .projects__accordion--media {
        min-height: 170px;

        &.projects__accordion--media--clicked, &.projects__accordion--media--first {
          flex: 16;
          filter: grayscale(0) brightness(1.05) blur(0);
        }
      }
    }
  }
}

@keyframes marquee {
  0% {
    transform: translate3d(var(--move-initial), 0, 0);
  }

  100% {
    transform: translate3d(var(--move-final), 0, 0);
  }
}
</style>
