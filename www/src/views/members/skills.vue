<i18n>
en:
    "rating_value": "rating: {0}"
    "raviews_count": "({0} reviews)"
pt-BR:
    "rating_value": "nota: {0}"
    "reviews_count": "({0} avaliações)"
    "I liked! I want to book it!": "Gostei, quero solicitar um horário!"
</i18n>

<style scoped lang="less">
ul {
    margin: 0;
    padding: 0;
    list-style-type: none;

    li {
        margin-bottom: 12px;

        p > span { margin-right: 10px; }
        p > span.reviews { font-style: italic; }
    }

    li:last-child { margin-bottom: 0; }
}
</style>

<template>
    <ul>
        <li v-for="s in skills">
            <p>
                <span>{{ s.name }}</span>
                <rating-stars :value="s.rating" />
                <span class="reviews">{{ $t('reviews_count', [s.reviews]) }}</span>
            </p>
            <p>{{ s.description }}</p>
            <button>{{ $t('I liked! I want to book it!') }}</button>
        </li>
    </ul>
</template>

<script>
import RatingStars from '@/core/components/rating-stars';

export default {
    props: ['skills'],
    components: { RatingStars }
}
</script>
