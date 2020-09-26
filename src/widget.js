import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import RefreshIcon from '@material-ui/icons/Refresh';
// import ToggleButtonGroup from './temperatureLabel';
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Skeleton from '@material-ui/lab/Skeleton';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

//testing picture imports
import clearDay from './01d.png';
import fewCloudsDay from './02d.png';
import scatteredCloudsDay from './03d.png';
import brokenCloudsDay from './04d.png';
import showerRainDay from './09d.png';
import rainDay from './10d.png';
import thunderstormDay from './11d.png';
import snowDay from './13d.png';
import mistDay from './50d.png';

import clearNight from './01n.png';
import fewCloudsNight from './02n.png';
import scatteredCloudsNight from './03n.png';
import brokenCloudsNight from './04n.png';
import showerRainNight from './09n.png';
import rainNight from './10n.png';
import thunderstormNight from './11n.png';
import snowNight from './13n.png';
import mistNight from './50n.png';
import './widget.css';



import moment from 'moment';

import axios from 'axios';

class Widget extends React.Component{
    constructor(props){
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.render = this.render.bind(this);
        this.callAgain = this.callAgain.bind(this);
        
        this.state={
            loaded:false,
            loading: true,
            weather:75,
            avatar: null,
            time: null,
            temperatureLabel: "Fahrenheit",
            currentLabel: "Farenheit",
            newLabel: "Farenheit",
        }
    }

    callAgain(){
      this.setState({
        loading:true,
      });
      setTimeout(()=> {
        if (this.state.loading === true){
          this.setState({loaded:false});
        }
      }, 1000);
      var temp;
      var celWeather;
      var fWeather;

      axios.get("http://api.openweathermap.org/data/2.5/weather?zip=60654,us&appid=e4818859da390adff042f53524a6a526&units=imperial")
        .then((response)=>{
          console.log(response);
          console.log("THIS IS STATE CURRENT IN GET: " + this.state.currentLabel);
          if (this.state.currentLabel === "Celcius"){
            //they're C
            fWeather = response.data.main.temp;
            celWeather= ((fWeather-32)* (5/9)).toFixed(2);
            temp = response.data.weather[0].icon;
            console.log(celWeather);
            this.setState({
              weather:celWeather,
              time: moment.unix(response.data.dt).format('MMMM Do YYYY, h:mm:ss a'),
              avatar: this.createAvatar(temp),
              loaded: true,
              loading: false
            });
          }else{
          //they're F
          temp = response.data.weather[0].icon;
          this.setState({
            weather:response.data.main.temp,
            time: moment.unix(response.data.dt).format('MMMM Do YYYY, h:mm:ss a'),
            avatar: this.createAvatar(temp),
            loaded: true,
            loading:false,
          });
          }          
        }
    );
    }

//function to return the right avatar with the right text depending on the ID
createAvatar(iconID){
if(iconID === "01d"){
  // clear sky
  return(<Avatar src={clearDay} alt="The Weather is clear skies during the day."/>);
}else if(iconID === "02d"){
  // few clouds 
  return(<Avatar src={fewCloudsDay} alt="The Weather is slightly cloudy skies during the day."/>);
}else if(iconID === "03d"){
  //scattered clouds
  return(<Avatar src={scatteredCloudsDay} alt="The Weather is scattered clouds during the day."/>);
}else if(iconID === "04d"){
  //broken clouds
  return(<Avatar src={brokenCloudsDay} alt="The Weather is broken clouds during the day."/>);
}else if(iconID === "09d"){
  //shower rain 
  return(<Avatar src={showerRainDay} alt="The Weather is raining showers during the day."/>);
}else if(iconID === "10d"){
  //rain
  return(<Avatar src={rainDay} alt="The Weather is raining during the day."/>);
}else if(iconID === "11d"){
  //thunderstorm
  return(<Avatar src={thunderstormDay} alt="The Weather is thunderstorms during the day."/>);
}else if(iconID === "13d"){
  //snow
  return(<Avatar src={snowDay} alt="The Weather is snow during the day."/>);
}else if(iconID === "50d"){
  // mist
  return(<Avatar src={mistDay} alt="The Weather is misty during the day."/>);
}else if(iconID === "01n"){
  // clear sky
  return(<Avatar src={clearNight} alt="The Weather is clear skies during the night."/>);
}else if(iconID === "02n"){
  // few clouds 
  return(<Avatar src={fewCloudsNight} alt="The Weather is slightly cloudy skies during the night."/>);
}else if(iconID === "03n"){
  //scattered clouds
  return(<Avatar src={scatteredCloudsNight} alt="The Weather is scattered clouds during the night."/>);
}else if(iconID === "04n"){
  //broken clouds
  return(<Avatar src={brokenCloudsNight} alt="The Weather is broken clouds during the night."/>);
}else if(iconID === "09n"){
  //shower rain 
  return(<Avatar src={showerRainNight} alt="The Weather is raining showers during the night."/>);
}else if(iconID === "10n"){
  //rain
  return(<Avatar src={rainNight} alt="The Weather is raining during the night."/>);
}else if(iconID === "11n"){
  //thunderstorm
  return(<Avatar src={thunderstormNight} alt="The Weather is thunderstorms during the night."/>);
}else if(iconID === "13n"){
  //snow
  return(<Avatar src={snowNight} alt="The Weather is snowing during the night."/>);
}else if(iconID === "50n"){
  // mist
  return(<Avatar src={mistNight} alt="The Weather is misty during the night."/>);
}
}

