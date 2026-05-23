let playpause_btn = document.getElementsByClassName("playpause-track")[0];
let current_track = document.getElementById("myAudio");

let track_list = [
    {
        name: "Minecraft Classic",
        author: "Mojang",
        image: "images/MinecraftSunset.jpg",
        path: "songs/Minecraft1.mp3",
        file: "Minecraft1.mp3"
    },
    {
        name: "Minecraft Universe",
        author: "Mojang",
        image: "images/MinecraftAdventure.jpg", // FIX: added images/
        path: "songs/Minecraft2.mp3",
        file: "Minecraft2.mp3"                 // FIX: correct file name
    },
    {
        name: "Minecraft Speedrun",
        author: "Mojang",
        image: "images/OIP.webp",
        path: "songs/Minecraft3.mp3",
        file: "Minecraft3.mp3"
    },
    {
        name: "Minecraft",
        author: "Julian_Rocha",
        image: "images/grass-block.jpg",
        path: "songs/Distant.mp3",
        file: "Distant.mp3"
    },
    {
        name: "Minecraft Overworld",
        author: "Mojang",
        image: "images/Overworld.jpg",
        path: "songs/Calm.mp3",
        file: "Calm.mp3"
    }
];

// DOM elements for display
let track_art = document.getElementsByClassName("track-art")[0];
let track_name = document.getElementsByClassName("track-name")[0];
// not used, but kept for compatibility
let track_Desc = document.getElementsByClassName("track-Desc")[0];
let now_playing = document.getElementsByClassName("now_playing")[0];
let track_author = document.getElementsByClassName("track_author")[0];

let track_index = 0;
let isPlaying = false;

const images = [
  'images/1.png',
  'images/2.png',
  'images/3.png',
  'images/4.png',
  'images/5.png',
  'images/6.png',
  'images/7.png',
  'images/8.png',
  'images/9.png',
  'images/10.png',
  'images/11.png'
];

// Track previously used index to avoid immediate repeats
let lastIndex = -1;

// Function to get a random image different from the last one
function getRandomImage() {
  let randomIndex;
  
  // If there's only one image, return it
  if (images.length === 1) {
    return images[0];
  }
  
  // Get a random index different from the last one
  do {
    randomIndex = Math.floor(Math.random() * images.length);
  } while (randomIndex === lastIndex);
  
  lastIndex = randomIndex;
  return images[randomIndex];
}

// Function to change the background
function changeBackground() {
  const randomImage = getRandomImage();
  document.body.style.backgroundImage = `url('${randomImage}')`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.transition = 'background-image 1s ease-in-out';
}

// Set initial background
changeBackground();

// Change background every 30 seconds (30000 milliseconds)
setInterval(changeBackground, 10000);



// PLAY
function playTrack() {
    current_track.play();
    isPlaying = true;
    playpause_btn.src = "images/pause.png";
    timer();
}

// PAUSE
function pauseTrack() {
    current_track.pause();
    isPlaying = false;
    playpause_btn.src = "images/play.png";
    clearInterval(updateTimer);
}

function playAndPause() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

// makes play and pause button clickable
playpause_btn.addEventListener("click", playAndPause);

function loadTrack(index) {
    current_track.src = track_list[index].path;

    track_art.src = track_list[index].image;
    track_name.textContent = track_list[index].name;
    track_author.textContent = track_list[index].author;
    now_playing.textContent = "PLAYING " + (index + 1) + " OF " + track_list.length;

    current_track.load();
    resetTimer();
}

// Time & sliders
let current_time = document.getElementsByClassName("current-time")[0];
let total_duration = document.getElementsByClassName("total-duration")[0];
let max_volume = document.getElementsByClassName("max-volume")[0];
let no_volume = document.getElementsByClassName("no-volume")[0];
let seek_slider = document.getElementsByClassName("seek_slider")[0];
let volume_slider = document.getElementsByClassName("volume_slider")[0];

function durationUpdate() {
    let currentMinutes = Math.floor(current_track.currentTime / 60);
    let currentSeconds = Math.floor(current_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(current_track.duration / 60);
    let durationSeconds = Math.floor(current_track.duration - durationMinutes * 60);

    // Guard against NaN before metadata is loaded
    if (isNaN(currentSeconds) || isNaN(durationSeconds)) {
        current_time.textContent = "00:00";
        total_duration.textContent = "00:00";
        return;
    }

    if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;
    if (currentMinutes < 10) currentMinutes = "0" + currentMinutes;
    if (durationSeconds < 10) durationSeconds = "0" + durationSeconds;
    if (durationMinutes < 10) durationMinutes = "0" + durationMinutes;

    current_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
}

function updateSlider() {
    if (!isNaN(current_track.duration) && isPlaying) {
        let sliderPosition = current_track.currentTime * (100 / current_track.duration);
        seek_slider.value = sliderPosition;
        durationUpdate();
    }
}

function resetTimer() {
    current_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

let updateTimer;

function timer() {
    clearInterval(updateTimer);
    resetTimer();
    updateTimer = setInterval(updateSlider, 1000);
}

//It updates the time of the slider.
function changeTime() {
    current_track.currentTime = current_track.duration * (seek_slider.value / 100);
}

// Volume
function changeVolume() {
    current_track.volume = volume_slider.value / 100;
}

function mute() {
    volume_slider.value = 0;
    changeVolume();
}
no_volume.addEventListener("click", mute);

function loud() {
    volume_slider.value = 100;
    changeVolume();
}
max_volume.addEventListener("click", loud);

// Download button
let download_btn = document.getElementsByClassName("download")[0];

function download_track(track_index) {
    let link = download_btn.parentElement;
    link.setAttribute("href", track_list[track_index].path);
    link.setAttribute("download", track_list[track_index].file);
}

// Next / Prev
function nextTrack() {
    if (track_index < track_list.length - 1) track_index += 1;
    else track_index = 0;

    loadTrack(track_index);
    download_track(track_index);
    timer();
    playTrack();
}

let next_btn = document.getElementsByClassName("next-track")[0];
next_btn.addEventListener("click", nextTrack);

function prevTrack() {
    if (track_index > 0) track_index -= 1;
    else track_index = track_list.length - 1;

    loadTrack(track_index);
    download_track(track_index);
    timer();
    playTrack();
}

let prev_btn = document.getElementsByClassName("prev-track")[0];
prev_btn.addEventListener("click", prevTrack);

// Auto play next when track ends
current_track.addEventListener("ended", nextTrack);

// Call these AFTER everything is defined
loadTrack(track_index);
download_track(track_index);
