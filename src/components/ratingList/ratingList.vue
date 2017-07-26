<template>
	<div class="rating-list" ref="ratinglist">
		<div class="wrapper"  v-for="(rating,index) in ratings" v-show="selectType===2?true:rating.rateType===selectType">
			<div class="rating-wrapper" v-show="!onlyContent?true:rating.text">
				<div class="avatar">
					<img :src="rating.avatar" width="18" height="18" alt="avatar">
				</div>
				<div class="main">
					<div class="info">
						<span class="username">{{ rating.username }}</span>
						<span class="time">{{ formatedTime[index] }}</span>
					</div>
					<div class="rank">
						<span class="score">
							<Star :size="24" :score="rating.score"></Star>
						</span>
						<span class="delivery-time">{{ rating.deliveryTime }}分钟送达</span>
					</div>
					<p class="text">{{ rating.text }}</p>
					<div class="rec">
						<span :class="rating.rateType?'icon-thumb_down':'icon-thumb_up'" class="icon"></span>
						<span class="foods">
							<span class="food" v-for="item in rating.recommend">{{ item }}</span>
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// import BScroll from 'better-scroll';
	import Star from '@/components/Star/Star.vue';

	const ALL = 2;

	export default {
		data () {
			return {
				formatedTime: []
			};
		},
		props: {
			ratings: {
				type: Array,
				default () {
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
			}
		},
		methods: {
			formatTime () {
				this.ratings.forEach((rating) => {
					let timeString = rating.rateTime;
					let timeStamp = new Date(timeString);
					let year = '2' + timeStamp.getYear() - 100;
					let month = timeStamp.getMonth();
					let day = timeStamp.getDate();
					let hours = timeStamp.getHours();
					let min = timeStamp.getMinutes();
					let sec = timeStamp.getSeconds();
					let ts = `${year}-${month}-${day} ${hours}:${min}:${sec}`;
					this.formatedTime.push(ts);
					console.log(this.formatedTime);
				});
			},
			refresh () {
				// this.$nextTick(() => {
				// 	this.formatTime();
				// 	// if (!this.scroll) {
				// 	// 	this.scroll = new BScroll(this.$refs.ratinglist, {
				// 	// 		click: true
				// 	// 	});
				// 	// } else {
				// 	// 	this.scroll.refresh();
				// 	// }
				// });
			}
		},
		components: {
			Star
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'

	.rating-list
		.rating-wrapper
			display: flex
			margin: 18px 18px 0 18px
			padding-bottom: 18px
			border-1px(rgba(7, 17, 27, .1))
			// background: #fff
			.avatar
				flex: 0 0 28px
				width: 28px
				img
					width: 28px
					height: 28px
					border-radius: 50%
			.main
				flex: 1
				margin-left: 12px
				.info
					line-height: 12px
					font-size: 10px
					.username
						display: inline-block
						vertical-align: top
						color: rgb(7, 17, 27)
					.time
						float: right
						display: inline-block
						vertical-align: top
						color: rgb(147, 153, 159)
				.rank
					margin-top: 4px
					font-size: 0
					.score
						display: inline-block
						vertical-align: top
						line-height: 12px
						font-size: 10px
					.delivery-time
						display: inline-block
						vertical-align: top
						margin-left: 6px
						line-height: 12px
						font-size: 10px
						color: rgb(147, 153, 159)
				.text
					margin: 6px 0 8px
					line-height: 18px
					font-size: 12px
					color: rgb(7, 17, 27)
				.rec
					.icon
						display: inline-block
						vertical-align: top
						margin-right: 8px
						line-height: 16px
						font-size: 12px
						color: rgb(0, 160, 220)
					.foods
						font-size: 0
						.food
							display: inline-block
							vertical-align: top
							margin-right: 8px
							padding: 0px 6px
							border: 1px solid rgba(7, 17, 27, .1)
							border-radius: 2px
							line-height: 16px
							font-size: 9px
							color: rgb(147, 153, 159)
							background: #fff
							&:last-child
								margin-right: 0

</style>