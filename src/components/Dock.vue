<template>
	<div class="dock-wrapper">
		<div class="dock">
			<component class="dock__item" v-for="index in datas.datasDockIcons.name.length" :key="index" :is="datas.datasDockIcons.slug[ index-1 ][1] === true ? 'router-link' : 'a'" :to="datas.datasDockIcons.slug[ index-1 ][1] === true ? { path: datas.datasDockIcons.slug[ index-1 ][0] + typeHidden } : null" :href="datas.datasDockIcons.slug[ index-1 ][1] !== true ? datas.datasDockIcons.slug[ index-1 ][0] : null" :target="datas.datasDockIcons.slug[ index-1 ][1] === true ? null : '_blank' "
			>
				<span class="dock__item--inner">
					<span class="dock__item--name">{{ datas.datasDockIcons.name[ index - 1 ] }}</span>
					<span class="dock__item--ico" @click="clickIcon">
					<component :is="datas.datasDockIcons.icon[index-1]" class="dock--item--svg"></component>
				</span>
				</span>
			</component>

		</div>
	</div>
</template>

<script>
import datasDockIcons from "../assets/json/datas-dock-icons.json"
import Home from '../assets/home.svg';
import Projects from '../assets/projects.svg';
import Timeline from '../assets/timeline.svg';
import Twitter from '../assets/twitter.svg';
import Mail from '../assets/mail.svg';
import Github from '../assets/github.svg';

import { gsap } from "gsap";


export default {
	name: "Dock",
	data() {
		return {
      typeHidden: 'zz',
      datas: {
				datasDockIcons
			}
		}
	},
	components: {
		Home, Projects, Timeline, Twitter, Mail, Github
	},
	mounted() {
   this.typeHidden = this.checkHidden();
		this.TransformOrigins = {
			"-1": "right",
			0:    "center",
			1:    "left"
		};

		this.scale = 1;

		this.$wrapper = document.querySelector( '.dock' )
		this.root     = this.$wrapper;
		this.icons    = Array.from( this.$wrapper.children );
		if ( this.icons.length === 0 ) {
			alert( "zzz" )
		}
		this.iconSize = this.icons[ 0 ].offsetWidth;

		const isTouchDevice = this.$parent.$parent.isTouchDevice();
		if ( isTouchDevice ) {
			return;
		}
		this.$wrapper.addEventListener( "mousemove", this._handleMouseMove.bind( this ) );
		this.$wrapper.addEventListener( "mouseleave", this._handleMouseLeave.bind( this ) );
		this.$wrapper.addEventListener( "mouseenter", this._handleMouseEnter.bind( this ) );

	},
	methods: {
    checkHidden() {
      let typeHidden = "";
      if (this.$route.query.type == 'hidden') {
        typeHidden = '?type=hidden'
      }
      return typeHidden;
    },
		_between( val, min, max ) {
			return Math.max( min, Math.min( val, max ) );
		},
		_scaling( d ) {
			return this._between( -0.2 * Math.pow( d, 2 ) + 1.05, 0, 1 );
		},
		_handleMouseMove( e ) {
			this.mousePosition = this._between( ( e.clientX - this.root.offsetLeft ) / this.iconSize, 0, this.icons.length );
			this._scaleIcons();
			let children     = this.$wrapper.children;
			let totalWidth   = 0;
			let initialWidth = this.$wrapper.getBoundingClientRect().width

			for ( let i = 0; i < children.length; i++ ) {
				totalWidth += parseInt( children[ i ].getBoundingClientRect().width, 10 );
			}

			const scaleBetween = totalWidth / initialWidth;
			this.$wrapper.style.setProperty( "--scale-bg", scaleBetween * 1.06 );

			const widthWrapperAfter = this.$wrapper.getBoundingClientRect().width * scaleBetween
			const leftWrapperAfter  = ( window.innerWidth / 2 ) - ( widthWrapperAfter / 2 )

			const offsetBetween = leftWrapperAfter - this.$wrapper.children[ 0 ].getBoundingClientRect().left

			this.$wrapper.style.setProperty( "--translate-bg", `${-offsetBetween}px` );

		},
		_scaleIcons() {
			const selectedIndex = Math.floor( this.mousePosition );
			const centerOffset  = this.mousePosition - selectedIndex - 0.5;
			let baseOffset      = this._scaleFromDirection(
				selectedIndex,
				0,
				-centerOffset * this.iconSize
			);
			let offset          = baseOffset * ( 0.5 - centerOffset );
			for ( let i = selectedIndex + 1; i < this.icons.length; i++ ) {
				offset += this._scaleFromDirection( i, 1, offset );
			}
			offset = baseOffset * ( 0.5 + centerOffset );
			for ( let i = selectedIndex - 1; i >= 0; i-- ) {
				offset += this._scaleFromDirection( i, -1, -offset );
			}

		},
		_scaleFromDirection( index, direction, offset ) {
			const center              = index + 0.5;
			const distanceFromPointer = this.mousePosition - center;
			const scale               = this._scaling( distanceFromPointer ) * this.scale;
			const icon                = this.icons[ index ];

			icon.style.setProperty(
				"transform",
				`translateX(${offset}px) scale(${scale + 1})`
			);
			icon.style.setProperty(
				"transform-origin",
				`${this.TransformOrigins[ direction.toString() ]} bottom`
			);
			return scale * this.iconSize;
		},
		_handleMouseLeave() {
			this.root.classList.add( "animated" );

			this.icons.forEach( ( icon ) => {
				icon.style.removeProperty( "transform" );
				icon.style.removeProperty( "transform-origin" );
			} );
			this.$wrapper.style.setProperty( "--scale-bg", 1 );
			this.$wrapper.style.setProperty( "--translate-bg", 0 );
		},
		_handleMouseEnter() {
			this.root.classList.add( "animated" );
			window.setTimeout( () => {
				this.root.classList.remove( "animated" );
			}, 100 );
		},

		clickIcon( e ) {
			let icon = e.currentTarget.parentElement

			const iconTransform  = window.getComputedStyle( icon )
			const iconTranslateY = new DOMMatrix( iconTransform.transform ).m42

			if ( iconTranslateY == 0 ) {
				this.tlClick = gsap.timeline( { paused: true } )
				this.tlClick.to( icon,
					{
						y:          -25,
						duration:   0.2,
						ease:       "power1.out",
						repeat:     1,
						yoyo:       true,
						yoyoEase:   true,
						onComplete: () => {
							// if ( !icon.matches( ':hover' ) ) { //pas survolé à la fin du clic
							// 	icon.style.removeProperty( "transform" );
							// 	icon.style.removeProperty( "transform-origin" );
							// }
						}
					}
				)

				this.tlClick.play();
			}


		}
	}
}
</script>

