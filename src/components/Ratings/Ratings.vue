<template>
	<div class="ratings">
	<div class="ratings-content">
		<div class="overview">
			<div class="overview-left">
				<h1 class="score">{{ merchants.score }}</h1>
				<div class="title">综合评分</div>
				<div class="rank">高于周边商家{{ merchants.rankRate }} </div>
			</div>
			<div class="overview-right">
				<div class="sevice-score">
					<span class="title">服务态度</span>
					<div class="rank"><star class="star" :size="36" :score="merchants.serviceScore"></star></div>
					<span class="score">{{ merchants.serviceScore }}</span>
				</div>
				<div class="food-score">
					<span class="title">商品评价</span>
					<div class="rank"><star class="star" :size="36" :score="merchants.foodScore"></star></div>
					<span class="score">{{ merchants.foodScore }}</span>
				</div>
				<div class="delivery-time">
					<span class="title">送达时间</span>
					<span class="time">{{ merchants.deliveryTime}}分钟</span>
				</div>
			</div>
		</div>
		<Split class="split"></Split>
		<ratingSwitch class="rating-switch"
			:ratings="ratings"
			:select-type="selectType"
			:only-content="onlyContent"
			:desc="desc"
			v-on:chose-all="dealAll"
			v-on:chose-positive="dealPos"
			v-on:chose-negative="dealNeg"
			v-on:chose-content="dealContent"
			></ratingSwitch>
		<ratingList class="rating-list" 
		:ratings="ratings"
		:select-type="selectType"
		:only-content="onlyContent"
		></ratingList>
	</div>
	</div>
</template>

<script>
	import Star from '@/components/Star/Star.vue';
	import Split from '@/components/Split/Split.vue';
	import ratingSwitch from '@/components/ratingSwitch/ratingSwitch.vue';
	import ratingList from '@/components/ratingList/ratingList.vue';
	
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;
	const ERR_OK = 0;

	export default {
		data () {
			return {
				ratings: [],
				selectType: ALL,
				onlyContent: false,
				desc: {
					all: '全部',
					positive: '满意',
					negative: '不满意'
				}
			};
		},
		props: {
			merchants: {
				type: Object
			}
		},
		created () {
			this.$http.get('/api/ratings').then((response) => {
			  response = response.body;
			  if (response.errno === ERR_OK) {
			    this.ratings = response.data;
			  }
			});
		},
		methods: {
			dealAll () {
				this.selectType = ALL;
			},
			dealPos () {
				this.selectType = POSITIVE;
			},
			dealNeg () {
				this.selectType = NEGATIVE;
			},
			dealContent () {
				this.onlyContent = !this.onlyContent;
			}

		},
		components: {
			Star,
			Split,
			ratingSwitch,
			ratingList
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.ratings
		position: absolute
		top: 174px
		bottom: 0
		left: 0
		width: 100%
		overflow: hidden
		.overview
			display: flex
			padding 18px 0
			font-size: 0
			.overview-left
				flex 0 0 137px
				width: 137px
				border-right: 1px solid rgba(7, 17 ,27, .1)
				text-align: center
				@media only screen and (max-width: 320px)
					flex: 0 0 113px
					width: 0 0 113px
				.score
					padding: 6px 0
					line-height: 28px
					font-size: 24px
					color: rgb(255, 153, 0)
				.title
					padding-bottom: 8px
					line-height: 12px
					font-size: 12px
					color: rgb(7, 17, 27)
				.rank
					padding-bottom: 6px
					line-height: 10px
					font-size: 10px
					color: rgb(147, 153, 159)
			.overview-right
				flex: 1
				padding-left: 24px
				@media only screen and (max-width: 320px)
					padding-left: 10px
				.sevice-score, .food-score
					margin-bottom: 8px
					.title
						display: inline-block
						vertical-align: top
						line-height: 18px
						font-size: 12px
						color: rgb(7, 17, 27)
					.rank
						display: inline-block
						vertical-align: top
						margin: 0 12px
						.star
							line-height: 18px
							font-size: 18px
					.score
						display: inline-block
						vertical-align: top
						line-height: 18px
						font-size: 12px
						color: rgb(255, 153, 0)
				.delivery-time
					.title
						margin-right: 12px
						line-height: 18px
						font-size: 12px
						color: rgb(7, 17, 27)
					.time
						line-height: 18px
						font-size: 12px
						color: rgb(147, 153, 159)	
</style>
