import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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



import moment from 'moment';

import axios from 'axios';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 450,
    overflow: "auto",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    textAlign: "left",
  },
  pos: {
    marginBottom: 12,
  },
  middle:{
      textAlign: "center",
  },
  content:{
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    display: "flex"
  }
});
    

var loaded = true;
var weather = 47.5;
var celWeather=47;
var fWeather = 47.5;
var time = "Wednesday";
var avatar = <Avatar src={clearNight} alt="The Weather is clear skies during the night."/>;
var currentLabel = "Fahrenheit";
var temp;

axios.get("http://api.openweathermap.org/data/2.5/weather?zip=60654,us&appid=e4818859da390adff042f53524a6a526&units=imperial")
    .then(
        function(response){
          console.log(response);
          // dictData = response.json();
          weather = response.data.main.temp;
          celWeather= ((weather-32)* (5/9)).toFixed(2);
          fWeather = response.data.main.temp;
          time = response.data.dt;
          temp = response.data.weather[0].icon;
          avatar = createAvatar(temp);
          //mutate time
          time = moment.unix(time).format('MMMM Do YYYY, h:mm:ss a');
          loaded = true;
        }
    );

//function to return the right avatar with the right text depending on the ID
function createAvatar(iconID){
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

function callAgain(){
  axios.get("http://api.openweathermap.org/data/2.5/weather?zip=60654,us&appid=e4818859da390adff042f53524a6a526&units=imperial")
    .then(
        function(response){
          console.log(response);
          // dictData = response.json();
          weather = response.data.main.temp;
          celWeather= ((weather-32)* (5/9)).toFixed(2);
          fWeather = response.data.main.temp;
          time = response.data.dt;
          //mutate time
          time = moment.unix(time).format('MMMM Do YYYY, h:mm:ss a');
          temp = response.data.weather[0].icon;
          avatar = createAvatar(temp);
          loaded = true;
        }
    );
}

export default function OutlinedCard() {
  const classes = useStyles();

  const [temperatureLabel, setTemperature] = React.useState("Fahrenheit");

  const handleTemperatureLabel = (event, newtemperatureLabel) => {
    console.log(event);
    if (newtemperatureLabel === "Fahrenheit") {
      if (currentLabel === "Fahrenheit"){
        console.log("IM ALREADY F!");
      }
      setTemperature("Fahrenheit");
      currentLabel = "Fahrenheit";
      weather=fWeather;
    }else if (newtemperatureLabel === "Celcius"){
      //its Celsius!
      if (currentLabel === "Celcius"){
        console.log("IM CELCIUS BITCHES!");
      }
      setTemperature("Celcius");
      currentLabel = "Celcius";
      weather=celWeather;
    }
  };

  const refresh = <RefreshIcon color='action'/>;

  const cardCont = <Typography className={classes.title} color="textSecondary" gutterBottom>
      {time} 
      </Typography>;
const action = <IconButton children={refresh} 
type="reset" 
label = "refresh" 
alt="refresh" 
aria-label="refresh and get new temperature"
onClick={callAgain}
/>;

  return (
    <Card className={classes.root} variant="outlined">
      {loaded ? (<CardHeader title = "Weather" avatar = {avatar} subheader={cardCont} action={action}/>) : (<Skeleton animation="wave" height={50}/>)}
      <CardContent>

        {loaded ? (<Typography className={classes.middle} variant="h2" component="h1">
            {weather}° 
        </Typography>) :  (<div className={classes.content}><Skeleton animation="wave" className={classes.middle} variant="rect" width={210} height={120}/></div>)}
      </CardContent>

      <CardActions>
      {loaded ? (<div className={classes.toggleContainer}>
            <ToggleButtonGroup
                value={temperatureLabel}
                exclusive
                onChange={handleTemperatureLabel}
                aria-label="Pick which temperature values display">
                <ToggleButton value="Fahrenheit" aria-label="Change to Fahrenheit">
                F°
                </ToggleButton>
                <ToggleButton value="Celcius" aria-label="Change to Celcius">
                C°
                </ToggleButton>
            </ToggleButtonGroup>  
            </div>) : (<div className={classes.content}><Skeleton animation="wave" className={classes.middle} variant="rect" width={150} height={50}/></div>)}
      </CardActions>
    </Card>
  );
}
