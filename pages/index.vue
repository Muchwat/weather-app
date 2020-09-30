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
              <rain color="#9449fe" height="150" width="150"></rain>
            </center>
            <p class="w-title">Rain</p>
            <p class="w-desc">Light rain</p>
          </div>
          <br />
          <div class="temp">
            <p class="w-title">Tempereture</p>
            <div class="value">
              <span>12</span>
              <celcius color="black" height="30" width="30"></celcius>
            </div>
          </div>
          <div class="city">
            <p>New York</p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="nav-bar">
          <div class="lang">
            <p class="lang-title">English</p>
            <div class="lang-dropdown">
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

          <div class="avatar">
            <img src="~/assets/profile.jpg" />
          </div>
        </div>
        <div class="main-content">
          <line-chart></line-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: "",
      chart: null,
      dates: [],
      temps: [],
      loading: false,
      errored: false
    };
  },
  async asyncData({ $axios }) {
    let response = await $axios.$get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          q: "cairo",
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
    _to12(dt) {
      var hours = dt.getHours(); // gives the value in 24 hours format
      var AmOrPm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      var finalTime = hours + AmOrPm;
      return finalTime;
    },
    async fetchWeather(e) {
      console.log(event.key);
      if (e.key == "Enter") {
        let response = await this.$store.dispatch("getWeather", this.city);
        this.dates = response.data.list.map(list => {
          let dt = new Date(list.dt_txt);
          return dt.getMonth() + "/" + dt.getDate() +"@"+ this._to12(dt);
        });

        this.temps = response.data.list.map(list => {
          return list.main.temp;
        });
        console.log(this.dates);
      }
    }
    // fetchWeather() {
    //   this.$axios
    //     .get("https://api.openweathermap.org/data/2.5/forecast", {
    //       params: {
    //         q: "cairo",
    //         units: "imperial",
    //         appid: "91afaf2ec7d70c0d06fb15ab8a3e4d81"
    //       }
    //     })
    //     .then(response => {
    //       this.dates = response.data.list.map(list => {
    //         return list.dt_txt;
    //       });

    //       this.temps = response.data.list.map(list => {
    //         return list.main.temp;
    //       });
    //     })
    //     .catch(err => console.log(err));
    // }
  }
};
</script>

<style lang="scss">
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
        }
        .fahrenheit {
          float: left;
          margin-top: 16px;
          background: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
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
    }
  }
}
@include phone {
  .container {
    background: red;
  }
}
</style>
