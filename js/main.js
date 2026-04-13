const today = new Date().toISOString().slice(0, 10);

document.body.style.backgroundColor = "black";
document.body.style.backgroundImage =
  `url('/cis-1440/images/apod.jpg?v=${today}')`;
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";