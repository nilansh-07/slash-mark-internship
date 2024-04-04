import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import { WiDaySunny, WiRain, WiSnow, WiThunderstorm, WiCloudy, WiFog } from 'react-icons/wi';

const API_KEY = '781cc7456b6979f59b9e16185da08550';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (city !== '') {
      fetchData();
    }
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCity(e.target.elements.city.value);
  };

  const WeatherIcon = () => {
    if (!weatherData) return null;

    const weatherId = weatherData.weather[0].id;
    let icons = [];

    if (weatherId >= 200 && weatherId < 300) {
      icons.push(<WiThunderstorm key="thunderstorm" size={100} />);
    }
    if (weatherId >= 300 && weatherId < 400) {
      icons.push(<WiRain key="rain" size={100} />);
    }
    if (weatherId >= 500 && weatherId < 600) {
      icons.push(<WiRain key="rain" size={100} />);
    }
    if (weatherId >= 600 && weatherId < 700) {
      icons.push(<WiSnow key="snow" size={100} />);
    }
    if (weatherId >= 700 && weatherId < 800) {
      icons.push(<WiFog key="fog" size={100} />);
    }
    if (weatherId === 800) {
      icons.push(<WiDaySunny key="sunny" size={100} />);
    } else {
      icons.push(<WiCloudy key="cloudy" size={100} />);
    }

    return (
      <div className="weather-icons">
        {icons.map((icon, index) => (
          <div key={index}>{icon}</div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, blue, red, black)', minHeight: '100vh', padding: '10px' }}>
      <Container maxWidth="sm">
        <Typography variant="h3" align="center" gutterBottom style={{ color: 'white', fontFamily: 'Arial', fontWeight: 'bold' }}>
          Weather App
        </Typography>
        <Grid container spacing={2} style={{ maxWidth: '500px', margin: '0 auto' }}>
          <Grid item xs={12}>
            <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Grid container spacing={2} style={{ width: '500px', margin: '0 auto' }}>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="city"
                    placeholder="Enter city name"
                    style={{ width: '100%', background: 'white', borderRadius: '5px', fontFamily: 'Arial' }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ width: '100%', height: '56px', fontFamily: 'Arial' }}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          {weatherData && (
            <Grid item xs={12}>
              <div style={{ marginTop: '10px', width: '500px', height: '450px', background: 'linear-gradient(175deg, red, blue)', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '200px',fontFamily: 'Arial' }}>
                <div>
                  <WeatherIcon />
                  <Typography variant="h5" align="center" gutterBottom>
                    {weatherData.name}, {weatherData.sys.country}
                  </Typography>
                  <Typography variant="body1" align="center">
                    Temperature: {weatherData.main.temp}°C
                  </Typography>
                  <Typography variant="body1" align="center">
                    Weather: {weatherData.weather[0].description}
                  </Typography>
                </div>
              </div>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default App;
