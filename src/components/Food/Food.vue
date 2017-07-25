<template>
	<transition name="move" tag="div">
		<div class="food" v-show="showFlag"　ref="foodscroll">
			<div class="wrapper">
				<div class="food-content">
					<div class="image-wrapper">
						<img :src="food.image">
						<div class="back" @click="hide">
							<i class="icon-arrow_lift"></i>
						</div>
					</div>
					<div class="header">
						<h1 class="title">{{ food.name }}</h1>
						<div class="food-detail">
								<span class="sell-count">月售{{ food.sellCount }}份</span><span class="rating">好评率{{ food.rating }}%</span>
						</div>
						<div class="food-price">
							<span class="new">¥&nbsp;{{ food.price }}</span><span class="old" v-show="food.oldPrice">¥&nbsp;{{ food.oldPrice }}</span>
						</div>
					</div>
					<div class="cartcontrol-wrapper">
						<cartControl :food="food" v-on:cart-add="cartAdd"></cartControl>
					</div>
					<transition name="fade" tag="div">
						<div class="buy" v-show="!food.count || food.count === 0" @click="addFirst">
							<span class="add-to-cart">加入购物车</span>
						</div>
					</transition>
				</div>
				<split class="split" v-show="food.info"></split>
				<div class="introduce" v-show="food.info">
					<h1 class="title">商品介绍</h1>
					<p class="info">{{ food.info }}</p>
				</div>
				<split class="split" v-show=food.info></split>
				<div class="ratings">
					<h1 class="title">商品评价</h1>
					<ratingselect :ratings="food.ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc" ref="ratingSelect" v-on:select-all="showAll" v-on:select-pos="showPos" v-on:select-neg="showNeg" v-on:select-content="showContent"></ratingselect>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import BScroll from 'better-scroll';
	import Vue from 'vue';
	import cartControl from '@/components/cartControl/cartControl.vue';
	import split from '@/components/Split/Split.vue';
	import ratingselect from '@/components/ratingSelect/ratingSelect.vue';

	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;

	export default {
		data () {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: false,
				desc: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			};
		},
		props: {
			food: {
				type: Object
			},
			cartAdd: {
				type: Function
			}
		},
		methods: {
			show () {
				if (this.showFlag) {
					return;
				}
				this.showFlag = true;
				this.$nextTick(() => {
					if (!this.scroll) {
						this.scroll = new BScroll(this.$refs.foodscroll, {
							click: true,
							probeType: 3
						});
						this.$refs.ratingSelect.formatTime();
					} else {
						this.scroll.refresh();
					}
				});
			},
			hide () {
				this.showFlag = false;
			},
			addFirst (event) {
				if (!event._constructed) {
					return;
				}
				this.$emit('cart-add', event.target);
				Vue.set(this.food, 'count', 1); // Vue实例给对象添加属性并可以被watcher监测的话需要使用Vue.set
			},
			showAll () {
				this.selectType = ALL;
				this.scroll.refresh();
			},
			showPos () {
				this.selectType = POSITIVE;
				this.scroll.refresh();
			},
			showNeg () {
				this.selectType = NEGATIVE;
				this.scroll.refresh();
			},
			showContent () {
				this.onlyContent = !this.onlyContent;
				// if (this.onlyContent) {
				// 	this.$refs.ratingSelect.ratings.forEach((rating) => {
				// 		if (!rating.text) {
				// 			this.$refs.ratingSelect.contentFlag = false;
				// 		}
				// 	});
				// }
			}
		},
		components: {
			cartControl,
			split,
			ratingselect
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'

	.move-enter-active
		transition all 0.2s
	.move-leave-active
		transition all 0.2s
	.move-enter, .move-leave-to
		transform: translate(100%, 0)
	.food
		position: fixed
		left: 0
		top: 0
		bottom: 48px
		z-index: 300
		overflow: hidden
		width: 100%
		background: #fff
		.wrapper
			.food-content
				position: relative
				.image-wrapper
					position: relative
					width: 100%
					height: 0	/* 将image-wrapper高度设定为0, 并设置padding-top:10%, margin和padding始终以父元素的宽度作为 */
					padding-top: 100%	/*  */
					box-sizing: border-box
					img
						position: absolute
						top: 0
						left: 0
						width: 100%
						height: 100%
					.back
						position: absolute
						top: 10px
						left: 0
						.icon-arrow_lift
							display: block
							padding: 10px
							font-size: 20px
							color: #fff
				.header
					padding: 18px
					background: #fff
					.title
						margin-bottom: 8px
						line-height: 14px
						font-size: 14px
						font-weight: 700
						color: rgb(7, 17, 27)
					.food-detail
						margin-bottom: 18px
						.sell-count, .rating
							line-height: 10px
							font-size: 10px
							color: rgb(147, 153, 159)
						.sell-count
							margin-right: 12px
					.food-price
						height: 24px
						line-height: 24px
						.new
							margin-right: 12px
							font-size: 14px
							font-weight: 700
							color: rgb(240, 20, 20)
						.old
							font-size: 10px
							text-decoration: line-through
							color: rgb(147, 153, 159)
				.cartcontrol-wrapper
					position: absolute
					right: 12px
					bottom: 12px
				// .fade-enter-active
				// 	transition all 0.4s
				// .fade-enter, .fade-leave-to
				// 	opacity: 1
				.buy
					position: absolute
					right: 18px
					bottom: 18px
					z-index 10
					height: 24px
					line-height: 24px
					padding: 0 12px
					box-sizing: border-box
					border-radius: 12px
					color: #fff
					background: rgb(0,160,220)
					font-size: 10px
			.introduce
				margin: 18px
				.title
					line-height: 24px
					font-size: 12px
					font-weight: 700
					color: #000
				.info
					padding: 6px 8px 0 8px
					line-height: 24px
					font-size: 12px
					color: rgb(77, 85, 93)
			.ratings
				.title
					margin: 18px
					line-height: 24px
					font-size: 12px
					font-weight: 700
					color: #000
				
</style>