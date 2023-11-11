const apikey = "299d79363b9fbeca858d484ad2741df0"; 
  
 const main = document.getElementById("main"); 
 const form = document.getElementById("form"); 
 const search = document.getElementById("search"); 
  
 const url = (city) => 
   `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`; 
  
 async function getWeatherByLocation(city) { 
   const resp = await fetch(url(city), { origin: "cors" }); 
   const respData = await resp.json(); 
  
   console.log(respData); 
  
   addWeatherToPage(respData); 
 } 
  
 function addWeatherToPage(data) { 
   const temp = KtoC(data.main.temp); 
   const humidity = data.main.humidity; 
   const windSpeed = data.wind.speed; 
  
  
  
 const ctx = document.getElementById('weather-chart').getContext('2d'); 
     new Chart(ctx, { 
         type: 'pie', 
         data: { 
             labels: ['Temperature (°C)', 'Humidity (%)','Wind speed'], 
             datasets: [{ 
                 label: 'Weather Info', 
                 data: [temp, humidity,windSpeed], 
                 backgroundColor: ['platinum', 'gold'], 
                 borderColor: ['orange', 'magenta'], 
                 borderWidth: 1 
             }] 
         }, 
         options: { 
             scales: { 
                 y: { 
                     beginAtZero: true 
                 } 
             } 
         } 
     }); 
  
  
  
  
   const weather = document.createElement("div"); 
   weather.classList.add("weather"); 
  
   weather.innerHTML = ` 
         <h2><img src="https://openweathermap.org/img/wn/${ 
           data.weather[0].icon 
         }@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${ 
     data.weather[0].icon 
   }@2x.png" /></h2> 
         <small>${data.weather[0].main}</small> 
         <div class="more-info"> 
         <p>Humidity : <span>${humidity}%</span></p> 
         <p>Wind speed : <span>${+Math.trunc(windSpeed * 3.16)}km/h</span></p> 
         </div> 
     `; 
  
  
  
  
  
   // cleanup 
   main.innerHTML = ""; 
  
   main.appendChild(weather); 
 } 
  
 function KtoC(K) { 
   return Math.floor(K - 273.15); 
 } 
  
 form.addEventListener("submit", (e) => { 
   e.preventDefault(); 
  
   const city = search.value; 
  
   if (city) { 
     getWeatherByLocation(city); 
   } 
 });
 
