import moment from 'moment'

const formatHour = (hour) => (hour > 12) ? hour - 12 : hour

const getAMPM = (hour, cap = false) => {
    if (cap) return (hour > 11) ? 'PM' : 'AM'
    else return (hour > 11) ? 'pm' : 'am'
}

const isExpired = (expireAt) => {
    const dateTime = moment(expireAt).valueOf()
    const oneMonthLater = moment().add(1, 'month').valueOf()
    return dateTime < oneMonthLater
}

export {
    formatHour,
    getAMPM,
    isExpired
}