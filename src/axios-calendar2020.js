import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://fortunetrees.firebaseio.com/calendar20_23/-M3UiMA3NEZNDW3ErfHN/'
})

export default instance;