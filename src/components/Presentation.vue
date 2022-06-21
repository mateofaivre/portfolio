<template>
  <div class="presentation">
    <div class="presentation__title">
      Matéo Faivre
    </div>
    <div class="presentation__subtitle">
      Creative Web Developer in love with emotional interfaces.
    </div>
    <hr class="presentation__diviser">
    <div class="presentation__texts">
      <div class="presentation__text presentation__text--top">
        Experimenting with the web at <a href="https://lesanimals.digital" class="presentation__link link" data-emoji="animals"  target="_blank" rel="nofollow noopener noreferrer">Les Animals</a> in a work-study program, in Lyon.
      </div>
      <div class="presentation__text presentation__text--bottom">
        Learning design and development at <a href="https://esadd.fr" class="presentation__link link" data-emoji="school"  target="_blank" rel="nofollow noopener noreferrer">ESADD School</a> in Dijon.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Presentation",
  mounted() {
  }
}
</script>

<style scoped lang="scss">
.presentation__title {
  font: 600 24px/24px $magnat-head;
  color: $ft-black;
  margin-bottom: 12px;
}

.presentation__diviser {
  width: 48px;
  height: 1px;
  border: 0px;
  margin-top: 24px;
  margin-bottom: 24px;
  background: rgb(226, 226, 226);
}

.presentation__texts {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}

.presentation__text--top {
  margin-bottom: 12px;
}
</style>