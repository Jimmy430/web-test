export const setExtendFunctions = () => {
    String.prototype.capped = function () {
        switch (this.length) {
            case 0: return ''
            case 1: return this.toUpperCase()
            default: return this[0].toUpperCase() + this.slice(1)
        }
    }
    String.prototype.isValidEmail = function () {
        if (this == null) return false
        const mailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return mailFormat.test(this)
    }
    Number.prototype.pad = function (digit = 2) {
        if (this >= Math.pow(10, digit)) return this.toString()

        const zeros = "0"
        return (zeros.repeat(digit) + this).slice(-digit)
    }
}