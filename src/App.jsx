import { useState } from 'react'


function App() {
  const [value, setValue] = useState("");

  const [weatherData , setWeatherData] = useState({
    location: '----------',
    time: '--:--',
    date: '----------',
    temp: '--.-°C',
    condition: '-----',
    precipitation: '--',
    humidity: '--',
    wind: '--',
    emojiElement: "----"
  });

const handleInput = (e) => {
  setValue(e.target.value);
}


async function fetchWeatherData(location) {

  const url = `https://api.weatherapi.com/v1/current.json?key=6fc74cf82bc44773a8a171855241407&q=${location}&aqi=no`
  // fetch -> inbuilt function to get http response from a server
  const response = await fetch(url);
  if (response.status == 400) {
    alert("location is invalid");
    return null;
  } else if (response.status == 200) {
    const json = await response.json();
    return json;
  }
} 

const handleClick = async () => {
  if(value !== ""){
    const data = await fetchWeatherData(value);
    if(data === null){
      alert("location info not found!");  
    }else{
      console.log(data);
      const location = data.location.name;
      const localTime = data.location.localtime;
      const [date, time] = localTime.split(" ");
      const temp = data.current.temp_c;
      const condition = data.current.condition.text;
      const precipitation = data.current.precip_mm;
      const humidity = data.current.humidity;
      const wind = data.current.wind_kph;
      const emojiElement = data.current.condition.icon;

      const newWeatherObj ={
        "location": location,
        "time": time,
        "date": date,
        "temp": temp,
        "condition": condition,
        "precipitation": precipitation,
        "humidity": humidity,
        "wind": wind,
        "emojiElement": emojiElement,
      
      }

      setWeatherData(newWeatherObj);
    }
  }
}

  return (
    <>
    <header className='text-xl bg-[#708090] h-[10rem]'>
        <div className="container flex justify-center items-center py-15">
          <h1 className='text-4xl text-white mr-10'>Weather App</h1>
          <input type="search" id="searchinput" placeholder="Search for a city" className='h-[3rem] w-[40%] bg-white text-black hover:bg-[#ffffff27] rounded-l-md border-2 border-black
            ' onChange={handleInput}/>
          <button id="searchbtn" className='h-[3rem] w-[10%] bg-white text-black cursor-pointer border-2 active:bg-orange-700 hover:bg-[#ffffff27] rounded-r-md' onClick={handleClick}>search</button>
        </div>
      </header>
      <main>
        <div className="flex w-[100%] h-[calc(100vh-10rem)] bg-[#001223] justify-center items-center text-white">
          <div className="temprature text-2xl px-4">{weatherData.temp}</div>
          <div className="location-date">
            <div className="location text-5xl">{weatherData.location}</div>
            <span className="time px-1">{weatherData.time}</span>
            <span className="date px-1.5 ">{weatherData.date}</span>
          </div>
          <div className="weather-state">
            <img src={weatherData.emojiElement} className="emoji h-25" alt="" />
            <div className="condition" >{weatherData.condition}</div>
          </div>
          <div className="weather-info">
            <div className="precipitation">Precipitation: <span id="precipitation">{weatherData.precipitation}</span>%</div>
            <div className="humidity">humidity: <span id="humidity">{weatherData.humidity}</span>%</div>
            <div className="wind">Wind: <span id="wind">{weatherData.wind}</span> km/h</div>
          </div>
        </div>
      </main>

    </>
  )
}

export default App
