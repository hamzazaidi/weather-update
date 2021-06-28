var{unix:t}=require("moment-timezone");(()=>{const e={current:'\n    <article class="weather_day">\n      <div class="weather_graphic">\n        <img\n          class="weather_icon"\n          data-attrib="icon"\n          src=""\n          width="200"\n          alt=""\n        />\n        <div class="weather_condition" data-attrib="condition"></div>\n      </div>\n      <div class="weather_info">\n        <div data-attrib="date"></div>\n        <h1><span data-attrib="temp"></span>&#176;</h1>\n        <div class="weather_feels_like">\n          Feels like\n          <span data-attrib="feels-like">89</span>&#176;\n        </div>\n      </div>\n      <div class="additional-info">\n        <div class="sunrise">\n          <img src="https://raw.githubusercontent.com/basmilius/weather-icons/master/production/line/all/sunrise.svg" alt="" width="60">\n          <span data-attrib="sunrise">5:35 AM</span>\n        </div>\n        <div class="sunset">\n          <img src="https://raw.githubusercontent.com/basmilius/weather-icons/master/production/line/all/sunset.svg" alt="" width="60">\n          <span data-attrib="sunset">8:35 PM</span>\n        </div>\n        <div class="humidity">\n          <img src="https://raw.githubusercontent.com/basmilius/weather-icons/master/production/line/all/humidity.svg" alt="" width="60">\n          <span data-attrib="humidity">70%</span>\n        </div>\n      </div>\n    </article>\n    ',hourly:'\n    <div class="hourly">\n      <div class="time" data-attrib="time"></div>\n      <img data-attrib="icon" class="weather_icon" src="./src/svg/10d.svg" width="100" alt="">\n      <div>\n        <span data-attrib="temp"></span>&#176;\n      </div>\n    </div>\n    ',daily:'\n    <div class="daily">\n      <div data-attrib="day" class="day">Sunday</div>\n      <div class="icon"><img data-attrib="icon" src="./src/svg/13d.svg" width="50" alt="" /></div>\n      <div data-attrib="high" class="temp high">89&#176;</div>\n      <div data-attrib="low" class="temp low">65&#176;</div>\n    </div>\n    '},i=document.getElementById("search-section"),a=i.querySelector(".auto-complete"),n=a.querySelector(".option-list"),r=a.querySelector(".search-box"),s=i.querySelector("#location-details"),o=i.querySelector(".current-weather-day-details"),c=i.querySelector(".weather-hourly"),d=i.querySelector(".weather-daily"),l=i.querySelector(".unit-converter");let m={cities:[],selectedUnit:sessionStorage.getItem("unit-measurement")||"imperial",selectedCity:{id:-1,name:"",state:"",country:"",coord:{lon:-1,lat:-1}},weatherDetails:{}};const p=()=>{l.querySelectorAll("button").forEach((t=>{t.getAttribute("data-attrib")===m.selectedUnit?t.classList.add("selected"):t.classList.remove("selected")}))},u=t=>(new DOMParser).parseFromString(t,"text/html").body,h=()=>{let t=!1;var e;return e=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(t=!0),t},v=(e,i)=>t(e).tz(i),b=t=>Math.ceil(t);renderDaily=()=>{const{daily:t,timezone:i}=m.weatherDetails;t.slice(1,t.length).forEach((t=>{const{weather:a}=t,{temp:n}=t,r=e.daily,s=v(t.dt,i).format("dddd"),o=u(r).querySelector(".daily");o.querySelector('div[data-attrib="day"]').innerText=s,o.querySelector('img[data-attrib="icon"]').src=`https://raw.githubusercontent.com/basmilius/weather-icons/master/production/line/openweathermap/${a[0].icon}.svg`,o.querySelector('div[data-attrib="high"]').innerText=b(n.max),o.querySelector('div[data-attrib="low"]').innerText=b(n.min),d.appendChild(o)}))};const g=()=>{n.innerHTML="",o.innerHTML="",c.innerHTML="",d.innerHTML="",a.classList.add("no-options")},w=(t,e,i=["name","state","country"])=>i.map((e=>t[e])).filter((t=>!!t)).map((t=>`<span>${t}</span>`)).join(e),y=t=>{a.classList.add("is-loading"),fetch(`http://localhost:8080/getLocations?location=${t}`,{headers:{"Content-Type":"application/json"}}).then((t=>t.json())).then((t=>{m={...m,cities:[...t.slice(0,5)]},a.classList.remove("is-loading"),(()=>{if(g(),m.cities.length)m.cities.forEach((t=>{let e=document.createElement("li");e.innerHTML=w(t," - "),e.setAttribute("data-id",t.id),n.appendChild(e)}));else{let t=document.createElement("li");t.innerHTML="No matches",t.setAttribute("data-id","-1"),t.setAttribute("class","no-matches"),n.appendChild(t)}a.classList.remove("no-options")})()}))},k=(t="imperial")=>{const{coord:e}=m.selectedCity,{lat:i,lon:a}=e;fetch(`http://localhost:8080/details?lat=${i}&lon=${a}&unit=${t}`,{headers:{"Content-Type":"application/json"}}).then((t=>t.json())).then((t=>{m={...m,weatherDetails:{...t}},f()}))},f=()=>{(()=>{const t=e.current;console.log(m.weatherDetails);const{current:i,timezone:a}=m.weatherDetails,n=v(i.sunrise,a),r=v(i.sunset,a),{weather:s}=i,c=u(t).querySelector(".weather_day"),d=c.querySelector('img[data-attrib="icon"]');d.src=`https://raw.githubusercontent.com/basmilius/weather-icons/master/production/line/openweathermap/${s[0].icon}.svg`,h()&&d.setAttribute("width",100),c.querySelector('div[data-attrib="condition"]').innerText=s[0].description.toUpperCase(),c.querySelector('div[data-attrib="date"]').innerText=v(i.dt,a).format("dddd, MMMM Do YYYY"),c.querySelector('span[data-attrib="temp"]').innerText=b(i.temp),c.querySelector('span[data-attrib="feels-like"]').innerText=b(i.feels_like),c.querySelector('span[data-attrib="sunrise"]').innerText=n.format("hh:mm A"),c.querySelector('span[data-attrib="sunset"]').innerText=r.format("hh:mm A"),c.querySelector('span[data-attrib="humidity"]').innerText=`${i.humidity}%`,o.appendChild(c)})(),(()=>{const{hourly:t,timezone:i}=m.weatherDetails;t.forEach(((t,a)=>{const{weather:n}=t,r=e.hourly,s=v(t.dt,i),o=u(r).querySelector(".hourly"),d=o.querySelector('img[data-attrib="icon"]');o.querySelector('div[data-attrib="time"]').innerText=0===a?"Now":s.format("hh:mm A"),d.src=`https://raw.githubusercontent.com/basmilius/weather-icons/master/production/line/openweathermap/${n[0].icon}.svg`,h()&&d.setAttribute("width",50),o.querySelector('span[data-attrib="temp"]').innerText=b(t.temp),c.appendChild(o)}))})(),renderDaily()};var q,S,x;a.addEventListener("keyup",(q=t=>{const e=t.target.value;e!==m.selectedCity.title&&(e.length>3?y(e):(setTimeout((()=>g()),1e3),i.classList.remove("selected")))},S=500,x=0,function(){var t=this,e=arguments;clearTimeout(x),x=setTimeout((function(){q.apply(t,e)}),S||0)})),n.addEventListener("click",(t=>{const e=parseInt(t.target.dataset.id),a=m.selectedUnit;var n;e>0&&(m={...m,selectedCity:{...m.cities.find((t=>t.id===e))}},i.classList.add("selected"),r.value=m.selectedCity.name,n=m.selectedCity,s.innerHTML=w(n," ",["state","country"]),k(a),g())})),l.addEventListener("click",(t=>{const e=t.target.getAttribute("data-attrib");sessionStorage.setItem("unit-measurement",e),m={...m,selectedUnit:e},g(),k(e),p()})),p()})();
//# sourceMappingURL=index.e5718ff2.js.map
