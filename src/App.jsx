import React, { useState, useEffect } from 'react';
import './index.css';
import Watched from './Components/Watched';
import Ban from './Components/Ban';
import "./App.css";

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [dogPic, setDogPic] = useState(null);
  const [name, setName] = useState(null);
  const [lifeSpan, setLifeSpan] = useState(null);
  const [picClass, setPicClass] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [watched, setWatched] = useState([]);
  const [banProp, setBanProp] = useState({fullNames:[], weights:[], heights:[], lifeSpans:[]});

  const banName = () =>{
    let currentNames = [...banProp.fullNames, name];
    setBanProp({...banProp, fullNames: currentNames});
  }

  const banLifeSpan = () =>{
    let currentLifeSpans = [...banProp.lifeSpans, lifeSpan];
    setBanProp({...banProp, lifeSpans: currentLifeSpans});
  }

  const banHeight = () =>{
    let currentBanHeight = [...banProp.heights, height];
    setBanProp({...banProp, heights: currentBanHeight});
  }

  const banWeight = () =>{
    let currentBanWeight = [...banProp.weights, weight];
    setBanProp({...banProp, weights: currentBanWeight});
  }


  const makeQuery = () =>{
    let first = "https://api.thedogapi.com/v1/images/search?api_key=q";
    let fullURL = first + ACCESS_KEY;
    reset(); 
    CallAPI(fullURL).catch(console.error);
  } 
  const reset = () => {
    setName(null);
    setLifeSpan(null);
    setHeight(null);
    setWeight(null);
  }

  const isNotBanned = (newJson) => {
    const nameDuplicate = banProp.fullNames.filter((obj) => obj == newJson.breeds[0].name).length == 0
    const lifeSpanDuplicate = banProp.lifeSpans.filter((obj) => obj == newJson.breeds[0].life_span).length == 0
    const heightDuplicate = banProp.heights.filter((obj) => obj == newJson.breeds[0].height.metric).length == 0
    const weightDuplicate = banProp.weights.filter((obj) => obj == newJson.breeds[0].weight.metric).length == 0
    if (nameDuplicate && lifeSpanDuplicate && heightDuplicate && weightDuplicate){
      return true;
    } else {
      return false;
    }
  }

  const CallAPI = async(query)=> {
    const response = await fetch(query);
    const json = await response.json();
    const newQuery =  "https://api.thedogapi.com/v1/images/" + json[0].id;
    console.log(newQuery);
    const newResponse = await fetch(newQuery);
    console.log(newResponse);
    const newJson = await newResponse.json();
    console.log(newJson);
    if (newJson.breeds && isNotBanned(newJson)){
      setPicClass("picture")
      setDogPic(newJson.url);
      setName(newJson.breeds[0].name);
      setLifeSpan(newJson.breeds[0].life_span);
      setHeight(newJson.breeds[0].height.metric);
      setWeight(newJson.breeds[0].weight.metric);
      setWatched((images) => [...images, newJson])
    } else {
      CallAPI(query).catch(console.error);
    }
  }


  return (
    <div className='app'>
      <Watched images = {watched}/>
      <div className='middle-content'>
        <img src={dogPic} className = {picClass}></img>
        <hr />
        <div>
          <h3 onClick = {banName}>{name}</h3>
          <br></br>
          <span onClick = {banLifeSpan}>{lifeSpan}</span>
          <br></br>
          <span onClick = {banHeight}>{height} m</span>
          <br></br>
          <span onClick = {banWeight}>{weight} kg</span>
        </div>
        <button onClick={makeQuery}>Find more!!!</button>
      </div>
      <Ban banData={banProp} className="right-panel"/>
    </div>
  );
}

export default App;