<template>
  <div class="content__wrapper content__wrapper--home">
    <Presentation/>
  </div>
</template>

<script>
import Presentation from "../components/Presentation.vue";


export default {
  name:     'Home',
  metaInfo: {
    title: 'Home'
  },
  data() {
    return {
      timeline: {}
    }
  },
  components: {
    Presentation
  },
  mounted() {
    this.$parent.$parent.$parent.cursorEmoji( document.querySelectorAll( '.link' ) );
  }
}
</script>

<style lang="scss">
</style>
