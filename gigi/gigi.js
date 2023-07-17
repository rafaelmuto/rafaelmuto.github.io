console.log('>> gigi.js')

const today = new Date()
// 10 - 05 - 1991
const first_date = new Date('11/21/2020')
const first_ily_date = new Date('01/01/2021')
const ani_date = new Date('02/26/2021')


function getDaysDifference(startDate, endDate) {
    // Calculate the time difference in milliseconds
    const timeDiff = endDate.getTime() - startDate.getTime();

    // Convert milliseconds to days
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    // Factor in leap years
    const leapYears = countLeapYears(startDate, endDate);
    const adjustedDaysDiff = daysDiff - leapYears;

    return adjustedDaysDiff;
}

function countLeapYears(startDate, endDate) {
    let count = 0;
    for (let year = startDate.getFullYear(); year <= endDate.getFullYear(); year++) {
            if (isLeapYear(year)) {
                count++;
            }
}
return count;
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}


function getNextGigiHappyDay()
{
    let d = new Date()
    let year = d.getFullYear()
    let month = d.getMonth() + 1
    let day = d.getDate()

    if(month > 5  && day > 10) {
        year++
    } 

    return new Date(year + '/' + month + '/' + day + 1)
}



document.getElementById('b_day').innerHTML = getDaysDifference(getNextGigiHappyDay(), today)

document.getElementById('text').innerHTML =
    'Há ' +
    getDaysDifference(first_date, today) +
    ' dias nos achamos nesse mundo. E nos declaramos pela primeira vez há ' +
    getDaysDifference(first_ily_date, today) +
    '. E já faz ' +
    getDaysDifference(ani_date, today) +
    ' dias que dormimos juntinhos todas as noites...'
