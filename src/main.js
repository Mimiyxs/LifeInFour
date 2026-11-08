
import React from "react";
import { createRoot } from "react-dom/client";
import Background from "./Background.jsx";

import { startCamera, stopCamera } from "./camera.js";
import { captureFrame, makePhotoStrip } from "./photobooth.js";

createRoot(document.getElementById("shader-background")).render(
    React.createElement(Background)
);

const video = document.getElementById("camera");
const placeholder = document.getElementById("placeholder");
const countdown = document.getElementById("countdown");
const status = document.getElementById("status");
const progress = document.getElementById("progress");
const gallery = document.getElementById("gallery");

const startButton = document.getElementById("startButton");
const photoButton = document.getElementById("photoButton");
const retakeButton = document.getElementById("retakeButton");

const result = document.getElementById("result");
const photoStrip = document.getElementById("photoStrip");
const downloadButton = document.getElementById("downloadButton");
const retakeResultButton = document.getElementById("retakeResultButton");


let stream = null;
let photos = [];
let strip = null;
let busy = false;

startButton.addEventListener("click", async () => {
    startButton.disabled = true;
    try {
        stream = await startCamera(video);
        placeholder.hidden = true;
        photoButton.disabled = false;
        status.textContent = "Camera ready!";
    } catch (error) {
        status.textContent = "Could not open camera.";
        startButton.disabled = false;
        console.error(error);
    }
});

photoButton.addEventListener("click", async () => {
    if (busy || photos.length === 4) return;
    busy = true;
    photoButton.disabled = true;
    retakeButton.disabled = true;

    status.textContent = "Get ready!";

    // Countdown
    for (let i = 3; i > 0; i--) {
        countdown.textContent = i;
        countdown.hidden = false;
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    countdown.hidden = true;

    try {
        // Capture photo
        const photo = captureFrame(video);
        photos.push(photo);

        const img = document.createElement("img");
        img.src = photo;
        img.alt = `Photo ${photos.length}`;
        gallery.appendChild(img);
        progress.textContent = `${photos.length} / 4 photos`;
        retakeButton.disabled = false;

        if (photos.length === 4) {
            status.textContent = "Creating your photo strip...";
            strip = await makePhotoStrip(photos);
            photoStrip.src = strip;
            result.hidden = false;
            status.textContent = "Your photo strip is ready. Scoll down to see the result!";
        } else {
            status.textContent = `Photo ${photos.length}/4 captured!`;
            photoButton.disabled = false;
        }

    } catch (error) {
        status.textContent = "Could not capture photo.";
        photoButton.disabled = false;
        console.error(error);
    }
    busy = false;
    retakeButton.disabled = false;

});

function retakePhotos() {
    if (busy) return;
    photos = [];
    strip = null;
    gallery.innerHTML = "";
    progress.textContent = "0 / 4 photos";
    photoStrip.removeAttribute("src");
    result.hidden = true;
    photoButton.disabled = !stream;
    retakeButton.disabled = true;
    status.textContent = "Take four new photos!";
}

retakeButton.addEventListener("click", retakePhotos);
retakeResultButton.addEventListener("click", retakePhotos);

downloadButton.addEventListener("click", () => {
    if (strip) {
        const link = document.createElement("a");
        link.href = strip;
        link.download = "LifeInFour.png";
        link.click();
    }
});
window.addEventListener("pagehide", () => {
    stopCamera(stream);
});
