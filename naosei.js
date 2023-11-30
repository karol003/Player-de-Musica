const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const currentprogress = document.getElementById('currentprogress');
const progressContainer = document.getElementById('progresscontainer');
const shuffle = document.getElementById('shuffle');


const IntroSerendipity = {
    songName: "Intro Serendipity",
    artist: "BTS",
    file: '01. Intro Serendipity',
};

const Dimple = {
    songName: "Dimple",
    artist: "BTS",
    file: '04. 보조개 (Dimple)',
};

let isPlaying = false;
let isShuffle = false;
const playlist = [IntroSerendipity, Dimple];
let sortedPlaylist = [...playlist];
let index = 0;

function playSong() {
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong() {
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
}

function playPauseDecider() {
    if (isPlaying === true) {
        pauseSong();
    } else {
        playSong();
    }
}

function initializeSong() {

    
    song.src = `images/songs/${playlist[index].file}.mp3`;
    songName.innerText = playlist[index].songName;
    bandName.innerText = playlist[index].artist;
}

function previousSong() {
    if (index === 0) {
        index = playlist.length - 1;
    } else {
        index -= 1;
    }
    initializeSong();
    playSong();  // Se deseja iniciar a reprodução automaticamente ao mudar de música, mantenha essa linha aqui
}

function nextSong() {
    if (index === playlist.length - 1) {  // Corrigido o operador de comparação
        index = 0;
    } else {
        index += 1;
    }
    initializeSong();
    playSong();  // Se deseja iniciar a reprodução automaticamente ao mudar de música, mantenha essa linha aqui
}

function updateProgressBar() {
    const barWidth = (song.currentTime / song.duration) * 100;
    currentprogress.style.setProperty('--progress', `${barWidth}%`);
}

function shuffleClick() {
    if (isShuffle === false) {
        isShuffle = true;
        shuffleArray(sortedPlaylist);
        shuffle.classList.add('buttonactive');
    } else {
        isShuffle = false;
        sortedPlaylist = [...playlist]; // Use spread operator to create a copy
        shuffle.classList.remove('buttonactive');
    }
}

function jumpTo(event) {
    if (isPlaying) {
        const width = progressContainer.clientWidth;
        const clickPosition = event.offsetX;
        const jumpToTime = (clickPosition / width) * song.duration;
        song.currentTime = jumpToTime;
    }
}



initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', jumpTo);
shuffle.addEventListener('click', shuffleClick);