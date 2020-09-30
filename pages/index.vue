<template>
  <div class="container">
    <div class="w-app">
      <div class="side-menu">
        <div class="search-bar">
          <search-icon class="search-icon" height="20" width="20"></search-icon>
          <input
            class="search-input"
            type="text"
            placeholder="Search city..."
            v-model="city"
            @keypress="fetchWeather"
          />
        </div>
        <div class="side-bar-main">
          <div class="w-icon">
            <center>
              <!-- <rain color="#008cff" height="150" width="150"></rain> -->
              <div style="height:150px; width:150px;" >
                 <object type="image/svg+xml" style="fill:red;" :data="require(`~/assets/images/${$store.state.weather.id}.svg`)">
                  <img :src="require(`~/assets/images/${$store.state.weather.id}.svg`)" />
                </object>
              </div>
             
            </center>
            <p class="w-title">{{ $store.state.weather.main }}</p>
            <p class="w-desc">{{ $store.state.weather.description }}</p>
          </div>
          <br />
          <div class="temp">
            <p class="w-title">Tempereture</p>
            <div class="value">
              <span>{{$store.state.main.temp}}</span>
              <celcius color="black" height="30" width="30"></celcius>
            </div>
          </div>
          <div class="city">
            <p>{{$store.state.name}}</p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="nav-bar">
          <div class="lang" @click="$store.commit('toggleLang')">
            <p class="lang-title">English</p>
            <div class="lang-dropdown" v-show="$store.state.showlang">
              <ul>
                <li @click="setLang('af')">Afrikaans</li>
                <li @click="setLang('al')">Albanian</li>
                <li @click="setLang('ar')">Arabic</li>
                <li @click="setLang('en')">English</li>
                <li @click="setLang('fa')">Persian (Farsi)</li>
                <li @click="setLang('fr')">French</li>
                <li @click="setLang('gl')">Galician</li>
              </ul>
            </div>
          </div>

          <div class="celcius">
            <celcius color="black" height="10" width="10"></celcius>
          </div>

          <div class="fahrenheit">
            <fahrenheit color="black" height="10" width="10"></fahrenheit>
          </div>

          <div class="tooltip">
            <div class="forecast" @click="fetchForecast()">
              <forecast color="black" height="11" width="11"></forecast>
            </div>
            <span class="tooltiptext">Forecast</span>
          </div>

          <div class="tooltip">
            <div class="marker" @click="$store.commit('updateScreen', 'map')">
              <gmarker color="black" height="12" width="12"></gmarker>
            </div>
            <span class="tooltiptext">Google Map</span>
          </div>

          <div class="avatar">
            <img src="~/assets/profile.jpg" />
          </div>
        </div>
        <div class="main-content">
          <line-chart v-show="$store.state.screen == 'chart'"></line-chart>
          <city-map v-show="$store.state.screen == 'map'"></city-map>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: 'nairobi',
      chart: null,
      dates: [],
      temps: [],
      loading: false,
      errored: false
    };
  },
  async asyncData({ $axios }) {
    let response = await $axios.$get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: "nairobi",
          units: "imperial",
          appid: "91afaf2ec7d70c0d06fb15ab8a3e4d81"
        }
      }
    );
    return { response };
  },
  methods: {
    covert() {
      var celcius = Math.round(parseFloat(d.main.temp) - 273.15);
      var fahrenheit = Math.round(
        (parseFloat(d.main.temp) - 273.15) * 1.8 + 32
      );
    },
    async setLang(lang) {
      let response = await this.$store.dispatch("switchLang", lang);
        console.log(this.city, response);
    },
    async fetchWeather(e) {
      if (e.key == "Enter") {
        this.$store.dispatch("getWeather", this.city);
        this.$store.dispatch("getForecast", this.city);
      }
    },
    fetchForecast() {
      this.$store.commit('updateScreen', 'chart');
      this.$store.dispatch("getForecast", this.city);
    }
  }
};
</script>

