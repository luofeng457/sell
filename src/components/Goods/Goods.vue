<template>
	<transition name="show-in">
			<div class="goods">
				<div class="menu-wrapper" ref="menuWrapper">
					<ul class="menu-list">
						<li class="menu-item" v-for="(item, index) in goods" :key="index" :class="{'current': currentIndex===index}" @click="selectMenu(index, $event)">
							<span class="text border-1px">
								<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{ item.name }}
							</span>
						</li>
					</ul>
				</div>
				<div class="foods-wrapper" ref="foodsWrapper">
					<ul>
						<li v-for="(item,goodIndex) in goods" :key="goodIndex" class="food-list food-list-hook">
							<h1 class="title">{{ item.name }}</h1>
							<ul>
								<li @click="foodSelect(food, $event)" v-for="(food,foodIndex) in item.foods" class="food-item food-item-hook">
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
										<div class="cartcontrol-wrapper">
											<cartControl :food="food" v-on:cart-add="cartAdd">
												
											</cartControl>
										</div>
		<!-- 								<div class="count">
											<span class="icon-remove_circle_outline" v-show="food.count" @click="countReduce(goodIndex,foodIndex)"></span>
											<span class="num" v-show="food.count">{{ food.count }}</span>
											<span class="icon-add_circle" :key="goodIndex" @click="countAdd(goodIndex,foodIndex)"></span>
										</div> -->
									</div>
								</li>
							</ul>
						</li>
					</ul>
				</div>
				<shopcart ref="shopcart" :merchants="merchants" :delivery-price="merchants.deliveryPrice" :min-price="merchants.minPrice" :select-foods="selectFoods"></shopcart>
				<food :food="selectedFood" ref="food" v-on:cart-add="cartAdd" :cartAdd="cartAdd"></food>
			</div>
	</transition>
</template>

<script>
	import BScroll from 'better-scroll';
	import shopcart from '@/components/Shopcart/Shopcart.vue';
	import cartControl from '@/components/cartControl/cartControl.vue';
	import food from '@/components/Food/Food.vue';

	const ERR_OK = 0;
	export default {
		name: 'goods',
		data () {
			return {
				goods: [],
				listHight: [],
				scrollY: 0,
				goodIndex: 0,
				foodIndex: 0,
				selectedFood: {},
				actived: false
			};
		},
		props: {
			merchants: {
				type: Object
			}
		},
		computed: {
			currentIndex () {
				for (let i = 0; i < this.listHight.length; i++) {
					let height1 = this.listHight[i];
					let height2 = this.listHight[i + 1];
					if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
						return i;
					}
				}
				return 0;
			},
			selectFoods () {
				let foods = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if (food.count) {
							foods.push(food);
						}
					});
				});
				return foods;
			}
		},
		created () {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
			this.$http.get('/api/goods').then((response) => {
				response = response.body;
				if (response.errno === ERR_OK) {
					this.goods = response.data;
					this.$nextTick(() => {
						this._initScroll();
						this._calculateHeight();
					});
				}
			});
		},
		methods: {
			_initScroll () {
				// 移动端默认支持touch.start/touch.move/touch.end事件，阻止其他默认事件，所以需要传递option：{click: true}以支持点击事件
				this.menuScroll = new BScroll(this.$refs.menuWrapper, {click: true});
				this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {click: true, probeType: 3});
				this.foodsScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y));
				});
			},
			_calculateHeight () {
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
				let height = 0;
				this.listHight.push(height);
				for (let i = 0; i < foodList.length; i++) {
					let item = foodList[i];
					height += item.clientHeight;
					this.listHight.push(height);
				}
			},
			// 在需要访问原生DOM事件时，需要将$event作为方法的一个参数传入
			selectMenu (index, event) {
				// 避免PC端点击时触发两次事件
				if (!event._constructed) {	// better-scroll派发事件相比浏览器原生事件有_constructed属性
					return;
				}
				// 使用better-scroll的scrollToElement方法实现左右联动
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
				let el = foodList[index];
				this.foodsScroll.scrollToElement(el, 300);
			},
			cartAdd (target) {
				// 异步执行小球动画进行体验优化
				this.$nextTick(() => {
					this.$refs.shopcart.drop(target);
				});
			},
			foodSelect (food, event) {
				if (!event._constructed) {
					return;
				}
				this.selectedFood = food;
				this.$refs.food.show();
			}
		},
		components: {
			shopcart,
			cartControl,
			food
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'
	
	.show-in-enter-active
		transition all 0.3s
	.show-in-enter, .show-in-leave-to
		opacity: 0
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
					&.current
						position: relative
						z-index: 10
						margin-top: -1px
						background: red
						font-weight: 700
						.text
							border-none()
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
							padding-top: 2px
							line-height: 14px
							font-size: 14px
							color: rgb(7, 17, 27)
						.desc, .extra
							padding-top: 8px
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
						.cartcontrol-wrapper
							position: absolute
							right: 0
							bottom: -6px
						.count
							position: absolute
							right: 0
							bottom: 0
							font-size: 0
							.icon-remove_circle_outline,.icon-add_circle
								display: inline-block
								vertical-align: top
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
