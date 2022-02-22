function onGeoOk(){
    const lat = -84.9999717;
    const lng = 44.9994618;
    const API = "313d868ff36db4b35da0d3345b7359dc"
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API}&units=metric`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const weather = document.querySelector("#weather1 span");
        const temp = document.querySelector("#weather2 span");
        temp.innerText = `${data.main.temp}`;
        weather.innerText = `${data.weather[0].main}`;
    });
}

function onGeoError(){
    alert("Location Error!");
}

navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError);