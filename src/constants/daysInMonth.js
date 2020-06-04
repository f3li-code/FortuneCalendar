export const monthKeys = {
    JAN : '1Jan',
    FEB : '2Feb',
    MAR : '3Mar',
    APR : '4Apr',
    MAY : '5May',
    JUN : '6Jun',
    JUL : '7Jul',
    AUG : '8Aug',
    SEP : '9Sep',
    OCT : 'aOct',
    NOV : 'bNov',
    DEC : 'cDec',
}


export const daysof = {
    JAN: 31,
    FEB: 29,
    MAR: 31,
    APR: 30,
    MAY: 31,
    JUN: 30,
    JUL: 31,
    AUG: 31,
    SEP: 30,
    OCT: 31,
    NOV: 30,
    DEC: 31
}
export const daysin = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const convertDateToDay = (date) => {
    switch (date) {
        case 0 : 
            return 'Sunday'
        case 1 : 
            return 'Monday'
        case 2 : 
            return 'Tuesday'
        case 3 : 
            return 'Wednesday'
        case 4 : 
            return 'Thursday'
        case 5 : 
            return 'Friday'
        case 6 : 
            return 'Saturday'
        default: 
            return 'error [daysInMonth.js] convertDateToDay';
    }
    // return 'error [daysInMonth.js] convertDateToDay';
}

export const convertMonthToKey = str => {
    return monthKeys[str];
}

export const daysInWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];