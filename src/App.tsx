import React, { useEffect, useState } from "react";
import "./App.css";

interface State {
  lastClicked?: Date;
  buttonColor: "red" | "blue" | "green";
}

function App(){

  const [state,setState] = useState<State>({lastClicked:undefined,buttonColor:"red"})

  const handleClick = () =>{
    setState({lastClicked:new Date(),buttonColor:getNextButtonColor()})
  }

  const getNextButtonColor = (): State["buttonColor"] => {
    switch (state.buttonColor) {
      case "red":
        return "blue";
      case "blue":
        return "green";
      case "green":
        return "red";
      default:
        throw new Error("Invalid color");
    }
  }

  const formatTime = (time:Date,format:string) => {
      switch(format){
        case 'local':
          return time.toLocaleString()
        case 'gmt':
          return time.toUTCString()
        case 'act':
          return time.toLocaleString('en-US',{timeZone:'Australia/Darwin'})
        default:
          return 'never'
  }
}
  return(
    <div className="container">
      <button style={{ backgroundColor: state.buttonColor }} onClick={handleClick} >
        Click
      </button>
      <div className="TimeContainer">
        <div className="TimeItem" id="localTime">
          Local Time: {state.lastClicked ? formatTime(state.lastClicked,'local') : 'Never'}
        </div>
        <div className="TimeItem" id="gmtTime">
          GMT Time: {state.lastClicked ?formatTime(state.lastClicked,'gmt') : 'Never'}
        </div>
        <div className="TimeItem" id="actTime">
          ACT Time: {state.lastClicked ? formatTime(state.lastClicked,'act') : 'Never'}
        </div>
      </div>
    </div>
  )
}

export default App;
