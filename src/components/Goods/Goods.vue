<template>
	<div class="goods">
		<p>{{ msg }}</p>
	</div>
</template>

<script>
	export default {
		name: 'goods',
		data () {
			return {
				msg: 'I am goods.'
			};
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	p
		font-size: 18px
		color: green
</style>
