(() => {
  const autoCompleteEl = document.getElementById("auto-complete");
  const optionListEl = document.getElementById("option-list");
  const searchBoxEl = document.getElementById("search-box");
  const searchSectionEl = document.getElementById("search-section");
  const locationDetailsEl = document.getElementById("location-details");
  const weatherDetailsEl = document.getElementById('weather-details');
  const locationUrl = "http://localhost:8080/getLocations";
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
  };

  const clearList = () => {
    optionListEl.innerHTML = "";
    autoCompleteEl.classList.add("no-options");
  };

  const clearSelectedCity = () => {
    searchSectionEl.classList.remove("selected");
    weatherDetailsEl.classList.remove('selected');
  };

  const setSearchBoxValue = () => {
    searchSectionEl.classList.add("selected");
    weatherDetailsEl.classList.add('selected');
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

  // [
  //   city.name,
  //   city.state,
  //   city.country
  // ].filter(v => !!v)
  // .map(v => (`<span>${v}</span>`))
  // .join(splitBy)

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
    console.log(e);
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
      clearList();
    }
  });
})();
