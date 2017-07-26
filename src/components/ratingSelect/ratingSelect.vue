<template>
	<div class="rating-select">
		<div class="rating-type">
			<span class="all" @click="selectAll">{{ desc.all }}<span>{{ ratings.length }}</span></span>
			<span class="positive" @click="selectPos">{{ desc.positive }}<span>{{ posRatings }}</span></span>	
			<span class="negative" @click="selectNeg">{{ desc.negative }}<span>{{ ratings.length - posRatings }}</span></span>	
		</div>
		<div class="switch">
			<span @click="selectContent" :class="{'all': onlyContent===false}" class="icon-check_circle"></span>
			<span class="text">只看有内容的评价</span>
		</div>
		<div class="segment"></div>
		<div class="rating-lists">
			<div class="wrapper" v-for="(rating,index) in ratings" v-show="!onlyContent?true:rating.text">
				<div class="inner" v-show="selectType===2?true:rating.rateType===selectType">
					<div class="info">
						<div class="time">{{ formatedTime[index]}}</div>
						<div class="user">
							<span class="username">{{ rating.username }}</span>
							<img :src="rating.avatar"	class="avatar" width="12" height="12"></img>
						</div>
					</div>
					<div class="main">
						<span :class="rating.rateType?'icon-thumb_down':'icon-thumb_up'"></span>
						<span class="text">{{ rating.text }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// const POSITIVE = 0;
	// const NEGATIVE = 1;
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
			selectAll () {
				this.$emit('select-all', event.target);
			},
			selectPos () {
				this.$emit('select-pos', event.target);
			},
			selectNeg () {
				this.$emit('select-neg', event.target);
			},
			selectContent () {
				this.$emit('select-content', event.target);
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'
	
	.rating-select
		.rating-type
			margin-left: 18px
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
		.rating-lists
			.wrapper
				.inner
					padding: 16px 18px
					border-1px(rgba(7, 17, 27, .1))
					.info
						.time
							float: left
							line-height: 12px
							font-size: 10px
							color: rgb(147, 153, 159)
						.user
							float: right
							line-height: 12px
							font-size: 10px
							color: rgb(147, 153, 159)
							.username
								margin-right: 6px
							.avatar
								border-radius: 50%
								font-size: 12px
					.main
						clear: both
						padding-top: 6px
						.icon-thumb_up, .icon-thumb_down
							line-height: 24px
							font-size: 12px
							color: rgb(0, 160, 220)
						.text
							line-height: 16px
							font-size: 12px
							color: rgb(7, 17, 27)
</style>