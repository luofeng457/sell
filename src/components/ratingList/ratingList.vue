<template>
	<div class="rating-list" ref="ratingListScroll">
		<div class="wrapper-outter">
			<div class="wrapper-inner"  v-for="(rating,index) in ratings" v-show="selectType===2?true:rating.rateType===selectType">
				<div class="rating-list-wrapper" v-show="!onlyContent?true:rating.text">
					<div class="user-avatar">
						<img :src="rating.avatar" width="18" height="18" alt="avatar">
					</div>
					<div class="rating-main">
						<div class="user-msg">
							<span class="uname">{{ rating.username }}</span>
							<span class="formated-time">{{ formatedTime[index] }}</span>
						</div>
						<div class="rankscore-info">
							<span class="person-score">
								<Star :size="24" :score="rating.score"></Star>
							</span>
							<span class="dispatch-time">{{ rating.deliveryTime }}分钟送达</span>
						</div>
						<p class="person-text">{{ rating.text }}</p>
						<div class="rec-list">
							<span :class="rating.rateType?'icon-thumb_down':'icon-thumb_up'" class="rec-icon"></span>
							<span class="foods-items">
								<span class="item-food" v-for="item in rating.recommend">{{ item }}</span>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
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
		created () {
			this.$nextTick(() => {
				this._initListScroll();
				console.log('created');
			});
		},
		watch: {
			'ratings' () {
				this._initListScroll();
				console.log('watch');
			}
		},
		mounted () {
			this._initListScroll();
			console.log('mounted');
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
				});
			},
			_initListScroll () {
				if (this.ratings) {
					if (!this.BScroll) {
						this.BScroll = new BScroll(this.$refs.ratingListScroll, {
							click: true,
							scrollY: true
						});
						console.log('new');
					} else {
						this.BScroll.refresh();
						console.log('refresh');
					}
				}
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
		overflow: hidden
		height: 247px
		height: calc(100% - 246px)
		.wrapper-outter
			// .wrapper-inner
			.rating-list-wrapper
				display: flex
				margin: 18px 18px 0 18px
				padding-bottom: 18px
				border-1px(rgba(7, 17, 27, .1))
				.user-avatar
					flex: 0 0 28px
					width: 28px
					img
						width: 28px
						height: 28px
						border-radius: 50%
				.rating-main
					flex: 1
					margin-left: 12px
					.user-msg
						line-height: 12px
						font-size: 10px
						.uname
							display: inline-block
							vertical-align: top
							color: rgb(7, 17, 27)
						.formated-time
							float: right
							display: inline-block
							vertical-align: top
							color: rgb(147, 153, 159)
					.rankscore-info
						margin-top: 4px
						font-size: 0
						.person-score
							display: inline-block
							vertical-align: top
							line-height: 12px
							font-size: 10px
						.dispatch-time
							display: inline-block
							vertical-align: top
							margin-left: 6px
							line-height: 12px
							font-size: 10px
							color: rgb(147, 153, 159)
					.person-text
						margin: 6px 0 8px
						line-height: 18px
						font-size: 12px
						color: rgb(7, 17, 27)
					.rec-list
						.rec-icon
							display: inline-block
							vertical-align: top
							margin-right: 8px
							line-height: 16px
							font-size: 12px
							color: rgb(0, 160, 220)
						.foods-items
							font-size: 0
							.item-food
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