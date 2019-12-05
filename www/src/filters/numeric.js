import { NUMERIC_SETTINGS, Notifier } from '@/core/locale';

let numericSettings = NUMERIC_SETTINGS;
Notifier.subscribe(() => numericSettings = NUMERIC_SETTINGS);

export function NumberFilter (value, precision = 2) {
    const nValue = +value;

    return value && !isNaN(nValue) && accounting.formatNumber(nValue, {
        decimal: numericSettings.decimal,
        thousand: numericSettings.thousands,
        precision: precision
    });
}
