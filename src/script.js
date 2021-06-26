(() => {
  const templates = {
    current: `
    <article class="weather_day">
      <div class="weather_graphic">
        <img
          class="weather_icon"
          data-attrib="icon"
          src=""
          width="200"
          alt=""
        />
        <div class="weather_condition" data-attrib="condition"></div>
      </div>
      <div class="weather_info">
        <div data-attrib="date"></div>
        <h1><span data-attrib="temp"></span>&#176;</h1>
        <div class="weather_feels_like">
          Feels like
          <span data-attrib="feels-like">89</span>&#176;
        </div>
      </div>
      <div class="additional-info">
        <div class="sunrise">
          <img src="https://raw.githubusercontent.com/basmilius/weather-icons/master/production/line/all/sunrise.svg" alt="" width="70">
          <span data-attrib="sunrise">5:35 AM</span>
        </div>
        <div class="sunset">
          <img src="https://raw.githubusercontent.com/basmilius/weather-icons/master/production/line/all/sunset.svg" alt="" width="70">
          <span data-attrib="sunset">8:35 PM</span>
        </div>
        <div class="humidity">
          <img src="https://raw.githubusercontent.com/basmilius/weather-icons/master/production/line/all/humidity.svg" alt="" width="70">
          <span data-attrib="humidity">70%</span>
        </div>
      </div>
    </article>
    `,
    hourly: `
    <div class="hourly">
      <div class="time" data-attrib="time"></div>
      <img data-attrib="icon" class="weather_icon" src="./src/svg/10d.svg" width="100" alt="">
      <div>
        <span data-attrib="temp"></span>&#176;
      </div>
    </div>
    `,
    daily: `
    <div class="daily">
      <div data-attrib="day" class="day">Sunday</div>
      <div class="icon"><img data-attrib="icon" src="./src/svg/13d.svg" width="50" alt="" /></div>
      <div data-attrib="high" class="temp high">89&#176;</div>
      <div data-attrib="low" class="temp low">65&#176;</div>
    </div>
    `,
  };

  const appEl = document.getElementById("search-section");
  const autoCompleteEl = appEl.querySelector(".auto-complete");
  const optionListEl = autoCompleteEl.querySelector(".option-list");
  const searchBoxEl = autoCompleteEl.querySelector(".search-box");
  const locationDetailsEl = appEl.querySelector("#location-details");
  const currentWeatherDayDetailsEl = appEl.querySelector(
    ".current-weather-day-details"
  );
  const hourlyDetailsEl = appEl.querySelector(".weather-hourly");
  const dailyDetailsEl = appEl.querySelector(".weather-daily");
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
    weatherDetails: {},
  };

  var stringToHTML = function (str) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, "text/html");
    return doc.body;
  };

  const initialize = () => {};

  const getDate = (unix_timestamp) => new Date(unix_timestamp * 1000);

  const displayTemp = (temp) => Math.ceil(temp);

  const renderCurrentDay = () => {
    const template = templates.current;
    const { current } = state.weatherDetails;
    const sunrise = getDate(current.sunrise);
    const sunset = getDate(current.sunset);
    const { weather } = current;
    const dom = stringToHTML(template).querySelector(".weather_day");
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    dom.querySelector(
      'img[data-attrib="icon"]'
    ).src = `https://raw.githubusercontent.com/basmilius/weather-icons/master/production/line/openweathermap/${weather[0].icon}.svg`;
    dom.querySelector('div[data-attrib="condition"]').innerText =
      weather[0].description.toUpperCase();
    dom.querySelector('div[data-attrib="date"]').innerText = getDate(
      current.dt
    ).toLocaleDateString("en-US", options);
    dom.querySelector('span[data-attrib="temp"]').innerText = displayTemp(
      current.temp
    );
    dom.querySelector('span[data-attrib="feels-like"]').innerText = displayTemp(
      current.feels_like
    );
    dom.querySelector('span[data-attrib="sunrise"]').innerText =
      sunrise.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    dom.querySelector('span[data-attrib="sunset"]').innerText =
      sunset.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    dom.querySelector(
      'span[data-attrib="humidity"]'
    ).innerText = `${current.humidity}%`;
    currentWeatherDayDetailsEl.appendChild(dom);
  };

  const renderHourly = () => {
    const { hourly } = state.weatherDetails;
    hourly.forEach((h, i) => {
      const { weather } = h;
      const template = templates.hourly;
      const hourlyDt = getDate(h.dt);
      const dom = stringToHTML(template).querySelector(".hourly");
      dom.querySelector('div[data-attrib="time"]').innerText =
        i === 0
          ? "Now"
          : hourlyDt.toLocaleString("en-US", { hour: "numeric", hour12: true });
      dom.querySelector(
        'img[data-attrib="icon"]'
      ).src = `https://raw.githubusercontent.com/basmilius/weather-icons/master/production/line/openweathermap/${weather[0].icon}.svg`;
      dom.querySelector('span[data-attrib="temp"]').innerText = displayTemp(
        h.temp
      );
      hourlyDetailsEl.appendChild(dom);
    });
  };

  renderDaily = () => {
    const { daily } = state.weatherDetails;
    daily.slice(1, daily.length).forEach((d) => {
      const { weather } = d;
      const { temp } = d;
      const template = templates.daily;
      const weekday = getDate(d.dt).toLocaleDateString("en-US", {
        weekday: "long",
      });
      const dom = stringToHTML(template).querySelector(".daily");
      dom.querySelector('div[data-attrib="day"]').innerText = weekday;
      dom.querySelector(
        'img[data-attrib="icon"]'
      ).src = `https://raw.githubusercontent.com/basmilius/weather-icons/master/production/line/openweathermap/${weather[0].icon}.svg`;
      dom.querySelector('div[data-attrib="high"]').innerText = displayTemp(
        temp.max
      );
      dom.querySelector('div[data-attrib="low"]').innerText = displayTemp(
        temp.min
      );
      dailyDetailsEl.appendChild(dom);
    });
  };

  const clearList = () => {
    optionListEl.innerHTML = "";
    currentWeatherDayDetailsEl.innerHTML = "";
    hourlyDetailsEl.innerHTML = "";
    dailyDetailsEl.innerHTML = "";
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
    locationDetailsEl.innerHTML = getDisplayText(city, " ", [
      "state",
      "country",
    ]);
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
      .then((data) => {
        state = { ...state, weatherDetails: { ...data } };
        console.log(state)
        renderCurrentDay();
        renderHourly();
        renderDaily();
      });
  };

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