    componentDidMount(){
      setTimeout(()=> {
        if (this.state.loading === true){
          this.setState({loaded:false});
        }
      }, 1000);
        var temp;
        //once the component is FULLY summoned 
        axios.get("http://api.openweathermap.org/data/2.5/weather?zip=60654,us&appid=e4818859da390adff042f53524a6a526&units=imperial")
        .then((response)=>{
          console.log(response);

          // celWeather= ((weather-32)* (5/9)).toFixed(2);
          // fWeather = response.data.main.temp;
          temp = response.data.weather[0].icon;
          console.log("I MOUNTED!");
          this.setState({
            weather:response.data.main.temp,
            time: moment.unix(response.data.dt).format('MMMM Do YYYY, h:mm:ss a'),
            avatar: this.createAvatar(temp),
            loaded: true,
            loading: false,
          });          
        }
    );
    console.log("I forced an update! : " + this.state.loaded);
    this.forceUpdate();
    }
    // const [temperatureLabel, setTemperature] = React.useState("Fahrenheit");

    handleTemperatureLabel = (event, newtemperatureLabel) => {
        // console.log(event);
        if (newtemperatureLabel === "Fahrenheit") {
          //they clicked Fahrenheit
          this.setState({temperatureLabel:"Fahrenheit"});
          if (this.state.currentLabel === "Fahrenheit"){
            //They pressed F when its ALREADY F
            console.log("IM ALREADY F! Don't reload me!");
          }else{
            //reload this bitch
            this.callAgain();
          }
          //set the currentLabel to match
          this.setState({currentLabel:"Fahrenheit"});
        }else if (newtemperatureLabel === "Celcius"){
          //its Celsius!
          this.setState({temperatureLabel: "Celcius"});
          if (this.state.currentLabel === "Celcius"){
            //They pressed C when its ALREADY C
            console.log("IM CELCIUS STAPH TOUCHING ME");
          }else{
            //reload necessary
            this.callAgain();
          }
          //update the currentLabel to match
          this.setState({currentLabel:"Celcius"});
        }
      };

    
    
    render(){
      console.log("I'M LOADED! : "+this.state.loaded);
        const refresh = <RefreshIcon color='action'/>;
        const cardCont = <Typography className="title" color="textSecondary" gutterBottom>
            {this.state.time} 
        </Typography>;
        const action = <IconButton children={refresh} 
            type="reset" 
            label = "refresh" 
            alt="refresh" 
            aria-label="refresh and get new temperature"
            onClick={this.callAgain}/>;
        //render the card HERE!
            return (
            <Card className="card" variant="outlined">
            {this.state.loaded ? (<CardHeader title = "Weather" avatar = {this.state.avatar} subheader={cardCont} action={action}/>) : (<Skeleton animation="wave" height={50} />)}
            <CardContent>
            {this.state.loaded ? (<Typography className="middle" variant="h2" component="h1">
                {this.state.weather}° 
            </Typography>) :  (<div className="content"><Skeleton animation="wave" className="middle" variant="rect" width={210} height={120}/></div>)}
            </CardContent>

        <CardActions>
        {this.state.loaded ? (<div className="toggleContainer">
            <ToggleButtonGroup
                value={this.state.temperatureLabel}
                exclusive
                onChange={this.handleTemperatureLabel}
                aria-label="Pick which temperature values display">
                <ToggleButton value="Fahrenheit" aria-label="Change to Fahrenheit">
                F°
                </ToggleButton>
                <ToggleButton value="Celcius" aria-label="Change to Celcius">
                C°
                </ToggleButton>
            </ToggleButtonGroup>  
            </div>) : (<div className={"content"}><Skeleton animation="wave" className="middle" variant="rect" width={150} height={50}/></div>)}
      </CardActions>
    </Card>
  );
    }//end of render
}//end of widget class
export default Widget;
