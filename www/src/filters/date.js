import Vue from 'vue';

export function FormatDateFilter (value, formatOption = 'date') {
    const format = Vue.i18n.t(`formats.${formatOption}.value`);

    if (typeof(value) === 'string')
        value = new Date(value);

    return value && !isNaN(value) && value.format(format);
}

export function RelativeDateFilter(value) {
    if (typeof(value) === 'string')
        value = new Date(value);

    return value && !isNaN(value) && moment(value).fromNow();
}
