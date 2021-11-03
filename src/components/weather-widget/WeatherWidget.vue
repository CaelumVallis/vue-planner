<template>
  <div class="weather-widget-wrapper d-flex flex-column align-items-center">    
    <div class="weather-search d-flex justify-content-center">
      <input 
        v-model="city" 
        class="search-city" 
        type="text" 
        placeholder="Search city...">
      <button 
        @click="getWeather">
        &#128269;
      </button>
    </div>
    <div 
      v-if="searched" 
      class="weather-information d-flex flex-column align-items-center">
      <div class="weather-statement">
        {{ weather.statement }}
        <img 
          :src="weather.icon">
      </div>
      <div class="weather-temperature d-flex justify-content-center align-items-center">
        {{ weather.temperature }}
      </div>
      <div class="weather-min-max-temp d-flex">
        <div class="weather-min-temperature d-flex justify-content-center align-items-center">
          {{ weather.minTemperature }}
          <i class="fas fa-temperature-low"></i>
        </div>
        <div class="weather-max-temperature d-flex justify-content-center align-items-center">
          {{ weather.maxTemperature }}
          <i class="fas fa-temperature-high"></i>
        </div>
      </div>
      <div class="weather-additional-info d-flex">
        <div class="weather-location-info text-center d-flex flex-column justify-content-center align-items-center">
          <i class="fas fa-map-marker-alt"></i>
          <p>{{ weather.localInfo }}</p>
        </div>
        <div class="weather-humidity d-flex justify-content-center align-items-center">
          {{ weather.humidity }}
          <i class="fas fa-tint"></i>
        </div>
      </div>
    </div>
    <div 
      v-else 
      class="weather-initial-message d-flex align-items-center text-center">
      Please, enter correct city🌞
    </div>
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
        localStorage.setItem('weather', this.city);
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
  border-radius: 5px;
}

.weather-search {
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
}

.weather-information i {
  font-size: 25px;
}

.weather-information i:not(.weather-location-info i) {
  margin-left: 15px;
}

.weather-statement {
  font-size: 40px;
  margin-top: 10px;
  font-weight: bold;
}

.weather-temperature {
  color: #fff;
  font-size: 120px;
  height: 150px;
  font-weight: bold;
  flex-grow: 2;
}

.weather-min-max-temp {
  width: 100%;
  font-size: 45px;
  font-weight: bold;
  height: 125px;
}

.weather-min-max-temp div {
  width: 50%;
}

.weather-additional-info {
  font-size: 25px;
  width: 100%;
  flex-grow: 2;
}

.weather-location-info {
  width: 50%;
  font-size: 25px;
  font-weight: bold;
  height: 125px;
  text-align: center;
}

.weather-location-info p {
  margin-bottom: 0;
}

.weather-humidity {
  font-size: 45px;
  width: 50%;
  font-weight: bold;
}

.weather-initial-message {
  height: 100%;
  font-size: 35px;
  font-weight: bold;
  padding: 0 30px;
}

</style>