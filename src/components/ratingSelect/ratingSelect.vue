<template>
	<div class="rating-select">
		<div class="rating-type">
			<span>{{ desc.all }}</span>	
			<span>{{ desc.positive }}</span>	
			<span>{{ desc.negative }}</span>	
		</div>
		<div class="switch">
			<span class="icon-check_circle"></span>
			<span class="text">只看有内容的评价</span>
		</div>

	</div>
</template>

<script>
	// const POSITIVE = 0;
	// const NEGATIVE = 1;
	const ALL = 2;

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
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.rating-select
		.rating-type
			span
				display: inline-block
				margin-right: 8px
				padding: 12px 8px
				line-height: 16px
				font-size: 12px
				color: #fff
				background: rgb(0, 160, 220)
				&:last-child
					margin-right: 0
		.switch
			.icon-check_circle
			.text
				font-size: 12px
</style>