<style lang="scss">
svg {
    fill: #c253ff;

    circle, line, path {
        fill:  #c253ff;
    }

    &:hover {
        fill:  #c253ff;

        circle, line, path {
            fill:  #c253ff;
        }
    }
}
@include desktop {

  .container {
    height: 100vh;
    width: 100%;
    margin: 0 auto;
    background-image: linear-gradient(
      to left top,
      #6060fc,
      #855dff,
      #a559ff,
      #c253ff,
      #dd4cfc
    );
    display: flex;
    justify-content: center;
    align-items: center;
    .w-app {
      height: 500px;
      width: 1000px;
      box-shadow: 0px 0px 5px 4px rgba(0, 0, 0, 0.03);
      background-color: rgba(255, 255, 255, 0.5);
      display: grid;
      grid-template-columns: 300px 700px;
      border-radius: 10px;

      .tooltip {
    position: relative;
    display: inline-block;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: #008cff;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    margin-top: 5px;

    /* Position the tooltip */
    position: absolute;
    z-index: 1;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
  }

      .side-menu {
        background: white;
        height: 500px;
        width: 300px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        opacity: 1;
        .search-bar {
          width: 268px;
          height: 40px;
          border-radius: 20px;
          border: 1px solid #ddd;
          line-height: 40px;
          margin: 16px 16px;
          display: inline-grid;
          grid-template-columns: 40px auto;
          .search-icon {
            place-self: center;
          }
          .search-input {
            width: 100%;
            font: 400 16px "Varela Round", sans-serif;
            border: 0;
            box-sizing: border-box;
            outline: none;
            background: transparent;
            cursor: pointer;
          }
        }

        .side-bar-main {
          .w-icon {
            margin-top: 20px;
          }
          .w-title {
            margin-left: 60px;
            font-size: 1rem;
            font-weight: 500;
          }
          .w-desc {
            margin-left: 60px;
            font-size: 0.8rem;
            font-weight: 100;
          }
          .temp {
            .value {
              font-size: 4rem;
              font-weight: 100;
              padding-left: 60px;
            }
          }
          .city {
            margin-left: 60px;
            font-size: 2rem;
            font-weight: 500;
          }
        }
      }

      .content {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        .nav-bar {
          height: 72px;
          width: 700px;
          border-top-right-radius: 10px;
          background: #dd4cfc;
          .lang {
            width: 100px;
            height: 30px;
            border-radius: 15px;
            background: white;
            float: left;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 16px;
            box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
            cursor: pointer;
            .lang-title {
              // display: inline-block;
              // vertical-align: middle;
            }
            .lang-dropdown {
              ul {
                list-style: none;
                padding: 0;
                margin: 0;
                li {
                  cursor: pointer;
                  padding: 4px;
                }
              }
              position: absolute;
              background: white;
              border-radius: 10px;
              z-index: 2;
              transform: translateY(8rem);
              padding-left: $padding-8;
              padding-right: $padding-8;
              box-shadow: -1px 0px 13px -5px rgba(0, 0, 0, 0.49);
            }
          }
          .celcius {
            float: left;
            margin-top: 16px;
            margin-right: 16px;
            background: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
            cursor: pointer;
          }
          .fahrenheit {
            float: left;
            margin-top: 16px;
            margin-right: 16px;
            background: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
            cursor: pointer;
          }
          .forecast {
            box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
            float: left;
            margin-top: 16px;
            background: white;
            margin-right: 16px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
          .marker {
            box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
            float: left;
            margin-top: 16px;
            margin-right: 16px;
            background: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
          .avatar {
            float: right;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: white;
            margin: 16px;
            img {
              vertical-align: middle;
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }
          }
        }
        .main-content {
          height: 428px;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }
      }
    }
  }
}
@include phone {
  .container {
    background: red;
  }
}
</style>
