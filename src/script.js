(() => {
  const autoCompleteEl = document.getElementById("auto-complete");
  const optionListEl = document.getElementById("option-list");
  const searchBoxEl = document.getElementById('search-box');
  const searchSection = document.getElementById('search-section');
  const locationUrl = "http://localhost:8080/getLocations";
  const initalSelectedCity = {
    id: -1,
    title: ''
  };
  let state = {
    cities: [],
    selectedCity: { ...initalSelectedCity }
  };

  const clearList = () => {
    optionListEl.innerHTML = "";
    autoCompleteEl.classList.add("no-options");    
  };

  const clearSelectedCity = () => {
    searchSection.classList.remove('selected');    
  }

  const setSearchBoxValue = () => {
    searchSection.classList.add('selected')
    searchBoxEl.value = state.selectedCity.title;
  }

  const clearIsLoading = () => {
    autoCompleteEl.classList.remove('is-loading');
  }

  const setIsLoading = () => {
    autoCompleteEl.classList.add('is-loading');
  }

  const updateDropdown = () => {
    clearList();
    if (state.cities.length) {
      state.cities.forEach((city) => {
        let element = document.createElement("li");
        element.innerText = city.title;
        element.setAttribute("data-id", city.woeid);
        optionListEl.appendChild(element);
      });
    } else {
      let element = document.createElement("li");
      element.innerText = "No matches";
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
        state = { ...state, cities: [ ...data ] }
        clearIsLoading();
        updateDropdown();
      });
  };

  autoCompleteEl.addEventListener("keyup", (e) => {
    const value = e.target.value;
    if(value === state.selectedCity.title) { return; }
    if (value.length > 3) {
      fethCityNames(value);
    } else {
      clearList();
      clearSelectedCity();
    }
  });

  optionListEl.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (id > 0) {
      state = { ...state, selectedCity: { id, title: e.target.innerText } }        
      setSearchBoxValue(); 
      clearList();  
    }
  });  
})();
