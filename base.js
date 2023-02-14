const form = document.querySelector("#form");
const region = document.querySelector("#region");
const week = document.querySelector("#next-week");

const populate = (element) => {
    const low = element?.day?.mintemp_f ?? "no low temp available";
    const high = element?.day?.maxtemp_f ?? "no high temp available";
    const precip = element?.day?.daily_chance_of_rain ?? "no rain data available";
    const humidity = element?.day?.avghumidity ?? "no humidity available";
    const date = element?.date ?? "date not available"
    let img = '';
    if(precip > 50) { 
        img = 'cloud.png'; 
    } else { 
        img = 'sun.png'; 
    }   

// if date = (today) then run *this function*

// else, use this one
    week.insertAdjacentHTML("beforeend", `
        <li>
            <div class="card">
            <p> ${date} </p>
                <img src="icons/${img}"/>
                <p> high of ${high} degrees</p>
                <p> low of ${low} degrees </p>
                <p> there is a ${precip}% of rain </p>
                <p> the current humidity is ${humidity} </p>
            </div>
        </li>   
    `)
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    week.innerHTML = "";

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '98a8341ffcmsh7a4d6c17a49f6ecp153be9jsn0d3a5abcccce',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${region.value}&days=7`;

    fetch(url, options)
    .then(response => response.json())
    .then(data =>  {
        const days = data.forecast.forecastday;
        // const current = data?.forecast?.forecastday[0]?.day?.avgtemp_f ?? "no current data available";
        // const dateToday = data?.forecast?.forecastday[0]?.date ?? "no data available yet";

        days.forEach(element => { 
            populate(element) 
        });

        // populate(current, high, low, humidity, precip)
    })

})



