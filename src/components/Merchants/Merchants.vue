<template>
	<transition name="fade-in">
		<div class="merchants" ref="merchants">
			<div class="wrapper">
				<div class="merchants-wrapper">
					<div class="basic-infos">
						<div class="left-wrapper">
							<h1 class="merchants-name">{{ merchants.name }}</h1>
							<div class="fame">
								<span class="rank">
									<Star :size="36" :score="merchants.score"></Star>
								</span>
								<span class="rank-count">({{ merchants.ratingCount }})</span>
								<span class="sell-count">月售{{ merchants.sellCount }}份</span>
							</div>
						</div>
						<div class="right-wrapper">
							<p class="icon-favorite" :class="{'enjoy': favor}" @click="collect"></p>
							<p class="text">{{collectStatus }}</p>
						</div>
					</div>
					<div class="padding"></div>
					<div class="delivery-wrapper">
						<div class="left">
							<p class="text">起送价</p>
							<p class="price">{{ merchants.minPrice }}<span>元</span></p>
						</div>
						<div class="middle">
							<p class="text">商家配送</p>
							<p class="price">{{ merchants.deliveryPrice }}<span>元</span></p>
						</div>
						<div class="right">
							<p class="text">平均配送时间</p>
							<p class="price">{{ merchants.deliveryTime }}<span>分钟</span></p>
						</div>
					</div>
				</div>
				<Split></Split>
				<div class="bulletin-ads">
					<h1 class="title">公告与活动</h1>
					<p class="bulletin-content">{{ merchants.bulletin }}</p>
					<div class="activities">
						<ul>
							<li class="item" v-for="support in merchants.supports">
								<span class="icon" :class="classMap[support.type]"></span>
								<span class="text">{{ support.description }}</span>
							</li>
						</ul>
					</div>
				</div>
				<Split></Split>
				<div class="merchants-scene">
					<h1 class="title">商家实景</h1>
					<div class="imgwrapper-hook">
						<div class="img-wrapper">
							<div class="pics" ref="merchantsScene">
								<ul ref='picList'>
									<li class="picture" v-for="pic in merchants.pics">
										<img :src="pic" alt="merchants_scene" width="120" height="90">
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<Split></Split>
				<div class="merchants-infos">
					<h1 class="title">商家信息</h1>
					<div class="details">
						<ul>
							<li class="detail" v-for="info in merchants.infos">{{ info }}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import Star from '@/components/Star/Star.vue';
	import Split from '@/components/Split/Split.vue';
	import BScroll from 'better-scroll';

	export default {
		name: 'merchants',
		data () {
			return {
				favor: false
			};
		},
		props: {
			merchants: {
				type: Object
			}
		},
		created () {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
			this.$nextTick(() => {
				this.refresh();
				this.imgRefresh();
			});
		},
		watch: {
			'merchants' () {
				this.imgRefresh();
				this.refresh();
			}
		},
		mounted () {
			this.refresh();

			if (this.merchants.pics) {
				let picWidth = 120;
				let margin = 6;
				let width = (picWidth + margin) * this.merchants.pics.length;
				this.$refs.picList.style.width = width + 'px';
				console.log(this.$refs.picList.style.width);
				this.$nextTick(() => {
					this.imgRefresh();
				});
			}
			this.imgRefresh();
		},
		computed: {
			collectStatus () {
				if (!this.favor) {
					return '收藏';
				} else {
					return '已收藏';
				}
			}
		},
		methods: {
			refresh () {
				if (!this.scroll) {
					this.scroll = new BScroll(this.$refs.merchants, {
						click: true
					});
				} else {
					this.scroll.refresh();
				}
			},
			imgRefresh () {
				if (!this.imgScroll) {
					this.imgScroll = new BScroll(this.$refs.merchantsScene, {
						click: true,
						scrollX: true,
						eventPassthrough: 'vertical'
					});
				} else {
					this.imgScroll.refresh();
				}
			},
			collect () {
				this.favor = !this.favor;
			}
		},
		components: {
			Star,
			Split
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'
	
	.fade-in-enter-active
		transition all 0.3s
	.fade-in-enter, .fade-in-leave-to
		opacity: 0
	.merchants
		position: absolute
		top: 174px
		left: 0
		bottom: 0
		width: 100%
		overflow: hidden
		.merchants-wrapper
			.basic-infos
				clear: both
				display: block
				margin: 18px
				padding-bottom: 18px
				.left-wrapper
					float: left
					display: inline-block
					.merchants-name
						margin-bottom: 8px
						line-height: 14px
						font-size: 14px
						font-weight: 700
						color: rgb(7, 17, 27)
					.fame
						line-height: 18px
						font-size: 0
						.rank
							display: inline-block
							vertical-align: top
							font-size: 18px
						.rank-count
							margin: 0 12px 0 8px
							font-size: 10px
							color: rgb(77, 85, 93)
						.sell-count
							font-size: 10px
							color: rgb(77, 85, 93)
				.right-wrapper
					float: right
					display: inline-block
					text-align: center
					font-size: 0
					.icon-favorite
						margin-bottom: 4px
						line-height: 24px
						font-size: 24px	
						color: lightgray
						&.enjoy
							color: rgb(240, 20, 20)
					.text
						line-height: 10px
						font-size: 10px
						color: rgb(77, 85, 93)
			.padding
				height: 18px
				width: 100%
			.delivery-wrapper
				clear: both
				display: flex
				flex-direction: row
				justify-content: center
				padding: 18px 0
				width: 100%
				border-1px-before(rgba(7, 17, 27, .1))
				.left, .middle, .right
					flex: 1
					text-align: center
					border-right: 1px solid rgba(7, 17, 27, .1)
					.text
						margin-bottom: 4px
						line-height: 10px
						font-size: 10px
						color: rgb(147, 153, 159)
					.price
						line-height: 24px
						font-size: 24px
						color: rgb(7, 17, 27)
						span
							line-height: 10px
							font-size: 10px
				.right
					border-right: none
		.bulletin-ads
			margin: 18px
			line-height: 24px
			font-size: 12px
			.title
				font-weight: 700
				color: rgb(7, 17, 27)
			.bulletin-content
				margin: 8px 12px 16px
				color: rgb(240, 20, 20)
			.activities
				width: 100%
				.item
					padding: 16px 12px
					height: 16px
					border-1px-before(rgba(7, 17, 27, .1))
					font-size: 0
					.icon
						display: inline-block
						vertical-align top
						margin-right: 6px
						width: 16px
						height: 16px
						background-size 16px 16px
						background-repeat no-repeat
						&.decrease
							bg-image('decrease_2')
						&.discount
							bg-image('discount_2')
						&.special
							bg-image('special_2')
						&.invoice
							bg-image('invoice_2')
						&.guarantee
							bg-image('guarantee_2')
					.text
						display: inline-block
						vertical-align: top
						line-height: 16px
						font-size: 12px
		.merchants-scene
			position: relative
			margin: 18px
			// padding-bottom: 108px
			line-height: 24px
			font-size: 12px
			.title
				font-weight: 700
				color: rgb(7, 17, 27)
			.imgwrapper-hook
				position: relative
				.img-wrapper
					overflow: hidden
					margin: 12px 0 18px
					.pics
						ul
							display: flex
							.picture
								flex: 0 0 120px
								width: 120px
								height: 90px
								margin-right: 6px
		.merchants-infos
			margin: 18px
			line-height: 16px
			font-size: 12px
			color: rgb(7, 17, 27)
			.title
				padding-bottom: 12px
				font-weight: 700
			.details
				.detail
					border-1px-before(rgba(7, 17, 27, .1))
					padding: 16px 12px
					&:last-child
						border-1px(rgba(7, 17, 27, .1))
			
</style>
