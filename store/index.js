export const state = () => ({
    showlang: false,
    weather: {
        description: '',
        icon: '',
        id: '800',
        main: '',
    },
    weatherDescription: '',
    weatherIcon:'',
})

export const mutations = {
    toggleLang(state) {
        state.showlang = !state.showlang;
    },
    updateWeather(state, data) {
        state.weather = data;
    },

}


export const actions = {
    async getForecast({ }, city) {
        let res = await this.$axios.get("https://api.openweathermap.org/data/2.5/forecast", {
            params: {
                q: city,
                units: "imperial",
                appid: "91afaf2ec7d70c0d06fb15ab8a3e4d81"
            }
        })
        return res;
    },
    async getWeather({ commit }, city) {
        let res = await this.$axios.get("https://api.openweathermap.org/data/2.5/weather", {
            params: {
                q: city,
                units: "imperial",
                appid: "91afaf2ec7d70c0d06fb15ab8a3e4d81"
            }
        });
        if (res.status === 200) {
            commit('updateWeather', res.data.weather[0]);
        }
        return res.status;
    }
}