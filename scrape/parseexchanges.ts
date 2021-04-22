import axios from 'axios'

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

axios.get('https://financialmodelingprep.com/api/v3/available-traded/list?apikey=330341c89f90e4e610a40cf70b0b49bd')
    .then(response => response.data
        .map(d => d.exchange)
        .filter(onlyUnique))
    .then(exchanges => console.log(exchanges))