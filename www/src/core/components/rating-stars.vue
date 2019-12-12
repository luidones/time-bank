<template>
    <span :title="value">
        <fa fixed-width v-for="s in fullStars" icon="star" /><fa fixed-width v-if="hasHalfStar" icon="star-half-alt" /><fa fixed-width v-for="s in emptyStars" :icon="['far', 'star']" />
    </span>
</template>

<script>
const MAX = 5;

export default {
    props: ['value'],
    data: function() {
        const fullStars = Math.floor(this.value);
        const emptyStars = Math.floor(MAX - this.value);
        const hasHalfStar = (fullStars + emptyStars) != MAX;

        return {
            fullStars,
            hasHalfStar,
            emptyStars
        }
    }
}
</script>
