import { Search } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function Home() {

   
  const [data, setData] = useState({
    celcius: 34,
    name: "jaffna",
    humidity: 20,
    speed: 2,
    image:"./Images/cloudysun.png"
  });

  const [name,setName]=useState("")

  const [error,setError]=useState("")


  function handleClick(){
    if(name !==""){
        const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=98a5402939916fa69719f95f45b01716&&units=metric`;
      axios
        .get(url)
        .then((res) => {
        
            let imagePath="";
            if(res.data.weather[0].main="Clouds"){
                imagePath="./Images/cloudysun.png";
            }else if(res.data.weather[0].main="Clear"){
                imagePath="./Images/clear.png";
            }else if (res.data.weather[0].main="Rain"){
                imagePath="./Images/rain.png";
            }else if (res.data.weather[0].main="Drizzle"){
                imagePath="./Images/drizzle.png";
            }else if (res.data.weather[0].main="Mist"){
                imagePath="./Images/mist.png";
            }else{
                imagePath="./Images/cloudysun.png";
            }

          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image:imagePath
          });
          console.log(res.data);
          setError("");
        })
        .catch((err) => {
            if(err.response.status==404){
                setError("invalid city name")
            }else{
                setError("");
            }
        
        });
    }
  }
  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input type="text" placeholder="enter city" onChange={e=>setName(e.target.value)} />
          <button onClick={handleClick}>
            <Search className="searchbar" />
          </button>
        </div>
        <div className="error">
            <p>{error}</p>
        </div>
        <div className="weatherInfo">
          <img src={ data.image} alt="cloudysun" />
          <h1>{Math.round(data.celcius)}°c</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src="./Images/humidity.png" alt="" />
              <div className="humidity">
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src="./Images/wind.png" alt="" />
              <div className="wind">
                <p>{Math.round(data.speed)} km/h</p>
                <p>wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
