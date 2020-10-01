export const state = () => ({
    showlang: false,
    screen: 'map',
    lang: 'en',
    tempUnit: 0,
    city: 'nairobi',
    dates: [],
    temps: [],
    coordinates: {
        lon: 0,
        lat: 0
    },
    name: 'Unknown',
    weather: {
        description: '',
        icon: '',
        id: '800',
        main: '',
    },
    main: {
        temp: 0,
        feels_like: 0,
        temp_min: 0,
        temp_max: 0,
        pressure: 0,
        humidity: 0
    },
    weatherDescription: '',
    weatherIcon: '',
})

export const mutations = {
    toggleLang(state) {
        state.showlang = !state.showlang;
    },
    updateWeather(state, data) {
        state.weather = data.weather[0];
        state.main = data.main;
        state.name = data.name;
        state.coordinates = data.coord;
    },
    updateChartData(state, data) {
        state.dates = data.dates;
        state.temps = data.temps;
    },
    updateCity(state, data) {
        state.city = data;
    },
    updateScreen(state, data) {
        state.screen = data;
    },
    toFahrenheit(state) {

        if (state.tempUnit == 1) {
            state.main.temp =  Math.round((parseFloat(state.main.temp) * 9/5) + 32);
            state.tempUnit = 0;
        }

        console.log('to Fahrenheit clicked', state.tempUnit);
    },
    toCelcius(state) {
        if (state.tempUnit == 0) {
            state.main.temp = Math.round((parseFloat(state.main.temp) - 32) / 1.8);

            state.tempUnit = 1;
        }

        console.log('to celcius clicked', state.tempUnit);
    },
}

export const actions = {
    async getForecast({ commit }, city) {
        let res = await this.$axios.get("https://api.openweathermap.org/data/2.5/forecast", {
            params: {
                q: city,
                units: "imperial",
                appid: "91afaf2ec7d70c0d06fb15ab8a3e4d81"
            }
        });

        function _to12(dt) {
            var hours = dt.getHours();
            var AmOrPm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12 || 12;
            var finalTime = hours + AmOrPm;
            return finalTime;
        }

        var dates = res.data.list.map(list => {
            let dt = new Date(list.dt_txt);
            return dt.getMonth() + "/" + dt.getDate() + "@" + _to12(dt);
        });

        var temps = res.data.list.map(list => {
            return list.main.temp;
        });
        var data = { dates, temps };
        commit('updateChartData', data);
        commit('updateCity', city);
        return data;
    },
    async getWeather({ commit, state }, city) {
        let res = await this.$axios.get("https://api.openweathermap.org/data/2.5/weather", {
            params: {
                q: city,
                units: "imperial",
                lang: state.lang,
                appid: "91afaf2ec7d70c0d06fb15ab8a3e4d81"
            }
        });
        if (res.status === 200) {
            commit('updateWeather', res.data);
            commit('updateCity', city);
        }
        return res.status;
    },
    async switchLang({ commit, state }, lang) {
        let res = await this.$axios.get("https://api.openweathermap.org/data/2.5/weather", {
            params: {
                q: state.city,
                units: "imperial",
                lang: lang,
                appid: "91afaf2ec7d70c0d06fb15ab8a3e4d81"
            }
        });
        if (res.status === 200) {
            commit('updateWeather', res.data);
        }
        return res.status;
    }
}