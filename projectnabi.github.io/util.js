export function formatDate(dt) {
    let year = dt.getFullYear()
    let month = (dt.getMonth() + 1).toString().padStart(2, '0')
    let day = dt.getDate().toString().padStart(2, '0')
    return year + '-' + month + '-' + day
}

export function parseDate(dtStr) {
    return Date.parse(dtStr + '0:00')
}