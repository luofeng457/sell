<template>
	<div class="merchants">
		<p>{{ msg }}</p>
	</div>
</template>

<script>
	export default {
		name: 'merchants',
		data () {
			return {
				msg: 'I am merchants.'
			};
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	p
		font-size: 18px
		color: green
</style>
