function attachEvents() {
    const baseUrl = "https://judgetests.firebaseio.com/";

    $('#submit').click(getWeather);

    async function getWeather() {
        try {
            let weather = await $.ajax({
                url: baseUrl + 'locations.json',
                method: 'GET'
            });
            let townName = $('#location').val();
            let code = weather.filter(t => t.name === townName)[0].code;
            let locationWeatherToday = await $.ajax({
                url: baseUrl + 'forecast/today/' + `${code}.json`,
                method: 'GET'
            });
            let locationWeatherUpcoming = await $.ajax({
                url: baseUrl + 'forecast/upcoming/' + `${code}.json`,
                method: 'GET'
            });
            $('#forecast').css('display', 'block');
            let todayDiv = $(`<span class="condition symbol">${getCondition(locationWeatherToday.forecast.condition)}</span>
            <span class="condition">
                <span class="forecast-data">${locationWeatherToday.name}</span>
                <span class="forecast-data">${locationWeatherToday.forecast.low}&#176;/${locationWeatherToday.forecast.high}&#176;</span>
                <span class="forecast-data">${locationWeatherToday.forecast.condition}</span>
            </span>
            `);
            $('#current').append(todayDiv);

            for (let day of locationWeatherUpcoming.forecast) {
                let div = $(`<span class="upcoming">
                                <span class="symbol">${getCondition(day.condition)}</span>
                                <span class="forecast-data">${day.low}&#176;/${day.high}&#176;</span>
                                <span class="forecast-data">${day.condition}</span>
                            </span>`);
                $('#upcoming').append(div);
            }

            function getCondition(condition) {
                switch(condition) {
                    case 'Sunny':
                        return '&#x2600';
                    case 'Partly sunny':
                        return '&#x26C5';
                    case 'Overcast':
                        return '&#x2601';
                    case 'Rain':
                        return '&#x2614';
                }
            }
        } catch(err) {
            $('#forecast').css('display', 'block');
            $('#forecast').text('Error');
        }    
    }
}
