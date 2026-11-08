export function startCamera(video) {
    return navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
            video.srcObject = stream;
            return video.play().then(() => stream);
        })
        .catch((err) => {
            console.error(`An error occurred: ${err}`);
            throw err;
        });
}

export function stopCamera(stream) {

    if (stream) {
        stream.getTracks().forEach((track) => {
            track.stop();
        });
    }
}
/* Documentation : 
https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API/Taking_still_photos */
