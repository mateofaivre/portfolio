<template>
  <div class="custom__tweet">
    <div class="changelog__text" v-html="changelog.text[ tweet[ 0 ] ]">
    </div>
    <div class="tweet" v-if="tweet[1].user.username[tweet[0]] != '' || tweet[ 1 ].content.text[ tweet[ 0 ] ] != ''">
      <div class="tweet--top">
        <div class="tweet__user">
          <div v-if="tweet[1].user.pp[tweet[0]] != ''" class="tweet__user--pp">
            <a :href="tweet[1].user.profileLink[tweet[0]]" class="tweet__pp__link " target="_blank" rel="nofollow noopener noreferrer">
              <img :src="tweet[1].user.pp[tweet[0]]" class="pp" alt="">
            </a>
          </div>
          <div class="tweet__user--names">
            <div v-if="tweet[1].user.name[tweet[0]] != ''" class="tweet__user--name">
              {{ tweet[ 1 ].user.name[ tweet[ 0 ] ] }}
            </div>
            <div v-if="tweet[1].user.username[tweet[0]] != ''" class="tweet__user--username">
              @{{ tweet[ 1 ].user.username[ tweet[ 0 ] ] }}
            </div>
          </div>
        </div>
        <a v-if="tweet[1].tweet.link[tweet[0]] != ''" :href="tweet[1].tweet.link[tweet[0]]" class="tweet--link" target="_blank" rel="nofollow noopener noreferrer">
          <TwitterLogo class="twitter__logo"/>
        </a>
      </div>
      <div v-if="tweet[ 1 ].content.text[ tweet[ 0 ] ] != ''" class="tweet__content" v-html=" tweet[ 1 ].content.text[ tweet[ 0 ] ]">
      </div>
      <div class="tweet__media" v-if="tweet[1].content.mediaType[tweet[0]] != ''">
        <img v-if="tweet[1].content.mediaType[tweet[0]] == 'img'" :src="'/assets/img/media/' + tweet[1].content.mediaUrl[tweet[0]]" class="tweet__media--img">
        <video v-else muted="" autoplay="" loop="" controls="" class="tweet__media--video">
          <source :src="'/assets/img/media/' + tweet[1].content.mediaUrl[tweet[0]]" type="video/mp4">
        </video>
      </div>
      <div v-if="tweet[ 1 ].tweet.date[ tweet[ 0 ] ] != ''" class="tweet--bottom">
        {{ tweet[ 1 ].tweet.date[ tweet[ 0 ] ] }}
      </div>
    </div>
  </div>
</template>

<script>
import TwitterLogo from "../assets/twitter-full.svg";


export default {
  name:       "CustomTweet",
  components: {
    TwitterLogo
  },
  props:      {
    tweet:     {},
    changelog: {}
  },
  mounted() {
  },
  methods: {}
}
</script>

<style scoped lang="scss">

.custom__tweet {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  row-gap: 20px;
  width: 440px;
}

.changelog__text {
  font-size: 16px;
  line-height: 26px;
}

.tweet {
  background: none;
  border: 1px solid rgba($ft-light-grey, .2);
  border-radius: 8px;
  width: 100%;
  position: relative;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.tweet--top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.tweet__user {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 12px;
  margin-bottom: 20px;
}

.tweet__user {
  display: flex;
  justify-content: center;
  align-items: center;
}

.tweet__user--pp {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid $ft-border-grey;
}

.tweet__user--name {
  font-size: 14px;
  font-weight: 500;
  color: $ft-black;
}

.tweet__user--username {
  font-size: 12px;
  line-height: 16px;
  opacity: .8;
}

.tweet--link {
  text-decoration: none;
  transition: color .3s ease-out;
  width: 24px;
  height: 24px;
}

.tweet__content {
  font-size: 14px;
  line-height: 24px;
  margin-bottom: 20px;
}

.tweet__media {
  width: 100%;
  margin-bottom: 20px;
}

.tweet__media--img, .tweet__media--video {
  border-radius: 6px;
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;
}

.tweet--bottom {
  align-self: flex-end;
  color: $ft-light-grey;
  opacity: .8;
  font-size: 12px;
  line-height: 16px;
}

@media (max-width: $mobileMin) {
  .custom__tweet {
    width: 100%;
  }

  .tweet {
    padding: 16px;
  }
}

</style>
