const moment = require('moment-timezone');
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
          <img src="https://raw.githubusercontent.com/basmilius/weather-icons/master/production/line/all/sunrise.svg" alt="" width="60">
          <span data-attrib="sunrise">5:35 AM</span>
        </div>
        <div class="sunset">
          <img src="https://raw.githubusercontent.com/basmilius/weather-icons/master/production/line/all/sunset.svg" alt="" width="60">
          <span data-attrib="sunset">8:35 PM</span>
        </div>
        <div class="humidity">
          <img src="https://raw.githubusercontent.com/basmilius/weather-icons/master/production/line/all/humidity.svg" alt="" width="60">
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
    alert: `
    <article>
      <h3 data-attrib="event" class="event">Heat Advisory</h3>
      <div data-attrib="dates" class="dates">asdfas</div>
      <div data-attrib="sender" class="sender">NWS Philadelphia - Mount Holly (New Jersey, Delaware, Southeastern Pennsylvania)</div>
      <p data-attrib="description">...HEAT ADVISORY IN EFFECT FROM 11 AM TUESDAY TO 8 PM EDT
        WEDNESDAY...
        * WHAT...Heat index values up to 104 expected.
        * WHERE...In New Jersey, Ocean and Southeastern Burlington. In
        Pennsylvania, Western Montgomery and Upper Bucks.
        * WHEN...From 11 AM Tuesday to 8 PM EDT Wednesday.
        * IMPACTS...Hot temperatures and high humidity may cause heat
        illnesses to occur.</p>
      <div data-attrib="tags">
        <span class="tag">Extreme temperature value</span>
      </div>
    </article>
    `
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
  const unitConverter = appEl.querySelector(".unit-converter");
  const alertsEl = appEl.querySelector('.alerts')
  // const locationUrl = "http://localhost:8080/getLocations";
  // const detailsUrl = "http://localhost:8080/details";
  const locationUrl = "/getLocations";
  const detailsUrl = "/details";
  const tl = gsap.timeline();
  tl.to('.current-weather-day-details', { opacity: 1, duration: .6, x: 0, scale: 1, pointerEvent: 'auto' })
  tl.to('.stagger', { x:0, opacity:1, stagger: .2 }, "-=.3")
  tl.pause();
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
    selectedUnit: sessionStorage.getItem('unit-measurement') || 'imperial',
    selectedCity: { ...initalSelectedCity },
    weatherDetails: {},
  };

  const initialize = () => {
    updateUnitButton();
  }

  const updateUnitButton = () => {    
    unitConverter.querySelectorAll('button').forEach(btn => {
      const unit = btn.getAttribute('data-attrib');
      if(unit === state.selectedUnit) {
        btn.classList.add('selected')
      } else {
        btn.classList.remove('selected')
      }
    })
  }

  const stringToHTML = (str) => {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, "text/html");
    return doc.body;
  };

  // Using Regex (from detectmobilebrowsers.com)
  const mobileCheck = () => {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };  

  const getDate = (unix_timestamp, timezone) => {
    return moment.unix(unix_timestamp).tz(timezone);
  };

  const displayTemp = (temp) => Math.ceil(temp);

  const renderCurrentDay = () => {
    const template = templates.current;
    console.log(state.weatherDetails)
    const { current, timezone } = state.weatherDetails;
    const sunrise = getDate(current.sunrise, timezone);
    const sunset = getDate(current.sunset, timezone);
    const { weather } = current;
    const dom = stringToHTML(template).querySelector(".weather_day");   
    const iconEl =  dom.querySelector(
      'img[data-attrib="icon"]'
    )
    iconEl.src = `https://raw.githubusercontent.com/basmilius/weather-icons/master/production/line/openweathermap/${weather[0].icon}.svg`;
    if(mobileCheck()) {
      iconEl.setAttribute('width', 100) 
    }
    dom.querySelector('div[data-attrib="condition"]').innerText =
      weather[0].description.toUpperCase();
    dom.querySelector('div[data-attrib="date"]').innerText = getDate(
      current.dt, timezone
    ).format("dddd, MMMM Do YYYY");
    dom.querySelector('span[data-attrib="temp"]').innerText = displayTemp(
      current.temp
    );
    dom.querySelector('span[data-attrib="feels-like"]').innerText = displayTemp(
      current.feels_like
    );
    dom.querySelector('span[data-attrib="sunrise"]').innerText =
      sunrise.format('hh:mm A');
    dom.querySelector('span[data-attrib="sunset"]').innerText =
      sunset.format('hh:mm A');
    dom.querySelector(
      'span[data-attrib="humidity"]'
    ).innerText = `${current.humidity}%`;
    currentWeatherDayDetailsEl.appendChild(dom);
  };

  const renderHourly = () => {
    const { hourly, timezone } = state.weatherDetails;
    hourly.forEach((h, i) => {
      const { weather } = h;
      const template = templates.hourly;
      const hourlyDt = getDate(h.dt, timezone);
      const dom = stringToHTML(template).querySelector(".hourly");
      const iconEl =dom.querySelector(
        'img[data-attrib="icon"]'
      );
      dom.querySelector('div[data-attrib="time"]').innerText =
        i === 0
          ? "Now"
          : hourlyDt.format('h A');
      
      iconEl.src = `https://raw.githubusercontent.com/basmilius/weather-icons/master/production/line/openweathermap/${weather[0].icon}.svg`;
      if(mobileCheck()) {
        iconEl.setAttribute('width', 50) 
      }
      dom.querySelector('span[data-attrib="temp"]').innerText = displayTemp(
        h.temp
      );
      hourlyDetailsEl.appendChild(dom);
    });
  };

  renderDaily = () => {
    const { daily, timezone } = state.weatherDetails;
    daily.slice(1, daily.length).forEach((d) => {
      const { weather } = d;
      const { temp } = d;
      const template = templates.daily;
      const weekday = getDate(d.dt, timezone).format('dddd');
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

  renderAlerts = () => {
    const { alerts, timezone } = state.weatherDetails;    
    if(alerts) {
      alerts.forEach(a => {
        const template = templates.alert;
        const start = getDate(a.start, timezone).format("dddd, MMMM Do YYYY")
        const end = getDate(a.end, timezone).format("dddd, MMMM Do YYYY")
        const dom = stringToHTML(template).querySelector("article");
        dom.querySelector('h3[data-attrib="event"]').innerText = a.event;
        dom.querySelector('div[data-attrib="dates"]').innerText = `${start} - ${end}`;
        dom.querySelector('div[data-attrib="sender"]').innerText = a.sender_name;
        dom.querySelector('p[data-attrib="description"]').innerHTML = a.description;
        dom.querySelector('div[data-attrib="tags"]').innerHTML = a.tags.map(t => (`<span class="tag">${t}</span>`));
        alertsEl.appendChild(dom);
      })
    }
  }

  const clearList = () => {
    locationDetailsEl.innerHTML = "";
    optionListEl.innerHTML = "";
    currentWeatherDayDetailsEl.innerHTML = "";
    hourlyDetailsEl.innerHTML = "";
    dailyDetailsEl.innerHTML = "";
    autoCompleteEl.classList.add("no-options");
    alertsEl.innerHTML = '';
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

  const fetchDetails = (unit = 'imperial') => {
    const { coord } = state.selectedCity;
    const { lat, lon } = coord;
    fetch(`${detailsUrl}?lat=${lat}&lon=${lon}&unit=${unit}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        state = { ...state, weatherDetails: { ...data } };
        render();
      });
  };

  const render = () => {
    renderCurrentDay();
    renderHourly();
    renderDaily();
    renderAlerts();
  };

  const delay = (callback, ms) => {
    var timer = 0;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback.apply(context, args);
      }, ms || 0);
    };
  }
  

  autoCompleteEl.addEventListener("keyup", delay((e) => {
    const value = e.target.value;
    if (value === state.selectedCity.title) {
      return;
    }
    if (value.length > 3) {
      fethCityNames(value);
    } else {
      tl.reverse();
      clearSelectedCity();
    }
  }, 500));

  optionListEl.addEventListener("click", (e) => {
    const id = parseInt(e.target.dataset.id);
    const unit = state.selectedUnit;
    if (id > 0) {
      state = {
        ...state,
        selectedCity: {
          ...state.cities.find((c) => c.id === id),
        },
      };
      setSearchBoxValue();
      clearList();
      setLocationDetails(state.selectedCity);
      fetchDetails(unit);
      tl.play();
    }
  });

  unitConverter.addEventListener('click', (e) => {
    const unit = e.target.getAttribute("data-attrib")
    sessionStorage.setItem('unit-measurement', unit)
    state = { ...state, selectedUnit: unit };
    clearList();
    fetchDetails(unit);
    updateUnitButton();
  })

  initialize();
  
})();
