<i18n>
pt-BR:
    "Member since": "Membro desde"
    "changed hours": "horas trocadas"
    "reviews": "avaliações"
    "Skills": "Habilidades"
    "rating": "nota"
    "Reviews": "Avalicações"
</i18n>

<style scoped lang="less">
.member-info {
    span { display: block; }
}
</style>

<template>
    <div>
        <content-header :title="name" />

        <section class="content">
            <div class="member-info">
                <p>{{ presentation }}</p>
                <p>
                    <span>{{ $t('Member since') }} {{ memberSince | date() }}</span>
                    <span>{{ changedHours }} {{ $t('changed hours') }}</span>
                    <span>{{ reviews }} {{ $t('reviews') }}</span>
                </p>
            </div>

            <div class="nav-tabs-custom">
                <ul class="nav nav-tabs">
                    <li class="active">
                        <a href="#skills" data-toggle="tab">{{ $t('Skills') }}</a>
                    </li>
                    <li>
                        <a href="#reviews" data-toggle="tab">{{ $t('Reviews') }}</a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane active" id="skills">
                        <member-skills :skills="skills" />
                    </div>
                    <div class="tab-pane" id="reviews">
                        revieeews
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import ContentHeader from '@/core/components/content-header';
import { FormatDateFilter } from '@/filters/date';
import MemberSkills from '@/views/members/skills';

export default {
    components: { ContentHeader, MemberSkills },
    filters: { date: FormatDateFilter },
    data: function() {
        return {
            id: 1,
            name: 'Joãozinho Trinta',
            presentation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sem velit, sodales sed justo ut, elementum varius erat. Fusce dictum libero ut tortor tempus, vitae venenatis purus fermentum. Etiam eu accumsan libero. Morbi facilisis elit ut pellentesque blandit.',
            memberSince: new Date('2019-01-01'),
            changedHours: 80,
            reviews: 12,
            overallRating: 4.3,
            skills: [
                {
                    name: 'Aulas de Dança',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sem velit, sodales sed justo ut, elementum varius erat. Fusce dictum libero ut tortor tempus, vitae venenatis purus fermentum. Etiam eu accumsan libero. Morbi facilisis elit ut pellentesque blandit. Vestibulum venenatis, massa in semper porttitor, urna sapien rutrum quam, eget pellentesque diam metus vitae turpis. Vivamus velit erat, ullamcorper a tellus iaculis, sodales faucibus lectus. ',
                    rating: 5,
                    reviews: 2
                },
                {
                    name: 'Aulas de Inglês',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sem velit, sodales sed justo ut, elementum varius erat. Fusce dictum libero ut tortor tempus, vitae venenatis purus fermentum. Etiam eu accumsan libero. Morbi facilisis elit ut pellentesque blandit. Vestibulum venenatis, massa in semper porttitor, urna sapien rutrum quam, eget pellentesque diam metus vitae turpis. Vivamus velit erat, ullamcorper a tellus iaculis, sodales faucibus lectus. ',
                    rating: 4,
                    reviews: 20
                },
                {
                    name: 'Psicoterapia',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sem velit, sodales sed justo ut, elementum varius erat. Fusce dictum libero ut tortor tempus, vitae venenatis purus fermentum. Etiam eu accumsan libero. Morbi facilisis elit ut pellentesque blandit. Vestibulum venenatis, massa in semper porttitor, urna sapien rutrum quam, eget pellentesque diam metus vitae turpis. Vivamus velit erat, ullamcorper a tellus iaculis, sodales faucibus lectus. ',
                    rating: 3.2,
                    reviews: 11
                }
            ]
        }
    }
}
</script>
