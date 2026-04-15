const fs = require("fs");
const path = require("path");
const axios = require("axios");

const API_KEY = "mbFPSZjYhPaTnhW7wjiqPiBcY5ukughe4iwEQMRA";
const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
const IMAGE_DIR = path.join(__dirname, "..", "images");
const IMAGE_PATH = path.join(IMAGE_DIR, "apod.jpg");

async function downloadImage(url, outputPath) {
  const response = await axios({
    method: "get",
    url,
    responseType: "stream",
    timeout: 300000,
  });

  await new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(outputPath);
    response.data.pipe(writer);
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

async function updateApod() {
  try {
    if (!fs.existsSync(IMAGE_DIR)) {
      fs.mkdirSync(IMAGE_DIR, { recursive: true });
    }

    const { data } = await axios.get(APOD_URL, { timeout: 300000 });

    if (data.media_type !== "image") {
      console.log("APOD is not an image today. Keeping existing local image.");
      return;
    }

    const imageUrl = data.hdurl || data.url;
    const tempPath = `${IMAGE_PATH}.tmp`;

    await downloadImage(imageUrl, tempPath);
    fs.renameSync(tempPath, IMAGE_PATH);

    console.log(`${new Date().toISOString()} (UTC): APOD updated successfully: ${IMAGE_PATH} `);
  } catch (error) {
    console.error(`${new Date().toISOString()} (UTC): Failed to update APOD:`, error.message);
    process.exitCode = 1;
  }
}

updateApod();