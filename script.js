document.addEventListener('DOMContentLoaded', () =>{
    const input=document.getElementById("search");
    const btn=document.getElementById("searchBtn");
    const weatherinfo=document.getElementById("weatherinfo");
    const icon=document.getElementById("icon");
    const citydisp=document.getElementById("cityname");
    const tempdisp=document.getElementById("temparature");
    const decpdisp=document.getElementById("description");
    const errordisp=document.getElementById("error-message");
    const API_KEY="3b021396294a6ff25e48aa140358d612";
    btn.addEventListener('click',async ()=>{
        const cityname=input.value.trim();
        if(!cityname) return;
        try {
            const weather= await fetchweatherdata(cityname);
            displayweatherdata(weather);
        } catch (error) {
            showError();    
        }
    })
    async function fetchweatherdata(city) {
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response=await fetch(url);
        if(!response.ok){
            throw new Error('Weather data not available');
        }

        const data=await response.json();
        console.log(data);
        return data;
    }
    function displayweatherdata(data) {
        const{name,main,weather,wind}=data;
        citydisp.textContent=name;
        tempdisp.textContent=`Temparature : ${main.temp}`;
        decpdisp.textContent=`Weather : ${weather[0].description}`;
        icon.textContent=`icon : ${weather.icon}`;
        weatherinfo.classList.remove('hidden');
        errordisp.classList.add('hidden');

    }
    function showError() {
        weatherinfo.classList.remove('hidden');
        errordisp.classList.add('hidden');
    }
});