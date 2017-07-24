<template>
	<div class="cartControl">
		<transition-group name="move-fade" v-show="food.count" tag="div">
			<div class="cart-decrease icon-remove_circle_outline" v-show="food.count" @click.stop="reduceCount" key="decrease"></div>
			<div class="cart-count" v-show="food.count" key="countNum">{{ food.count }}</div>
		</transition-group>
		<div class="cart-increase icon-add_circle" @click.stop="addCount"></div>
	</div>
</template>

<script>
	import Vue from 'vue';

	export default {
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			addCount (event) {
				if (!event._constructed) {
					return;
				}
				if (!this.food.count) {
					Vue.set(this.food, 'count', 1);
				} else {
					this.food.count++;
				}
				this.$emit('cart-add', event.target);
			},
			reduceCount (event) {
				if (!event._constructed) {
					return;
				}
				if (this.food.count) {
					this.food.count--;
				}
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.cartControl
		font-size: 0
		div 
			display:inline-block
		.move-fade-enter-active
			transition all .3s
		.move-fade-leave-active
			transition all .3s
		.move-fade-enter, .move-fade-leave-to
			opacity: 0
			transform: matrix(-1,0,0,-1,24,0)
		div .cart-decrease
			display: inline-block
			vertical-align: top
			padding: 6px
			line-height: 24px
			font-size: 24px
			color: rgb(0, 160, 220)
		div .cart-count
			display: inline-block
			vertical-align: top
			width: 12px
			height: 24px
			padding: 6px 0
			line-height: 24px
			text-align: center
			font-size: 10px
			color: rgb(147,153,159)
		.cart-increase
			display: inline-block
			vertical-align: top
			padding: 6px
			line-height: 24px
			font-size: 24px
			color: rgb(0, 160, 220)

		// .cart-increase
</style>