<style scoped lang="scss">

@keyframes jumpIcon {
	0% {
		margin-top: 0px;
	}
	45% {
		margin-top: -60px;
	}
	90% {
		margin-top: 2px;
	}
	100% {
		margin-top: 0px;
	}
}

@keyframes jumpName {
	0% {
		opacity: .9;
		transform: translateY(0px);
	}
	45% {
		transform: translateY(-30px);
	}
	90% {
		transform: translateY(2px);
	}
	100% {
		transform: translateY(0px);
		opacity: 1;
	}
}


/* ----- New ---- */
.dock-wrapper {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 20px;
	display: flex;
	justify-content: center;
	z-index: 1000000;
}

.dock {
	display: flex;
	padding: 0px 5px;
	border-radius: 20px;
	position: relative;

	--scale-bg: 1;
	--translate-bg: 0px;

	&::after {
		content: "";
		position: absolute;
		inset: 0;
		background: rgba(255, 255, 255, 0.96);
		box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
		backdrop-filter: blur(100px) saturate(400%) brightness(100%);
		border: 1px solid hsl(0 0% 0% / 0.071);
		border-radius: 20px;
		z-index: -1;
		transition: transform 0.1s $easeOutQuad;
		transform-origin: center center;
		transform: translateX(var(--translate-bg)) scaleX(var(--scale-bg));
	}
}

.dock__item {
	width: 58px;
	height: 68px;
	display: flex;
	align-items: center;
	justify-content: center;
	transform-origin: center bottom;
	background: transparent;
	border: none;
	padding: 10px 5px;
	margin: 0;
	position: relative;

	&.router-link-exact-active {
		.dock__item--inner::after {
			transition: opacity .3s $easeOutQuad;
			opacity: 1;
		}
	}
}

.dock__item--inner {
	width: 100%;
	height: 100%;
	position: relative;

	&::after {
		position: absolute;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: rgb(219, 219, 219);
		transition: opacity .3s $easeOutQuad, transform .3s $easeOutQuad;
		content: "";
		left: 50%;
		transform: translateX(-50%);
		bottom: -6px;
		opacity: 0;
	}
}

.dock__item--ico {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: $ft-light-grey;
	transition: 0.2s $easeOutQuad;
	background: $ft-icons-gradient;
	border-radius: 23%;
}

.dock__item--name {
	position: absolute;
	top: -25px;
	background-color: rgba($ft-white, 0.95);
	box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
	color: $ft-light-grey;
	padding: 2px 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 5px;
	visibility: hidden;
	transition: opacity .3s $easeOutQuad;
	font-size: 9px;
	user-select: none;
}

.dock__item {
	@media (min-width: $mobileMin) {
		&:hover {
			.dock__item--name {
				visibility: visible !important;
			}
		}
	}
}

.dock.animated .dock__item {
	transition: 0.2s $easeOutQuad;
	transition-property: transform, transform-origin;
}

.dock--item--svg {
	width: 55%;
	height: auto;
}

</style>
