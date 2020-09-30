export const state = () => ({
    showlang: false,
})

export const mutations = {
    toggleLang(state) {
        state.showlang = !state.showlang;
    }
}


export const actions = {
    async getWeather({ }, city) {
        let res = await this.$axios.get("https://api.openweathermap.org/data/2.5/forecast", {
            params: {
                q: city,
                units: "imperial",
                appid: "91afaf2ec7d70c0d06fb15ab8a3e4d81"
            }
        })
        return res;
    }
}