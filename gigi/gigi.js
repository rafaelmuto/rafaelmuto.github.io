console.log('>> gigi.js')

const _MS_PER_DAY = 1000 * 60 * 60 * 24


const today = new Date()
const b_date = new Date('05/10/1991')
const first_date = new Date('11/21/2020')
const first_ily_date = new Date('01/01/2021')
const ani_date = new Date('02/26/2021')


function dateDiffInDays(a, b) {
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

    return Math.floor((utc2 - utc1) / _MS_PER_DAY)
}

function dateTodayDiffThisYearInDays(date) {
    const this_year = new Date()

    const utc1 = Date.UTC(this_year.getFullYear(), this_year.getMonth(), this_year.getDate())
    const utc2 = Date.UTC(this_year.getFullYear(), date.getMonth(), date.getDate())

    result = Math.floor((utc2 - utc1) / _MS_PER_DAY)
    
    return result < 0 ? 365 : result
}

document.getElementById('b_day').innerHTML = dateTodayDiffThisYearInDays(b_date)
document.getElementById('text').innerHTML =
    'Há ' +
    dateDiffInDays(first_date, today) +
    ' dias nos achamos nesse mundo. E nos declaramos pela primeira vez há ' +
    dateDiffInDays(first_ily_date, today) +
    '. E já faz ' +
    dateDiffInDays(ani_date, today) +
    ' dias que dormimos juntinhos todas as noites...'
