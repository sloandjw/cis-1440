const isLocal = location.hostname === "127.0.0.1" || location.hostname === "localhost";
const basePath = isLocal ? "" : "/cis-1440";
const nameForm = document.getElementById("nameForm");
const nameInput = document.getElementById("nameInput");
const visitorMessage = document.getElementById("visitor-message");
const lastVisitMessage = document.getElementById("last-visit-message");

document.body.style.backgroundColor = "black";
document.body.style.backgroundImage = `url("${basePath}/images/apod.jpg")`;
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";

if (nameForm && nameInput && visitorMessage) {
  if (localStorage.getItem("visitorName") === null) {
    nameForm.style.display = "block"; // Show the form if no visitor name is stored
    console.log("visitorName: ", localStorage.getItem("visitorName"));
    nameForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent the form from submitting the traditional way
      const nameInput = document.getElementById('nameInput'); // Get the name input element
      // rest of the code …
      localStorage.setItem("visitorName", nameInput.value); // Store the visitor's name in localStorage
      nameInput.value = ""; // Clear the input field after storing the name
      nameForm.style.display = "none"; // Hide the form after submission
      generateVisitorMessage(); // Generate the visitor message after storing the name
      visitorMessage.style.display = "block"; // Show the welcome message
      localStorage.setItem("lastVisit", JSON.stringify(getCurrentDateTime())); // Store the current visit time in localStorage
    })
  } else {
    generateVisitorMessage(); // Generate the visitor message if a visitor name is stored
    visitorMessage.style.display = "block"; // Show the welcome message
    generateLastVisitMessage(); // Generate the last visit message
    lastVisitMessage.style.display = "block"; // Show the last visit message
    localStorage.setItem("lastVisit", JSON.stringify(getCurrentDateTime())); // Update the last visit time in localStorage
  }
}

if (visitorMessage) {
  setInterval(generateVisitorMessage, 1000); // Update the visitor message every second to keep the time current
}

async function generateVisitorMessage() {
  const visitorName = getVisitorName();
  const { time, date } = getCurrentDateTime();
  const greeting = getGreeting(new Date().getHours());
  const weatherDescription = await fetchWeather(); // Fetch the current weather description
  visitorMessage.textContent = `${greeting}, ${visitorName}! It's ${time} ET on ${date}, and it's ${weatherDescription} right now in Pontiac, Michigan.`;
}

function generateLastVisitMessage() {
  const lastVisit = localStorage.getItem("lastVisit");
  if (lastVisit) {
    const { time, date } = JSON.parse(lastVisit); // Parse the last visit time from localStorage
    lastVisitMessage.textContent = `You last visited on ${date} at ${time}.`;
  }
}

// Function to get and format the current date and time
function getCurrentDateTime() {
    const now = new Date(); // Create a new Date object with the current date and time

    // Format the time according to locale-specific settings
    // { timeZone: 'America/New_York', hour12: true } is an options object passed to toLocaleTimeString()
    // Options object: 
    //   - timeZone: 'America/New_York' specifies the time zone to be used for formatting (Eastern Time Zone)
    //   - hour12: true ensures the time is formatted in 12-hour clock with AM/PM
    const time = now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour12: true });
    // Format the date according to locale-specific settings
    // { timeZone: 'America/New_York' } specifies the time zone for formatting (Eastern Time Zone)
    // The default format used is based on the locale 'en-US', which will be MM/DD/YYYY
    const date = now.toLocaleDateString('en-US', { timeZone: 'America/New_York' });
    return { time, date }; // Return the formatted time and date as an object
}

function getGreeting(hour) {
  if (hour >= 5 && hour < 12) {
    return "Good morning";
  } else if (hour >= 12 && hour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

async function fetchWeather() {
  try {
    // Fetch the weather data from the Open-Meteo API
    // Latitude and longitude are used to get weather information for a specific location
    // The Open-Meteo API provides various weather data endpoints, and one of the available options is to request the current weather conditions.
    // By adding current_weather=true to the API request URL, you're telling the API to include the current weather information in the response.
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=42.3658&longitude=-83.1808&current_weather=true');
    const data = await response.json(); // Parse the response as JSON
    const weatherDescription = mapWeatherCodeToDescription(data.current_weather.weathercode);
    return weatherDescription;
	} catch (error) {
    console.error('Error fetching weather data:', error);
    return 'unknown'; // Return 'unknown' if there's an error fetching the weather data
  }
}

function mapWeatherCodeToDescription(code) {
  // Object to map weather codes to descriptive strings
  const weatherDescriptions = {
    0: '☀️ clear skies',
    1: '🌤️ mostly clear',
    2: '⛅ partly cloudy',
    3: '☁️ overcast',
    45: '🌫️ foggy',
    48: '🌫️ foggy with frost',
    51: '🌦️ lightly drizzling',
    53: '🌦️ drizzling',
    55: '🌧️ heavily drizzling',
    56: '🌧️ light freezing drizzle',
    57: '🌧️ freezing drizzle',
    61: '🌧️ light rain',
    63: '🌧️ raining',
    65: '🌧️ heavy rain',
    66: '🌧️ light freezing rain',
    67: '🌧️ freezing rain',
    71: '🌨️ light snow',
    73: '❄️ snowing',
    75: '❄️ heavy snow',
    77: '❄️ snowy',
    80: '🌦️ light rain showers',
    81: '🌦️ rain showers',
    82: '🌧️ heavy rain showers',
    85: '🌨️ light snow showers',
    86: '🌨️ snow showers',
    95: '⛈️ stormy',
    96: '⛈️ stormy with light hail',
    99: '⛈️ stormy with hail'
  };
  return weatherDescriptions[code] || 'unknown';
}

function getVisitorName() {
  return localStorage.getItem("visitorName");
}

document.getElementById('resetForm').addEventListener('submit', (event) => {
event.preventDefault(); // Prevent the form from submitting the traditional way
visitorMessage.style.display = "none"; // Hide the welcome message after resetting the name
lastVisitMessage.style.display = "none"; // Hide the last visit message after resetting the name
localStorage.removeItem("visitorName"); // Remove the visitor's name from localStorage
localStorage.removeItem("lastVisit"); // Remove the last visit time from localStorage
document.getElementById('nameInput').value = ""; // Clear the input field after removing the name
nameForm.style.display = "block"; // Show the form again after resetting the name
});


console.log(getCurrentDateTime());
console.log ("Visitor name from localStorage:", localStorage.getItem("visitorName"));