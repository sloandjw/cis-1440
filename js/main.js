async function setNasaBackground() {
    const fallback = "black";
    const apiKey = "mbFPSZjYhPaTnhW7wjiqPiBcY5ukughe4iwEQMRA";
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`NASA request failed: ${response.status}`);
        }

        const data = await response.json();

        if (data.media_type === "image" && data.url) {
            document.body.style.backgroundImage = `url("${data.hdurl || data.url}")`;
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundAttachment = "fixed";
            console.log("NASA APOD background set successfully.");
        } else {
            document.body.style.background = fallback;
            console.log("APOD is not an image today.");
        }
    } catch (error) {
        document.body.style.background = fallback;
        console.error("Failed to load NASA background:", error);
    }
}

setNasaBackground();