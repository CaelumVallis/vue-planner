<template>
  <div class="weather-widget-wrapper">    
    <div class="weather-search">
      <input v-model="city" class="search-city" type="text" placeholder="Search city...">
      <button @click="getWeather">
        &#128269;
      </button>
    </div>
    <div v-if="searched" class="weather-information">
      <div class="weather-statement">{{ weather.statement }}<img :src="weather.icon"></div>
      <div class="weather-temperature">{{ weather.temperature }}</div>
      <div class="weather-min-max-temp">
        <div class="weather-min-temperature">{{ weather.minTemperature }}<i class="fas fa-temperature-low"></i></div>
        <div class="weather-max-temperature">{{ weather.maxTemperature }}<i class="fas fa-temperature-high"></i></div>
      </div>
      <div class="weather-additional-info">
        <div class="weather-location-info">
          <i class="fas fa-map-marker-alt"></i>
          <p>{{ weather.localInfo }}</p>
        </div>
        <div class="weather-humidity">{{ weather.humidity }}<i class="fas fa-tint"></i></div>
      </div>
    </div>
    <div v-else class="weather-initial-message">Please, enter correct city🌞</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        API_KEY: 'e4ca8e74b9ce1d7d81d543944f39117c',
        city: '',
        searched: false,
        error: false,
        weather: {
          localInfo: undefined,
          country: undefined,
          temperature: undefined,
          city: undefined,
          description: undefined,
          statement: undefined,
          humidity: undefined,
          feelsLike: undefined,
          minTemperature: undefined,
          maxTemperature: undefined,
          icon: undefined
        }
      }
    },
    methods: {
      async getWeather() {
        try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.API_KEY}`);
          const data = await response.json();
          if (data.cod === 200) {
            this.setWeatherData(data);
            this.setToLocalStorage();
            this.searched = true;
            this.error = false;
          } else {
            this.error = true;
            this.searched = false;
          }
        } catch (error) {
          console.log(error)
        }
      },
      formatTemperature(temperature) {
        return Math.round(temperature - 273) + '°';
      },
      setWeatherData(data) {
        this.weather.temperature = this.formatTemperature(data.main.temp);
        this.weather.minTemperature = this.formatTemperature(data.main.temp_min);
        this.weather.maxTemperature = this.formatTemperature(data.main.temp_max);
        this.weather.statement = data.weather[0].main;
        this.weather.localInfo = data.sys.country + ', ' + data.name;
        this.weather.description = data.weather[0].description;
        this.weather.humidity = data.main.humidity;
        this.weather.icon = require(`../../assets/icons/${data.weather[0].icon}.png`);
      },
      setToLocalStorage() {
        const city = localStorage.setItem('weather', this.city);
      }
    },
    async mounted() {
      const prevCity = localStorage.getItem('weather');

      if (prevCity !== null) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${prevCity}&appid=${this.API_KEY}`);
        const data = await response.json();
        this.setWeatherData(data);
        this.searched = true;
      }
    }
  }
</script>

<style scoped>

.weather-widget-wrapper {
  color: #fff;
  height: 600px;
  background-image: url('../../assets/img/background.gif');
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
}

.weather-search {
  display: flex;
  justify-content: center;
  width: 250px;
  padding-top: 25px;
  position: relative;
}

.search-city {
  color: #fff;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  border: none;
  border-bottom: 2px solid #fff;
  outline: none;
  height: 36px;
}

.search-city::placeholder {
  color: #fff;
  text-transform: lowercase;
}

button {
  background-color: transparent;
  outline: none;
  border: none;
  position: absolute;
  right: 25px;
  top: 30px;
} 

.weather-information {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.weather-statement {
  font-size: 40px;
  margin-top: 10px;
  font-weight: bold;
}

.weather-temperature {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 120px;
  height: 150px;
  font-weight: bold;
  flex-grow: 2;
}

.weather-min-max-temp {
  display: flex;
  width: 100%;
  font-size: 45px;
  font-weight: bold;
  height: 125px;
}

.weather-min-max-temp div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
}

.weather-min-max-temp i {
  font-size: 25px;
  margin-left: 15px;
}

.weather-additional-info {
  font-size: 25px;
  display: flex;
  width: 100%;
  flex-grow: 2;
}

.weather-location-info {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  font-size: 25px;
  font-weight: bold;
  height: 125px;
  text-align: center;
}

.weather-location-info p {
  margin-bottom: 0;
}

.weather-location-info i {
  font-size: 25px;
  margin-left: 15px;
}

.weather-humidity {
  font-size: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  font-weight: bold;
}

.weather-humidity i {
  font-size: 25px;
  margin-left: 15px;
}

.weather-initial-message {
  height: 100%;
  font-size: 35px;
  display: flex;
  align-items: center;
  font-weight: bold;
  text-align: center;
  padding: 0 30px;
}

</style>