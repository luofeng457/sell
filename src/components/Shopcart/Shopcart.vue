<template>
	<div class="shopcart">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper" @click="showCart">
					<div class="logo" :class="{'highlight': totalCount}">
						<i class="icon-shopping_cart" :class="{'highlight': totalCount}"></i>
					</div>
					<div class="num" v-show="totalCount">{{ totalCount }}</div>
				</div>
				<div class="price" :class="{'highlight': totalCount}">
					<span>¥&nbsp;{{ totalPrice }}</span>
				</div>
				<div class="desc">另需配送费&nbsp;¥&nbsp;{{ merchants.deliveryPrice }}元</div>
			</div>
			<div class="content-right"  :class="{'delivery': payment}">
				<div class="pay" :class="{'delivery': payment}">{{ payDesc }}</div>
			</div>
		</div>
		<div class="ball-container">
			<transition-group
				name="ballDrop"
				tag="div"
				v-on:before-enter="beforeEnter"
				v-on:enter="enter"
				v-on:after-enter="afterEnter"
				>
				<div v-for="(ball,index) in balls" v-show="ball.show" :key="index" class="ball">
					<div class="inner inner-hook"></div>
				</div>
			</transition-group>
		</div>
		<div class="cart-detail" v-show="toggleShow">
			<div class="content">
				<div class="header">
					<span class="title">购物车</span>
					<span class="clear"><span @click="clearMenu">清空</span></span>
				</div>
				<ul ref="listContent" class="items">
					<li class="item" v-for="food in selectFoods">
						<span class="food-name">{{ food.name }}</span>
						<span class="foodPrices">&nbsp;¥&nbsp;{{ food.count * food.price }}</span>
						<span class="num-control"><cartControl :food="food"></cartControl></span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	// 引入better-scroll实现购物车详情中的联动
	import BScroll from 'better-scroll';
	import cartControl from '@/components/cartControl/cartControl.vue';

	export default {
		data () {
			return {
				payment: false,
				toggleShow: false,
				balls: [
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					}
				],
				dropBalls: []
			};
		},
		props: {
			selectFoods: {
				type: Array,	// 存储每个选择的food
				default () {
					return [];
				}
			},
			merchants: {
				type: Object
			},
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			}
		},
		computed: {
			totalPrice () {
				let total = 0;
				// this.selectFoods = [];
				this.selectFoods.forEach((food) => {
					total += food.price * food.count;
				});
				return total;
			},
			totalCount () {
				let count = 0;
				this.selectFoods.forEach((food) => {
					count += food.count;
				});
				return count;
			},
			payDesc () {
				if (this.totalPrice === 0) {
					this.payment = false;
					return `¥ ${this.minPrice}元起送`;
				} else if (this.totalPrice < this.minPrice) {
					this.payment = false;
					let diff = this.minPrice - this.totalPrice;
					return `还差 ¥ ${diff}元起送`;
				} else {
					this.payment = true;
					return '去结算';
				}
			},
			priceMessage () {
				if (this.totalPrice === 0) {
					return '清算';
				}
			}
		},
		methods: {
			showCart () {
				if (!this.totalPrice) {
					this.toggleShow = false;
				} else {
					this.toggleShow = !this.toggleShow;
				}
				if (this.toggleShow) {
					this.$nextTick(() => {
						if (!this.scroll) {
							this.scroll = new BScroll(this.$refs.listContent, {
								click: true
							});
						} else {
							this.scroll.refresh();
						}
					});
				}
			},
			clearMenu () {
				this.selectFoods.forEach((food) => {
					food.count = 0;
					this.toggleShow = false;
				});
			},
			drop (el) {
				for (let i = 0; i < this.balls.length; i++) {
					let ball = this.balls[i];
					if (!ball.show) {
						ball.show = true;
						ball.el = el;
						this.dropBalls.push(ball);
						return;
					}
				}
			},
			beforeEnter (el) {
				let count = this.balls.length;
				while (count--) {
					let ball = this.balls[count];
					if (ball.show) {
						let rect = ball.el.getBoundingClientRect();	// 返回元素大小相对视口的偏移
						let x = rect.left - 20;
						let y = -(window.innerHeight - rect.top - 46);
						el.style.display = '';
						el.style.webKitTransform = `translate(0,${y}px)`;
						el.style.transform = `translate(0,${y}px)`;
						let inner = el.getElementsByClassName('inner-hook')[0];
						inner.style.webKitTransform = `translate(${x}px,0)`;
						inner.style.transform = `translate(${x}px,0)`;
					}
				}
			},
			enter (el) {
				/* eslint-disable no-unused-vars */
				let rf = el.offsetHeight; // 触发重绘
				this.$nextTick(() => {
					el.style.webKitTransform = 'translate(0,0)';
					el.style.transform = 'translate(0,0)';
					let inner = el.getElementsByClassName('inner-hook')[0];
					inner.style.webKitTransform = 'translate(0,0)';
					inner.style.transform = 'translate(0,0)';
				});
			},
			afterEnter (el) {
				let ball = this.dropBalls.shift();
				if (ball) {
					ball.show = false;
					el.style.display = 'none';
				}
			}
		},
		components: {
			cartControl
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'

	.shopcart
		position: fixed
		left: 0
		bottom: 0
		z-index: 50	
		width: 100%
		height: 48px
		font-size: 0
		background: #141d27
		.content
			display: flex
			background: #141d27
			.content-left
				flex: 1
				.logo-wrapper
					display: inline-block
					vertical-align: top
					position: relative
					top: -10px
					margin: 0 12px
					padding: 6px
					width: 56px
					height: 56px
					box-sizing: border-box
					border-radius: 50%
					background: #141d27
					.logo
						width: 100%
						height: 100%
						border-radius: 50%
						text-align: center
						background: #2b343c
						&.highlight
							background: rgb(0, 160, 220)							
						.icon-shopping_cart
							line-height: 44px
							font-size: 24px
							color: rgba(255,255,255,.4)
							&.highlight
								color: #fff
					.num
						position: absolute
						top: 0
						right: 0
						height: 16px
						width: 24px
						line-height 16px
						text-align: center
						border-radius: 16px
						font-size: 9px
						font-weight: 700
						color: #fff
						background-color: #f00
						box-shadow 0 4px 8px rgba(0,0,0,.4)
				.price
					display: inline-block
					vertical-align: top
					margin: 12px 0
					padding-right: 12px
					box-sizing: border-box
					border-right: 1px solid rgba(255,255,255,.1)
					line-height: 24px
					font-size: 16px
					font-weight: 700
					color: rgba(255,255,255,.4)
					$.highlight
						color: #fff;
				.desc
					display: inline-block
					vertical-align: top
					margin: 12px
					box-sizing: border-box
					line-height: 24px
					font-size: 10px
					color: rgba(255,255,255,.4)
					
			.content-right
				flex 0 0 105px
				width: 105px
				background: #2b343b
				&.delivery
					background: #00b43c
				.pay
					height: 48px
					line-height: 48px
					text-align: center
					font-size: 12px
					font-weight: 700
					color: rgba(255,255,255,.4)
					&.delivery
						color: #fff
		.ball-container
			.ballDrop-enter-active
				transition all .5s  cubic-bezier(.44, -0.56, .91, .63)
			.ball
				position: fixed
				left: 32px
				bottom: 22px
				z-index: 200
				.inner
					width: 16px
					height: 16px
					border-radius: 50%
					background: rgb(0,160,220)
					transition all .5s linear
		.cart-detail
			position: fixed
			left: 0
			top: 0
			width: 100%
			z-index: -1
			// height: calc(100% - 65px)
			height: 100%
			font-size: 0
			background: rgba(7, 17, 27, 0.8)
			.content
				display: flex
				position: absolute
				flex-direction: column
				left: 0
				bottom: 0
				// padding-bottom: 60px
				box-sizing: border-box
				width: calc(100% + 5px)	/* 隐藏滚动条 */
				max-height: 306px
				overflow: auto
				background: white
				.header
					display: flex
					flex: none
					width: 100%
					height: 40px
					padding: 0 18px
					box-sizing: border-box
					background: #f3f5f7
					border-bottom: 2px solid rgba(7, 17, 27, 0.1)
					.title
						flex: 1
						line-height: 40px
						font-size: 14px
						color: rgb(7, 17, 27)
					.clear
						flex: 1
						line-height: 40px
						font-size: 12px
						text-align: right
						color: rgb(0, 160, 220)
				.items
					position: relative
					width: 100%
					box-sizing: border-box
					height: 100%
					overflow: auto
					background: rgba(255,255,255,0)
					backdrop-filter: blur(10px)
					.item
						display: block
						height: 48px
						// width: 100%
						// box-sizing: border-box
						padding: 0 18px
						border-1px(rgba(7, 17, 27, 0.1))
						background: white
						&:last-child
							// margin-bottom: 60px
							
						.food-name
							display: inline-block
							vertical-align: top
							padding-top: 12px
							line-height: 24px
							font-size: 14px
							font-weight: 700
							color: rgb(7, 17, 27)
						.foodPrices
							position: absolute
							right: 102px
							display: inline-block
							vertical-align top
							padding-top: 12px
							line-height: 24px
							text-align: right
							font-size: 10px
							font-weigth: 700
							color: rgb(240, 20, 20)
						.num-control
							position: absolute
							right: 12px
							display: inline-block
							vertical-align: top
							padding-top: 6px
							line-height: 24px
							font-size: 24px
							font-weight: 700
							color: rgb(7, 17, 27)								

</style>