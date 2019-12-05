import Vue from 'vue';
import VeeValidate from 'vee-validate';
import { INITIAL_LOCALE } from './locale';

Vue.use(VeeValidate);

VeeValidate.Validator.localize({
    en: {
        messages: {
            required: 'This field is required',
            email: 'Invalid e-mail',
            regex: 'Invalid value',
            min: (field, min) => `This field must have at least ${min} characters`,
            max: (field, max) => `This field may not have more than ${max} characters`
        }
    },
    "pt-BR": {
        messages: {
            required: 'Este campo é obrigatório',
            email: 'E-mail inválido',
            regex: 'Valor inválido',
            min: (field, min) => `Este campo precisa ter pelo menos ${min} caracteres`,
            max: (field, max) => `Este campo precisa ter no máximo ${max} caracteres`
        }
    }
});

VeeValidate.Validator.localize(INITIAL_LOCALE);

export default VeeValidate.Validator;
