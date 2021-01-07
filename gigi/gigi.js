console.log('gigi.js')

let today = new Date()
let bDay = new Date('05/10/2021')

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

function dateDiffInDays(a, b) {
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

    return Math.floor((utc2 - utc1) / _MS_PER_DAY)
}

let counter = dateDiffInDays(today, bDay)

document.getElementById('days').innerHTML = counter