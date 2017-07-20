<template>
	<div class="goods">
		<div class="menu-wrapper">
			<ul class="menu-list">
				<li class="menu-item" v-for="item in goods">
					<span class="text border-1px">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{ item.name }}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper">
			<ul>
				<li v-for="item in goods" class="food-list">
					<h1 class="title">{{ item.name }}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item">
							<div class="icon">
								<img :src="food.icon" width="57" height="57">
							</div>
							<div class="content">
								<h2 class="name">{{ food.name }}</h2>
								<p class="desc">{{ food.description }}</p>
								<div class="extra">
									<span>月售{{ food.sellCount }}份</span>
									<span>好评率{{ food.rating }}%</span>
								</div>	
								<div class="price">
									<span class="newPrice">¥{{ food.price }}</span>
									<span class="oldPrice" v-show="food.oldPrice">¥{{ food.price }}</span>
								</div>
								<div class="count">
									<span class="icon-remove_circle_outline" v-show="foodCount" @click="countReduce"></span>
									<span class="num" v-show="foodCount">{{ foodCount }}</span>
									<span class="icon-add_circle" @click="countAdd"></span>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	const ERR_OK = 0;
	export default {
		name: 'goods',
		data () {
			return {
				goods: [],
				foodCount: [],
				actived: false
			};
		},
		props: {
			merchants: {
				type: Object
			}
		},
		created () {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
			this.$http.get('/api/goods').then((response) => {
				response = response.body;
				if (response.errno === ERR_OK) {
					this.goods = response.data;
				}
			});
		},
		methods: {
			countAdd () {
				this.foodCount++;
				console.log(this.foodCount);
				console.log(this.goods[0].foods[0].name);
			},
			countReduce () {
				if (this.foodCount) {
					this.foodCount--;
					console.log(this.foodCount);
				}
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'

	.goods
		display: flex
		position: absolute
		top: 174px
		bottom: 46px
		width: 100%
		overflow: hidden
		.menu-wrapper
			flex: 0 0 80px
			width: 80px
			background: #f3f5f7
			.menu-list
				.menu-item
					display: table
					overflow: hidden
					height: 54px
					width: 56px
					padding: 0 12px
					.text
						display: table-cell
						vertical-align: middle
						line-height: 14px
						font-size: 12px
						border-1px(rgba(7, 17, 27, 0.1))
						.icon
							display: inline-block
							margin-right: 2px
							vertical-align top
							width: 12px
							height: 12px
							background-size 12px 12px
							background-repeat no-repeat
							&.decrease
								bg-image('decrease_3')
							&.discount
								bg-image('discount_3')
							&.special
								bg-image('special_3')
							&.invoice
								bg-image('invoice_3')
							&.guarantee
								bg-image('guarantee_3')
		.foods-wrapper
			flex: 1
			.food-list
				.title
					height: 26px
					padding-left: 14px
					border-left: 2px solid #d9dde1
					line-height: 26px
					font-size: 12px
					color: rgb(147, 153, 159)
					background: #f3f5f7
				.food-item
					display: flex
					margin: 18px
					padding-bottom: 18px
					border-1px(rgba(7,17,27,0.1))
					&:last-child
						border-none()
						padding-bottom: 0
					.icon
						flex 0 0 57px
						margin-right: 10px
						font-size: 14px
					.content
						flex: 1
						position: relative
						.name
							margin-top: 2px
							line-height: 14px
							font-size: 14px
							color: rgb(7, 17, 27)
						.desc, .extra
							margin-top: 8px
							line-height: 10px
							font-size: 10px
							color: rgb(147, 153, 159)
						.extra
							& > span
								margin-right: 12px
								&:last-child
									margin-right: 0
						.price
							margin-top: 8px
							& > span
								margin-rigth: 12px
								&:last-child
									margin-right: 0
							.newPrice
								line-height: 24px
								font-size: 14px
								font-weigth: 700
								color: red
							.oldPrice
								line-height: 24px
								font-size: 10px
								font-weight: 700px
								color: rgb(147, 153, 159)
								text-decoration: line-through
						.count
							position: absolute
							right: 0
							bottom: 0
							font-size: 0
							.icon-remove_circle_outline,.icon-add_circle
								line-height: 24px
								font-size: 24px
								color: rgb(0, 160, 220)
							.num
								display: inline-block
								vertical-align top
								text-align center
								width: 24px
								height: 24px
								line-height: 24px
								font-size: 10px
								color: rgb(147, 153, 159)
								
								
							
</style>
