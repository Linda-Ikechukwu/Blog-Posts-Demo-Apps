import './App.css';
import React, { useState, useEffect } from "react";
import ArrayToExcelButton from "./Components/ArrayToExcel/ArrayToExcelButton"

function App() {

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJsonArray = async () => {
    try {
      const response = await fetch('https://jsonfy.com/users');
      let jsonArray = await response.json();
      setUserData(jsonArray);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJsonArray();
  }, [])


  return (
    <div className="App">
      {loading ?
        <p>Loading</p> :
        <ArrayToExcelButton apiArray={userData} fileName={"UserData.xls"} buttonTitle={"Download User Data"} />
      }
    </div>
  );
}

export default App;
