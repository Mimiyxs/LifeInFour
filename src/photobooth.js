export function captureFrame(video) {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext("2d");

    const scale = Math.max(
        canvas.width / video.videoWidth,
        canvas.height / video.videoHeight
    );
    const cropWidth = canvas.width / scale;
    const cropHeight = canvas.height / scale;
    const cropX = (video.videoWidth - cropWidth) / 2;
    const cropY = (video.videoHeight - cropHeight) / 2;

    // Mirror the photo
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);

    ctx.drawImage(
        video,
        cropX, cropY, cropWidth, cropHeight,
        0, 0, canvas.width, canvas.height
    );
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

        const x = 40;
        const y = 110 + i * 502;
        const width = 640;
        const height = 480;

        // White border
        ctx.fillStyle = "white";
        ctx.fillRect(35, y - 5, 650, 490);
        // Crop the image without stretching
        const scale = Math.max(
            width / img.width,
            height / img.height
        );
        const cropWidth = width / scale;
        const cropHeight = height / scale;
        const cropX = (img.width - cropWidth) / 2;
        const cropY = (img.height - cropHeight) / 2;

        ctx.drawImage(
            img,
            cropX, cropY, cropWidth, cropHeight,
            x, y, width, height
        );
    }
    ctx.fillStyle = "white";
    ctx.font = "26px Georgia";
    ctx.fillText("little moments", 360, 2150);
    return canvas.toDataURL("image/png");
}
