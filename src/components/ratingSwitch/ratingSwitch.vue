<template>
	<div class="rating-switch">
		<div class="rating-type">
			<span class="all" @click="choseAll">{{ desc.all }}<span>{{ ratings.length }}</span></span>
			<span class="positive" @click="chosePos">{{ desc.positive }}<span>{{ posRatings }}</span></span>	
			<span class="negative" @click="choseNeg">{{ desc.negative }}<span>{{ ratings.length - posRatings }}</span></span>	
		</div>
		<div class="switch">
			<span class="icon-check_circle" :class="{'all': onlyContent===false}" @click="choseContent"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
	const ALL = 2;
	// const POSITIVE = 1;
	// const NEGATIVE = 0;

	export default {
		props: {
			ratings: {
				type: Array,
				default () {	// 数组和对象default需要设置为函数类型
					return [];
				}
			},
			selectType: {
				type: Number,
				default: ALL
			},
			onlyContent: {
				type: Boolean,
				default: false
			},
			desc: {
				type: Object,
				default () {
					return {
						all: '全部',
						positive: '满意',
						negative: '不满意'
					};
				}
			}
		},
		computed: {
			posRatings () {
				let len = 0;
				this.ratings.forEach((rating) => {
					if (rating.rateType === 0) {
						len++;
					}
				});
				return len;
			}
		},
		methods: {
			choseAll () {
				this.$emit('chose-all', event.target);
			},
			chosePos () {
				this.$emit('chose-positive', event.target);
			},
			choseNeg () {
				this.$emit('chose-negative', event.target);
			},
			choseContent () {
				this.$emit('chose-content', event.target);
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'

	.rating-switch
		.rating-type
			margin: 18px 0 0 18px
			padding-bottom: 18px
			border-1px(rgba(7, 17, 27, .1))
			.all, .positive, .negative
				display: inline-block
				margin-right: 8px
				padding: 8px 12px
				line-height: 16px
				font-size: 12px
				color: #fff
				background: rgb(0, 160, 220)
				span
					font-size: 8px
					margin-left: 3px
			.negative
				margin-right: 0
		.switch
			padding: 12px 18px
			height: 24px
			line-height: 24px
			font-size: 0
			border-bottom: 2px solid rgba(7, 17, 27, .1)
			.icon-check_circle
				display: inline-block
				vertical-align: top
				margin-right: 4px
				font-size: 24px
				color: rgb(0, 160, 220)
				&.all
					color: rgb(147, 153, 159)
			.text
				display: inline-block
				vertical-align: top
				font-size: 12px
				color: rgb(147, 153, 159)

</style>