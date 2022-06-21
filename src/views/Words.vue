<template>
	<div class="content__wrapper content__wrapper--words">
		<div class="words__wrapper">
			<div class="words" v-for="n in 4" :key="n">
				<div class="word" v-for="index in words.words.length" :key="index">
					{{ words.words[ getRandomNumber( 0, words.words.length ) ] }}
				</div>
			</div>

		</div>
	</div>
</template>

<script>
import words from "../assets/json/words.json";


export default {
	name:     'Words',
	metaInfo: {
		title: 'Words'
	},
	data() {
		return {
			words
		}
	},
	components: {},
	mounted() {
	},
	methods: {
		getRandomNumber( min, max ) {
			min = Math.ceil( min );
			max = Math.floor( max );
			return Math.floor( Math.random() * ( max - min ) ) + min;
		}
	}
}
</script>

<style lang="scss" scoped>
.content__wrapper--words {
	max-width: none;
	padding: 0;
	margin: 0;
	position: relative;
	overflow: hidden;
}

.words__wrapper {
	//display: flex;
	//justify-content: flex-start;
	//align-items: center;
	//flex-wrap: wrap;
	//column-gap: 20px;

	display: grid;
	grid-template-rows: repeat(4, 1fr);
	row-gap: 20px;
	justify-content: center;
	align-items: center;

	padding: 40px 0;
	width: 200%;
	height: 100%;
	position: absolute;
	inset: 0;
	//animation: marquee 15s linear infinite;
	//transform: translate3d(-25%, 0, 0);
}

.words {
	display: flex;
	justify-content: center;
	align-items: center;
	column-gap: 20px;
	height: 100%;
}

.word {
	display: flex;
	justify-content: center;
	align-items: center;
	font: 500 50px $magnat-head;
	//color: $ft-black;
	width: 400px;
	padding: 5px 10px;
	height: 100%;
	text-align: center;
	background: $ft-icons-gradient;
	border-radius: 16px;
}

@keyframes marquee {
	0% {
		transform: translate3d(0, 0, 0);
	}
	100% {
		transform: translate3d(-50%, 0, 0);
	}
}

</style>
