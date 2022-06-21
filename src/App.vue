<template>
	<v-app>
		<!--    <LoadingScreen :isLoading="isLoading"/>-->
		<!--    <div v-if="!isLoading">-->
		<v-main>
			<transition name="fade" mode="out-in">
				<router-view/>
			</transition>
		</v-main>
		<Dock/>
		<!--    </div>-->

	</v-app>
</template>

<script>
import Dock from "./components/Dock.vue";
import LoadingScreen from "./components/LoadingScreen.vue";


export default {
	name:       'App',
	metaInfo:   {
		// if no subcomponents specify a metaInfo.title, this title will be used
		title: '🪄',
		// all titles will be injected into this template
		titleTemplate: '%s | Portfolio'
	},
	components: {
		LoadingScreen,
		Dock
	},
	data:       () => ( {
		isLoading: true
	} ),
	mounted() {

	},
  watch:{
    $route (){
      this.keepQuery();
    }
  },
  methods: {
    keepQuery() {
      console.log(this.$router)
    },
		isTouchDevice() {
			return ( ( 'ontouchstart' in window ) || ( navigator.maxTouchPoints > 0 ) || ( navigator.msMaxTouchPoints > 0 ) );
		},
		cursorEmoji( links ) {
			links.forEach(
				( link ) => {
					link.style.cursor = `url(/assets/emojis/${link.getAttribute( "data-emoji" )}.svg) 0 0, auto`;
				}
			)
		}
	}
};
</script>

<style lang="scss">
html {
	scroll-behavior: smooth;
}

body {
	.v-application {
		&#app {
			font: normal 16px $magnat-text;
			background: $ft-grey-bg;
			color: $ft-grey-text;
		}

	}
}

#loading {
	background-color: #63ab97;
	color: white;
	font-size: 32px;
	padding-top: 10vh;
	height: 100vh;
	text-align: center;
}

img[lazy=loading] {
	opacity: 0;
}

img[lazy=error] {
}

img[lazy=loaded] {
	opacity: 1;
}

.lazy {
	opacity: 0;
	transition: opacity .2s $easeOutQuad;
}


.content__wrapper {
	max-width: 740px;
	margin: 0 auto;
	padding: 120px 16px 160px 16px;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity .25s $easeOutQuad;
}

.fade-enter,
.fade-leave-active {
	opacity: 0
}

.link {
	color: $ft-black;
	font-weight: 500;
	border-bottom: 1px solid hsl(0 0% 88.7%);
	text-decoration: none;
	padding: 12px 0px 3px 0px;
	margin: 0px 1px 0px 1px;
	position: relative;
	transition: cursor .3s $easeOutQuad;
}

.pulse__circle {
	position: relative;
	width: 15px;
	height: 15px;
	margin: 0 auto;

	&:before {
		content: '';
		position: relative;
		display: block;
		width: 200%;
		height: 200%;
		box-sizing: border-box;
		margin-left: -50%;
		margin-top: -50%;
		border-radius: 45px;
		background-color: $ft-green-current;
		animation: pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
	}

	&:after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		display: block;
		width: 100%;
		height: 100%;
		background-color: $ft-green-current;
		border-radius: 15px;
		box-shadow: 0 0 8px rgba($ft-green-current, .3);
		animation: pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -.4s infinite;
	}
}

@keyframes pulse-ring {
	0% {
		transform: scale(.33);
	}
	80%, 100% {
		opacity: 0;
	}
}

@keyframes pulse-dot {
	0% {
		transform: scale(.8);
	}
	50% {
		transform: scale(1);
	}
	100% {
		transform: scale(.8);
	}
}

@media (max-width: $mobileMin) {
	.content__wrapper {
		padding: 50px 16px 120px 16px;
	}

	.content__wrapper--projects {
		padding-left: 12px;
		padding-right: 12px;
	}
}

</style>
