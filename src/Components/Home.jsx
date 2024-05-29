import React, { useState } from "react";
import axios from "axios";
import "./style.css";

function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
    image: "",
  });
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=0075544f76dbd71302631fd76232e98e&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {
          let imagePath = '';
          if(res.data.weather[0].main == "clouds"){
            imagePath = "/public/clouds-1.png"
          }else if(res.data.weather[0].main == "clear"){
            imagePath = "/public/alear.png"
          }else if(res.data.weather[0].main == "Rain"){
            imagePath = "/public/rain.jpg"
          }else if(res.data.weather[0].main == "drizzle"){
            imagePath = "/public/drizzle.jpg"
          }else if(res.data.weather[0].main == "Mist"){
            imagePath = "/public/mist-1.png"
          }else{
            imagePath = '/public/clouds-1.png'
          }
          console.log(res.data);
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,image:imagePath,
          });
          setError('');
        })
        .catch(err => {
            if(err.response.status ==404){
                setError("Invalid City Name")
            }else{
                setError('');
            }
                console.log(err)
            });
    }
  };

  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter City Name"
            onChange={(e) => setName(e.target.value)}
          />
          <button>
            <img src="../../public/search.png" alt="" onClick={handleClick} />
          </button>
        </div>
        <div className="error">
            <p>{error}</p>
        </div>
        <div className="winfo">
          <img src={data.image} alt="" className="icon"/>
          <h1>{Math.round(data.celcius)}°C</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src="../../public/humidity-1.png" alt="" />
              <div className="humidity">
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src="../../public/wind-1.png" alt="" />
              <div className="wind">
                <p>{Math.round(data.speed)}km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
