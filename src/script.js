(() => {
  const templates = {
    hourly: `
    <div class="hourly">
      <div class="time" data-attrib="time"></div>
      <img data-attrib="icon" class="weather_icon" src="./src/svg/10d.svg" width="100" alt="">
      <div>
        <span data-attrib="temp"></span>&#176;
      </div>
    </div>
    `
  }

  const appEl = document.getElementById('search-section');
  const autoCompleteEl = appEl.querySelector(".auto-complete");
  const optionListEl = autoCompleteEl.querySelector(".option-list");
  const searchBoxEl = autoCompleteEl.querySelector(".search-box");
  const locationDetailsEl = appEl.querySelector("#location-details");
  const currentWeatherDayDetailsEl = appEl.querySelector('.current-weather-day-details')
  const hourlyDetailsEl = appEl.querySelector('.weather-hourly')
  const locationUrl = "http://localhost:8080/getLocations";
  const detailsUrl = "http://localhost:8080/details";
  const initalSelectedCity = {
    id: -1,
    name: "",
    state: "",
    country: "",
    coord: {
      lon: -1,
      lat: -1,
    },
  };
  let state = {
    cities: [],
    selectedCity: { ...initalSelectedCity },
    weatherDetails: {}
  };

  var stringToHTML = function (str) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html');
    return doc.body;
  };

  const initialize = () => {
    
  }

  const getDate = (unix_timestamp) => new Date(unix_timestamp * 1000);

  const displayTemp = (temp) => Math.ceil(temp);

  const renderCurrentDay = () => {
    const { current } = state.weatherDetails;
    const { weather } = current;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentWeatherDayDetailsEl.querySelector('#current-weather-day-details img[data-attrib="icon"]').src = `https://raw.githubusercontent.com/basmilius/weather-icons/master/production/line/openweathermap/${weather[0].icon}.svg`;
    currentWeatherDayDetailsEl.querySelector('div[data-attrib="condition"]').innerText = weather[0].description.toUpperCase();
    currentWeatherDayDetailsEl.querySelector('div[data-attrib="date"]').innerText = getDate(current.dt).toLocaleDateString("en-US", options);
    currentWeatherDayDetailsEl.querySelector('span[data-attrib="temp"]').innerText = displayTemp(current.temp);
  }

  const renderHourly = () => {
    const { hourly } = state.weatherDetails;
    hourly.forEach(h => {
      const { weather } = h;
      const template = templates.hourly;
      const dom = stringToHTML(template).querySelector('.hourly');
      dom.querySelector('div[data-attrib="time"]').innerText = getDate(h.dt).toLocaleString('en-US', { hour: 'numeric', hour12: true })
      dom.querySelector('img[data-attrib="icon"]').src = `https://raw.githubusercontent.com/basmilius/weather-icons/master/production/line/openweathermap/${weather[0].icon}.svg`;
      dom.querySelector('span[data-attrib="temp"]').innerText = displayTemp(h.temp);
      hourlyDetailsEl.appendChild(dom);
    })
  }

  const clearList = () => {
    optionListEl.innerHTML = "";
    autoCompleteEl.classList.add("no-options");
  };

  const clearSelectedCity = () => {
    appEl.classList.remove("selected");
  };

  const setSearchBoxValue = () => {
    appEl.classList.add("selected");
    searchBoxEl.value = state.selectedCity.name;
  };

  const setLocationDetails = (city) => {
    locationDetailsEl.innerHTML = getDisplayText(city, " ", ['state','country']);
  };
  const clearIsLoading = () => {
    autoCompleteEl.classList.remove("is-loading");
  };

  const setIsLoading = () => {
    autoCompleteEl.classList.add("is-loading");
  };

  const getDisplayText = (
    city,
    splitBy,
    includeFields = ["name", "state", "country"]
  ) => {
    return includeFields
      .map((field) => city[field])
      .filter((v) => !!v)
      .map((v) => `<span>${v}</span>`)
      .join(splitBy);
  };

  const updateDropdown = () => {
    clearList();
    if (state.cities.length) {
      state.cities.forEach((city) => {
        let element = document.createElement("li");
        element.innerHTML = getDisplayText(city, " - ");
        element.setAttribute("data-id", city.id);
        optionListEl.appendChild(element);
      });
    } else {
      let element = document.createElement("li");
      element.innerHTML = "No matches";
      element.setAttribute("data-id", "-1");
      element.setAttribute("class", "no-matches");
      optionListEl.appendChild(element);
    }
    autoCompleteEl.classList.remove("no-options");
  };

  const fethCityNames = (str) => {
    setIsLoading();
    fetch(`${locationUrl}?location=${str}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        state = { ...state, cities: [...data.slice(0, 5)] };
        clearIsLoading();
        updateDropdown();
      });
  };

  const fetchDetails = () => {
    const { coord } = state.selectedCity;
    const { lat, lon } = coord;
    fetch(`${detailsUrl}?lat=${lat}&lon=${lon}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then(data => {
      state = { ...state, weatherDetails: { ...data } };
      renderCurrentDay();
      renderHourly();
    })
  }

  autoCompleteEl.addEventListener("keyup", (e) => {
    const value = e.target.value;
    if (value === state.selectedCity.title) {
      return;
    }
    if (value.length > 3) {
      fethCityNames(value);
    } else {
      clearList();
      clearSelectedCity();
    }
  });

  optionListEl.addEventListener("click", (e) => {
    const id = parseInt(e.target.dataset.id);
    if (id > 0) {
      state = {
        ...state,
        selectedCity: {
          ...state.cities.find((c) => c.id === id),
        },
      };
      setSearchBoxValue();
      setLocationDetails(state.selectedCity);
      fetchDetails();
      clearList();
    }
  });

  initialize();
})();
