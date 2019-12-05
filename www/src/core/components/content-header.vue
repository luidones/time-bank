<template>
    <section class="content-header">
    	<h1>
    		<i v-if="fa" :class="'fa fa-' + fa"></i>
    		{{ title }}
    		<small v-if="subtitle">{{ subtitle }}</small>
    	</h1>
    </section>
</template>

<script>
export default {
    props: ['fa', 'title', 'subtitle']
}
</script>
