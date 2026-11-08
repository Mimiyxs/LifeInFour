/* Capture one photo from the camera */
export function captureFrame(video) {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);
    return canvas.toDataURL("image/png");
}

/* Combine four photos into one strip */
export async function makePhotoStrip(photos) {
    const canvas = document.createElement("canvas");
    canvas.width = 720;
    canvas.height = 2200;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#f3a3bf";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "bold 46px Georgia";
    ctx.fillText("LifeInFour", 360, 70);

    for (let i = 0; i < photos.length; i++) {
        const img = new Image();
        img.src = photos[i];
        await img.decode();
        const y = 110 + i * 502;
        ctx.fillStyle = "white";
        ctx.fillRect(35, y - 5, 650, 490);
        ctx.drawImage(img, 40, y, 640, 480);
    }

    ctx.fillStyle = "white";
    ctx.font = "26px Georgia";
    ctx.fillText("little moments", 360, 2150);
    return canvas.toDataURL("image/png");
}
