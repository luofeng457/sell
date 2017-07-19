<template>
	<div class="ratings">
		<p>{{ msg }}</p>
	</div>
</template>

<script>
	export default {
		name: 'ratings',
		data () {
			return {
				msg: 'I am ratings.'
			};
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	p
		font-size: 18px
		color: green
</style>
