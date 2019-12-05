export function LimitTextFilter (value, maxLength) {
    return value.length < maxLength ? value
         : `${value.substring(0, maxLength - 4)} ...`;
}
