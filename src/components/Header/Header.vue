<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="merchants.avatar" alt="logo" width="64px" height="64px">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{ merchants.name }}</span>
				</div>
				<div class="description">
					{{ merchants.description }}&nbsp;/&nbsp;{{ merchants.deliveryTime }}<span class="deliveryTime">分钟送达</span>
				</div>
				<div v-if="merchants.supports" class="support">
					<span :class="classMap[merchants.supports[0].type]" class="icon"></span>
					<span class="text">{{ merchants.supports[0].description }}</span>
				</div>
			</div>
			<div v-if="merchants.supports" class="support-content" @click="showDetail">
				<span class="count">{{ merchants.supports.length }}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="showDetail">
			<span class="bulletin-title"></span><span class="bulletin-text">{{ merchants.bulletin }}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="backgroud">
			<img :src="merchants.avatar" width="100%" height="100%">
		</div>
		<transition name="fade">
			<div v-show="detailShow" class="detail">
				<div class="detail-wrapper clearfix">
					<div class="detail-main">
						<h1 class="name">{{ merchants.name }}</h1>
						<div class="star-wrapper">
							<Star class="star" :size="48" :score="merchants.score"></Star>
						</div>
						<div class="detail-specials">
							<div class="detail-specials-header">
								<div class="header-title">优惠信息</div>
								<span class="border-1px divider1"></span>
								<span class="border-1px divider2"></span>
							</div>
							<div v-if="merchants.supports" class="detail-specials-info">
								<div v-for="(special, index) in merchants.supports" class="special-info">
									<span :class="classMap[special.type]" class="special-icon"></span>
									<span class="special-text">{{ special.description }}</span>
								</div>
							</div>
						</div>
						<div class="detail-bulletin">
							<div class="detail-bulletin-header">
								<div class="header-title">商家公告</div>
								<span class="border-1px divider3"></span>
								<span class="border-1px divider4"></span>
							</div>
							<div class="detail-bulletin-info">
								<p class="bulletin-text">{{ merchants.bulletin }}</p>
							</div>
						</div>
					</div>
				</div>
				<div class="detail-close icon-close" @click="hideDetail">
					
				</div>
			</div>
		</transition>
	</div>

</template>

<script>
	import Star from '@/components/Star/Star';
	export default {
		name: 'header',
		data () {
			return {
				detailShow: false
			};
		},
		props: {
			'merchants': {
				type: Object
			}
		},
		created () {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		},
		methods: {
			showDetail () {
				this.detailShow = true;
			},
			hideDetail () {
				this.detailShow = false;
			}
		},
		components: {
			Star
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"

	.header
		position: relative
		overflow: hidden
		color: #fff
		width: 100%
		background rgba(7, 17, 27, 0.5)
		.content-wrapper
			position: relative
			font-size: 0
			padding: 24px 16px 18px 24px
			.avatar
				display: inline-block
				vertical-align top
				img
					border-radius: 2px
			.content
				display inline-block
				margin-left: 16px
				.title
					margin 2px 0 8px 0
					.brand
						display: inline-block
						vertical-align top
						width: 30px
						height: 18px
						bg-image('brand')
						background-size 30px 18px
						background-repeat no-repeat
					.name
						margin-left: 6px
						line-height: 18px
						font-size: 16px
						font-weight: bold
				.description
					margin-bottom: 10px
					line-height: 12px
					font-size: 12px
				.support
					.icon
						display: inline-block
						margin-right: 4px
						vertical-align top
						width: 12px
						height: 12px
						background-size 12px 12px
						background-repeat no-repeat
						&.decrease
							bg-image('decrease_1')
						&.discount
							bg-image('discount_1')
						&.special
							bg-image('special_1')
						&.invoice
							bg-image('invoice_1')
						&.guarantee
							bg-image('guarantee_1')
					.text
						line-height: 12px
						font-size: 10px
			.support-content
				position: absolute
				right: 12px
				bottom: 16px
				padding: 0 8px
				height: 24px
				line-height: 24px
				border-radius: 14px
				background: rgba(0, 0, 0, 0.2)
				text-align: center
				.count
					vertical-align top
					font-size: 10px
					margin-right: 2px
				.icon-keyboard_arrow_right
					line-height: 24px
					font-size: 10px
							
		.bulletin-wrapper
			position: relative
			height: 28px
			line-height: 28px
			padding: 0 22px 0 12px
			white-space: nowrap
			overflow: hidden
			text-overflow: ellipsis
			vertical-align: top
			background rgba(7, 17, 27, 0.2)
			.bulletin-title
				display: inline-block
				vertical-align: top
				margin-top: 8px
				width: 22px
				height: 12px
				bg-image('bulletin')
				background-size: 22px 12px
				background-repeat no-repeat
			.bulletin-text
				vertical-align: top
				margin: 0 4px
				font-size: 10px
			.icon-keyboard_arrow_right
				position: absolute
				right: 12px
				top: 8px
				font-size: 10px				
		
		.backgroud
			position: absolute
			left: 0
			top: 0
			width: 100%
			height: 100%
			z-index: -1
			filter: blur(6px)
		
		.detail
			position: fixed
			z-index: 100
			top: 0
			left: 0
			width: 100%
			height: 100%
			overflow: auto
			background: rgba(7, 17, 27, 0.8)
			&.fade-enter-active
				transition all 0.2s linear
			&.fade-enter
				opacity: 0
				background: rgba(7, 17, 27, 0)
			.detail-wrapper
				width: 100%
				min-height: 100%
				.detail-main
					margin-top: 64px
					padding-bottom: 64px
					.name
						line-height: 16px
						text-align: center
						font-size: 16px
						font-weight: 700
					.star-wrapper
						margin: 16px auto 0 auto
						text-align: center						
						line-height: 24px
					.detail-specials
						font-size: 0
						width: calc(100% - 72px)
						margin: 28px 36px 0 36px
						.detail-specials-header
							line-height: 14px
							font-size: 14px
							font-weight: 700
							.divider1
								float:left
								top: -7px
								width: calc(50% - 40px)
								border-1px(rgba(255, 255, 225, 1))
							.header-title
								text-align: center
								width: 100%
							.divider2
								float: right
								top: -7px
								width: calc(50% - 40px)
								border-1px(rgba(255, 255, 255, 1))
						.detail-specials-info
							padding: 24px 12px 0 12px
							font-size: 0
							.special-info
								margin-top: 12px
								&:first-child
									margin-top: 0
								.special-icon
									display: inline-block
									margin-right: 6px
									margin-top: -2px
									vertical-align: top
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
								.special-text
									vertical-align: top
									line-height: 12px
									font-size: 12px
									font-weight: 200px
					.detail-bulletin
						font-size: 0
						width: calc(100% - 72px)
						margin: 28px 36px 0 36px
						.detail-bulletin-header
							line-height: 14px
							font-size: 14px
							font-weight: 700
							.divider3
								float:left
								top: -7px
								width: calc(50% - 40px)
								border-1px(rgba(255, 255, 225, 1))
							.header-title
								text-align: center
								width: 100%
							.divider4
								float: right
								top: -7px
								width: calc(50% - 40px)
								border-1px(rgba(255, 255, 255, 1))
						.detail-bulletin-info
							.bulletin-text
								padding: 24px 12px 0 12px
								line-height: 24px
								font-size: 12px
								font-weight: 200
								color: white
			.detail-close
				// position: relative
				width: 32px
				height: 32px
				margin: -64px auto 0 auto
				clear: both
				font-size: 32px
</style>
