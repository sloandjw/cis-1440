const today = new Date().toISOString().slice(0, 10);

const isLocal =
  location.hostname === "127.0.0.1" ||
  location.hostname === "localhost";

const basePath = isLocal ? "" : "/cis-1440";

document.body.style.backgroundColor = "black";
document.body.style.backgroundImage =
  `url("${basePath}/images/apod.jpg?v=${today}")`;
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";