import axios from 'axios';

export function delay (delay) {
    return new Promise(resolve => setTimeout(resolve, delay + Math.random() * 1000))
}
  
export function makeCall(url, params, delayTime) {
    return delay(delayTime)
        .then(() => axios.get(url, params))
        .then(response => {
        if (!Array.isArray(response.data)) {
            console.log('Retry ' + url)
            return delay(1000).then(() => axios.get(url, params))
        }

        return response
        })
}