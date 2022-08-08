let history = $('#searchedCities')
let fetchBtn = $('#search-button');
let container = $('.container');
let input = $('#input');


let cities = [];
var today = moment().format('L');

function getAPI () {
    let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${input.val()}&units=imperial&appid=d7a979ae025fc214efa07b190d9c63f7`;
    // let icon = ``;


    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })  
    .then(response => {
		console.log(response)
		console.log(response.list[0])
        let data = response.list[0];

       let today = (moment().format('dddd MMMM Do YYYY'));

        data = `<div id="weather-stats">
                <p>${today}</p>
                <p>Temperature: ${data.main.temp}</p>
                <p>${data.weather.icon}</p>
                <p>Humidity: ${data.main.humidity}<p/>
                <p>Wind Speed: ${data.wind.speed} MPH</p>
                </div>`
        ;


        document.querySelector('.container').insertAdjacentHTML("afterbegin", data);

    })
};
fetchBtn.click((event) => {
    
    event.preventDefault();
    console.log(input.val());
    citySearch = input.val()
    console.log(citySearch)
    cities.push(citySearch)
    localStorage.setItem('search-history', JSON.stringify(cities));
    getAPI();
    loadCities();
    });

    function loadCities() {
        let storedCities = localStorage.getItem('search-history');
        console.log(storedCities)
        let bigCities = JSON.parse(storedCities);
        history.empty();
                for (let index = 0; index < bigCities.length; index++) {
             const element = bigCities[index];
            let cityli = document.createElement('li');
            cityli.textContent = element;
            history.append(cityli);
        }
//         $(bigCities).each(function (index) {
//             let cityli = document.createElement('li');
//             cityli.textContent = index;
//             history.append(cityli);
//         })
}
    
// When user searches for city we save that city in local storage 
// Pull local storage (getItem) loop through all the items and add them to the history 
// create, textContent, append