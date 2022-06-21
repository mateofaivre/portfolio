<template>
  <div class="icons">
    <div class="icon icon--projects" @click="this.$parent.manageClass">
      <span class="icon__text">
        Projets
      </span>
      <Projects/>
    </div>
    <div class="icon icon--timeline" @click="this.$parent.launchTimeline">
      <span class="icon__text">
        Timeline
      </span>
      <Timeline/>
    </div>
    <a href="https://twitter.com/mateofaivre" target="_blank" rel="nofollow noopener noreferrer" class="icon icon--twitter">
        <span class="icon__text">@mateofaivre</span>
      <Twitter/>
    </a>
    <a href="mailto:mateo.faivre@esadd.fr"  target="_blank" rel="nofollow noopener noreferrer" class="icon icon--contact">
        <span class="icon__text">Contact</span>
      <Mail/>
    </a>
    <a href="https://github.com/mateofaivre"  target="_blank" rel="nofollow noopener noreferrer" class="icon icon--github">
      <span class="icon__text">Github</span>
      <Github/>
    </a>


  </div>
</template>

<script>
import Projects from '../assets/projects.svg';
import Timeline from '../assets/timeline.svg';
import Twitter from '../assets/twitter.svg';
import Mail from '../assets/mail.svg';
import Github from '../assets/github.svg';


export default {
  name: "Icons",
  data() {
    return {}
  },
  mounted() {
  },
  components: {
    Projects, Timeline, Twitter, Mail, Github
  },
  methods: {

  },
  updated() {

  }
}
</script>

<style scoped lang="scss">
.icons {
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  width: -moz-fit-content;
  column-gap: 24px;
}

.icon {
  color: $ft-white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background-image: linear-gradient(to top, rgb(16, 16, 16), rgb(24, 24, 27));
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(255, 255, 255, 0.05) 0px 1px 0px 0px inset;
  transition: transform .3s ease-out;
  position: relative;
  cursor: pointer;


  &:hover {
    transform: translateY(-5px);
    transition: transform .3s ease-out;
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(255, 255, 255, 0.05) 0px 1px 0px 0px inset;

    .icon__text {
      transform: translateX(-50%) translateY(50px);
      opacity: 1;
      transition: transform .3s ease-out, opacity .3s ease-out;
    }
  }

  .icon__text {
    color: inherit;
    text-decoration: none;
    position: absolute;
    left: 50%;
    transform: translateX(-50%) translateY(65px);
    opacity: 0;
    transition: transform .3s ease-out, opacity .3s ease-out;
  }

  svg {
  }
}
</style>