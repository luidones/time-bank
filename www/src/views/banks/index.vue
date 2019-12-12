<i18n>
pt-BR:
    "Member name / skill": "Nome do membro / habilidade"
    "Search": "Pesquisar"
    "Member since": "Membro desde"
    "changed hours": "horas trocadas"
    "reviews": "avaliações"
    "rating": "nota"
</i18n>

<style scoped lang="less">
ul {
    margin: 15px 0 0 0;
    padding: 0;
    list-style: none;
}

ul.members > li {
    float: left;
    width: 300px;
    margin: 0 15px 15px 0;

    .info-box-content {
        margin: 0 !important;

        span {
            display: block;
        }
    }

}
</style>

<template>
    <div>
        <content-header :title="bankName" />

        <section class="content">

            <div class="input-group">
                <input type="text" class="form-control" :placeholder="$t('Member name / skill')" v-model='searchPattern' >
                <span class="input-group-btn">
                    <button type="button" class="btn btn-primary btn-flat">{{ $t('Search') }}</button>
                </span>
            </div>

            <ul class="members">
                <li v-for="r in results">
                    <div class="info-box">
                        <div class="info-box-content">
                            <strong><router-link :to="`/member/${r.id}`">{{ r.name }}</router-link></strong>
                            <span>{{ $t('Member since') }} {{ r.memberSince | date() }}</span>
                            <span>{{ r.changedHours }} {{ $t('changed hours') }}</span>
                            <span>{{ r.reviews }} {{ $t('reviews') }}</span>
                            <!-- <span class="info-box-text">CPU Traffic</span>
                            <span class="info-box-number">90<small>%</small></span> -->

                            <ul>
                                <li v-for="s in r.skills">
                                    {{ s.name }}
                                    ({{ $t('rating') }}: {{ s.rating }})
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
import ContentHeader from '@/core/components/content-header';
import { FormatDateFilter } from '@/filters/date';

export default {
    components: { ContentHeader },
    filters: { date: FormatDateFilter },
    data: function() {
        return {
            bankName: 'Santos e Região',
            searchPattern: '',
            results: [{
                id: 1,
                name: 'Joãozinho Trinta',
                memberSince: new Date('2019-01-01'),
                changedHours: 80,
                reviews: 12,
                skills: [
                    { name: 'Aulas de Dança', rating: 5 },
                    { name: 'Aulas de Inglês', rating: 4 },
                    { name: 'Psicoterapia', rating: 4 }
                ]
            }, {
                id: 2,
                name: 'Walter Kovacs',
                memberSince: new Date('2019-01-01'),
                changedHours: 40,
                reviews: 40,
                skills: [
                    { name: 'Detetive', rating: 5 },
                    { name: 'Matador de aluguel', rating: 5 }
                ]
            }]
        }
    }
}
</script>
