<template>
  <div class="content__wrapper content__wrapper--timeline">
    <div class="timeline__wrapper">
      <div :class="index -1 == 0 ? 'timeline timeline--first' : 'timeline'" v-for="index in datas.datasTimeline.changelogs.date.length" :key="index">
        <div v-if="datas.datasTimeline.changelogs.date[index] != ''" class="timeline__grid">
          <div class="changelog__date">
            {{ datas.datasTimeline.changelogs.date[ index - 1 ] }}
          </div>
          <div v-if="index-1 == 0" class="pulse__circle changelog__circle"></div>
          <div v-else :class="index == datas.datasTimeline.changelogs.date.length ? 'changelog__road changelog__road--last' : 'changelog__road'"></div>
          <div class="changelog__content">
            <CustomTweet v-bind:changelog="datas.datasTimeline.changelogs" v-bind:tweet="[index - 1, datas.datasTimeline.tweets]"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomTweet from "../components/CustomTweet";
import datasTimeline from "../assets/json/datas-timeline.json"


export default {
  name:       "Timeline",
  metaInfo:   {
    title: 'Timeline'
  },
  components: {
    CustomTweet
  },
  data() {
    return {
      datas: {
        datasTimeline
      }
    }
  },
  mounted() {
    this.$parent.$parent.$parent.cursorEmoji(document.querySelectorAll( '.link' ));
  }

}
</script>

<style scoped lang="scss">
.timeline__wrapper {
  max-width: 700px;
  margin: 0 auto;
}

.timeline {
  margin-bottom: 48px;
}

.timeline__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 64px;
}

.changelog__date {
  font-size: 14px;
  line-height: 20px;
  text-align: right;
  min-width: 100px;
}

.changelog__circle {
	margin-top: 4px;
}

.changelog__road {
  position: relative;
  width: 100%; //before + box-shadow

  &::before {
    content: "";
    position: absolute;
    top: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 13px;
    height: 13px;
    background: $ft-light-grey-bg;
    border: 2px solid $ft-light-grey;
    border-radius: 50%;
    box-shadow: $ft-light-grey-bg 0px 0px 0px 0px, #ebebeb 0px 0px 0px 8px, $ft-light-grey-bg 0px 0px 0px 0px;
    z-index: 1;
  }

  &:not(.changelog__road--last) {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 1px;
      height: calc(100% + 48px);
      background: rgba($ft-light-grey, .2);
    }
  }
}

@media (max-width: $mobileMin) {
  .timeline__wrapper {
    max-width: 100%;
    padding: 0px 5px;
  }

  .timeline {
    position: relative;
  }

  .timeline--first {
  }

  .timeline__grid {
    display: flex;
    flex-direction: column;
    padding-left: 32px;
  }

  .pulse__circle {
    margin: 0px auto 0 0;
    position: absolute;
    left: 0;
    top: 0;
    transform: translateX(-50%);
  }

  .changelog__date {
    width: fit-content;
    width: -moz-fit-content;
    margin: -2px auto 0 0;
    text-align: left;
    min-width: auto;
  }

  .changelog__road {
    position: absolute;
    height: 100%;
    left: 17px;
    left: 0px;
    width: auto;

    &::before {
      box-shadow: none;
      top: 0px;
      background: $ft-grey-bg;
    }
  }
}

</style>
