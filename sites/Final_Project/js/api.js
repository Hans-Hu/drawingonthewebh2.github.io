let temperature = 20;

let getTemperature = async () => {
    let url = "https://goweather.herokuapp.com/weather/NewYorkCity";

    let response = await fetch(url);

    if (response.ok) {
        let json = await response.json();
        temperature = parseInt(json.temperature);
        console.log(`${temperature} °C`);
        return temperature;
    }

    return 20; // default to room temp
}