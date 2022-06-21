<template>
	<div class="projects__accordion--specs__wrapper">
		<!--    <div class="projects__accordion&#45;&#45;specs__inner projects__accordion&#45;&#45;roles__wrapper">-->
		<!--      <div class="projects__accordion&#45;&#45;specs__title projects__accordion&#45;&#45;roles__title">Role</div>-->
		<!--      <div class="projects__accordion&#45;&#45;specs projects__accordion&#45;&#45;roles">-->
		<!--        <span class="projects__accordion&#45;&#45;spec projects__accordion&#45;&#45;role">Web Developer</span>-->
		<!--      </div>-->
		<!--    </div>-->
		<div class="projects__accordion--specs__inner projects__accordion--technos__wrapper">
			<!--      <div class="projects__accordion&#45;&#45;specs__title projects__accordion&#45;&#45;technos__title">Technologies</div>-->
			<div class="projects__accordion--specs projects__accordion--technos">
				<span class="projects__accordion--spec projects__accordion--techno" v-for="index in datas.specs.spec[indexSpecs].length" :key="index">{{ datas.specs.spec[ indexSpecs ][ index - 1 ] }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import specs from "../assets/json/specs.json";


export default {
	name:  "Specs",
	props: [ 'indexSpecs' ],
	data() {
		return {
			datas: {
				specs
			}
		}
	}
}
</script>

<style scoped lang="scss">
.projects__accordion--specs__wrapper {
	align-self: flex-start;
	margin: 10px 0px 10px 0px;
	align-self: flex-start;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	row-gap: 10px;
}

.projects__accordion--specs__inner {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
}

.projects__accordion--specs {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 8px;
	flex-wrap: wrap;
	max-width: 380px;
}

.projects__accordion--specs__title {
	font: 400 16px/24px $magnat-head;
	color: $ft-black;
	margin-bottom: 10px;
}

.projects__accordion--spec {
	//border: 1px solid $ft-grey;
	background-color: $ft-light-grey-bg;
	border-radius: 25px;
	padding: 8px 15px;
	line-height: 14px;
}

@media (max-width: $mobileMax) {
	.projects__accordion--specs__wrapper {
		margin: 15px 0px 5px 0px;
	}

	.projects__accordion--specs {
		max-width: 100%;
		gap: 6px;
	}

	.projects__accordion--spec {
		font-size: 12px;
		padding: 6px 12px;
	}
}

</style>
