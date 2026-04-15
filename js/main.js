//const today = new Date().toISOString().slice(0, 10);

const isLocal =
  location.hostname === "127.0.0.1" ||
  location.hostname === "localhost";

const basePath = isLocal ? "" : "/cis-1440";

document.body.style.backgroundColor = "black";
// document.body.style.backgroundImage = `url("${basePath}/images/apod.jpg?v=${today}")`;
document.body.style.backgroundImage = `url("${basePath}/images/apod.jpg")`;
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";


document.getElementById('nameForm').addEventListener('submit', (event) => {
event.preventDefault(); // Prevent the form from submitting the traditional way
const nameInput = document.getElementById('nameInput'); // Get the name input element
// rest of the code …
});



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


console.log(getCurrentDateTime());
console.log ("Visitor name from localStorage:", localStorage.getItem("visitorName"));