const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'

const data = fetch(endpoint)

const cities = []

fetch(endpoint)
    .then(res => res.json())
    .then(res => cities.push(...res))

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function finder(search, arr){
    return arr.filter( place => {
        const regex = new RegExp(search, 'gi')
        return place.city.match(regex) || place.state.match(regex)
    })
}

function showMatches(){
    const matchArr = finder(this.value, cities)
    html = matchArr.map(place => {
        const regex = new RegExp(this.value, 'gi')
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`)
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`)
        return `
        <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
        </li>
        `
    }).join('')
    suggestions.innerHTML = html
}

const place = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')

place.addEventListener('change', showMatches)
place.addEventListener('keyup', showMatches)