const axios = require('axios');

const months = [null, '1Jan', '2Feb', '3Mar', '4Apr', '5May', '6Jun', '7Jul', '8Aug', '9Sep', 'aOct', 'bNov', 'cDec'];
let year = {
    '1Jan': {},
    '2Feb': {},
    '3Mar': {},
    '4Apr': {},
    '5May': {},
    '6Jun': {},
    '7Jul': {},
    '8Aug': {},
    '9Sep': {},
    'aOct': {},
    'bNov': {},
    'cDec': {}
}
let day = {
    busInfo: {
        102: {
            driver: '',
            customer: '',
            route: {
                from: '',
                to: ''
            },
            type: ''
        },
        108: {
            driver: '',
            customer: '',
            route: {
                from: '',
                to: ''
            },
            type: ''
        },
        109: {
            driver: '',
            customer: '',
            route: {
                from: '',
                to: ''
            },
            type: ''
        },
        168:  {
            driver: '',
            customer: '',
            route: {
                from: '',
                to: ''
            },
            type: ''
        },
        801: {
            driver: '',
            customer: '',
            route: {
                from: '',
                to: ''
            },
            type: ''
        }
    },
    notes: ''
}
for (let i = 1; i <= 12; i++) {
    let month = {0: null};

    if (i == 2) {
        for (let j = 1; j <= 29; j++) {
            month = {
                ...month,
                [j]: {
                    ...day
                }
            }
        }
    } else if (i === 4 || i === 6 || i === 9 || i === 11) {
        for (let j = 1; j <= 30; j++) {
            month = {
                ...month,
                [j]: {
                    ...day
                }
            }
        }
    } else {
        for (let j = 1; j <= 31; j++) {
            month = {
                ...month,
                [j]: {
                    ...day
                }
            }
        }
    }
    year = {
        ...year,
        [months[i]]: month
    }
}
// console.log('feb', year);

const testMonth = {test: true};

// axios.post('https://fortunetrees.firebaseio.com/calendar20_23/.json', year)
//     .then(res => {
//         console.log(res.data);
//     })
//     .catch(error => {
//         console.log(error);
//     })