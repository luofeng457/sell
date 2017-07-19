<template>
	<ul class="list">
		<li>{{ id_1 }}</li>
		<li>{{ id_2 }}</li>
		<li>{{ id_3 }}</li>
	</ul>
</template>
<script>
export default {
  name: 'list',
  data () {
    return {
      id_1: 'item one',
      id_2: 'item two',
      id_3: 'item three'
    }
  }
}
</script>
<style>
ul {
  list-style: none;
  background: orange;
  font-size: 18px;
  width: 150px;
	margin: 0 auto;
	padding-left: 5px;
}
ul li{
  /*padding: 5px 0;*/
}
</style>
