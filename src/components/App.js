import React, { useState } from "react";
import "../styles/App.css";
import Loader from "./Loader";

const LoadingStatus = {
  NOT_STARTED: "NOT_STARTED",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
};

const App = () => {
  const BASE_URL = "https://content.newtonschool.co/v1/pr/main/users";
  const [userId, setUserId] = useState(1);
  const [isLoading, setIsLoading] = useState(LoadingStatus.NOT_STARTED);
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    name: "",
    phone: "",
    website: "",
  });

  const handleOnClick = () => {
    setIsLoading(LoadingStatus.IN_PROGRESS); // Start loading

    // Simulate a delay of 2 seconds
    setTimeout(() => {
      fetch(`${BASE_URL}/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(LoadingStatus.SUCCESS); // Loading complete
          setUserData(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }, 2000);
  };

  const onChangeHandler = (event) => {
    setUserId(event.target.value);
  };

  return (
    <div id="main">
      <label htmlFor="number">Enter an id for the user between 1 to 100</label>
      <input
        type="number"
        value={userId}
        onChange={onChangeHandler}
        id="input"
        min={1}
        max={10}
      />
      <button id="btn" onClick={handleOnClick}>
        Get User
      </button>

      <div id="data">
        {isLoading === LoadingStatus.IN_PROGRESS ? (
          <Loader /> // Display Loader component while loading
        ) : (
          <>
            <h1>Click on the button to get the user</h1>
            <h4 id="id">{userData.id}</h4>
            <h4 id="email">{userData.email}</h4>
            <h4 id="name">{userData.name}</h4>
            <h4 id="phone">{userData.phone}</h4>
            <h4 id="website">{userData.website}</h4>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
