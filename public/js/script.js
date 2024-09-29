// Brand List Scroll 
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
const brandList = document.getElementById('brand-list');

leftBtn.addEventListener('click', () => {
    brandList.scrollLeft -= 200;
});

rightBtn.addEventListener('click', () => {
    brandList.scrollLeft += 200;
});

// Video Pop up 
document.getElementById('open-video-btn').addEventListener('click', function () {
    document.getElementById('video-popup').style.display = 'flex';
});

document.getElementById('close-video-btn').addEventListener('click', function () {
    var videoPopup = document.getElementById('video-popup');
    var videoFrame = document.getElementById('video-frame');

    videoPopup.style.display = 'none';
    videoFrame.src = videoFrame.src; // Stop video playback
});

window.addEventListener('click', function (event) {
    var videoPopup = document.getElementById('video-popup');
    var videoFrame = document.getElementById('video-frame');

    if (event.target == videoPopup) {
        videoPopup.style.display = 'none';
        videoFrame.src = videoFrame.src; // Stop video playback
    }
});





