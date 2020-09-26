import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
    

function OutlinedCard(props) {
    const classes = useStyles();
    console.log(props.loaded);

  const [temperatureLabel, setTemperature] = React.useState("Fahrenheit");

  const handleTemperatureLabel = (event, newtemperatureLabel) => {
    if (newtemperatureLabel !== null) {
      setTemperature(newtemperatureLabel);
    }
  };

  

  const refresh = <RefreshIcon color='action'/>;

  const cardCont = <Typography className={classes.title} color="textSecondary" gutterBottom>
      moment().format('MMMM Do YYYY, h:mm:ss a'); {props.time}
      </Typography>;
const action = <IconButton children={refresh} type="reset" label = "refresh" alt="refresh"></IconButton>;

  return (
    <Card className={classes.root} variant="outlined">
      {props.loaded ? (<CardHeader avatar = {props.avatar} subheader={cardCont} action={action}/>) : (<Skeleton animation="wave" height={50}/>)}
      <CardContent>

        {props.loaded ? (<Typography className={classes.middle} variant="h2" component="h1">
            {props.weather}° 
        </Typography>) :  (<div className={classes.content}><Skeleton animation="wave" className={classes.middle} variant="rect" width={210} height={120}/></div>)}
      </CardContent>

      <CardActions>
      {props.loaded ? (<div className={classes.toggleContainer}>
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

class WeatherWidget extends React.Component{
  constructor(props){
    super(props);
    this.render = this.render.bind(this);
    this.state={
      loaded: true,
      weather: "temp",
      time: "wednesday",
      avatar: "pic",
    }
  }

  componentDidMount(){
      console.log("THIS IS AXIOS");
    axios.get("http://api.openweathermap.org/data/2.5/weather?zip=60654,us&appid=e4818859da390adff042f53524a6a526")
    .then(
      function(response){
        console.log(response);
        this.weather = response.data.main.temp;
        this.time = response.data.dt;
        this.loaded = true;
        console.log(response);
    }
    );
  }

  render(){
    console.log(
        "This is this.weather: " + this.weather +
        "This is this.time: " + this.time
    );
    return(<WeatherWidget>
            <OutlinedCard
                weather = {this.weather}
                time = {this.time}
                loaded = {this.loaded}
                avatar = {this.avatar}
            />
        </WeatherWidget>);
  }
}
export default WeatherWidget;
