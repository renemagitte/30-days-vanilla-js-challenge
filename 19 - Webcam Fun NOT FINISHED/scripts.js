const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo(){
    /* Returns promise: */
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
            console.log(localMediaStream);
        
//            video.src = window.URL.createObjectURL(localMediaStream);
            /**************************************************
            * Error:
            * "URL.createObjectURL with media streams is deprecated 
            * and will be removed in M68, around July 2018. 
            * Please use HTMLMediaElement.srcObject instead. 
            * See https://www.chromestatus.com/features/5618491470118912 for more details."
            ***************************************************/

            video.play();
        })
        .catch(error => {
            console.error('Oh no.', error);
    })
};

function paintToCanvas(){
    
    /* Making sure canvas has the same size as incoming video: */
    const width = video.videoWidth;
    const heigth = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    
    setInterval(() => {
        /* 0, 0 = start at the top lefthand corner of canvas context. And then "paint" (until?) the width and height.... */
        ctx.drawImage(video, 0, 0, width, height);
    }, 16);
}

getVideo();