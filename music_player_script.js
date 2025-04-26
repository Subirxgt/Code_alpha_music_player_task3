const playPauseButton = document.getElementById('play-pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const audio = document.getElementById('audio');
const progressBar = document.getElementById('progress-bar');
const timeDisplay = document.getElementById('time');
const volumeBar = document.getElementById('volume-bar');
const volumeValue = document.getElementById('volume-value');

let isPlaying = false;
let songs = [
  { title: 'Song 1', src: 'Ek Tarfa - Darshan Raval 320 Kbps.mp3', cover: 'ek_tarfa.jpg' },
  { title: 'Song 2', src: 'Bekhayali - Kabir Singh 320 Kbps.mp3', cover: 'bekhyali.jpg' },
  { title: 'Song 3', src: 'Bol Do Na Zara - Azhar 320 Kbps.mp3', cover: 'bol_do_na.jpg' },
  { title: 'Song 4', src: 'Judaiyaan - Judaiyaan 320 Kbps.mp3', cover: 'judaiyaan.jpg' },
  { title: 'Song 5', src: 'Kaash Aisa Hota - Darshan Raval - PagalSongs.com.mp3', cover: 'kaash_aisa.jpg' },
  { title: 'Song 6', src: 'Kabhi Jo Baadal Barse Jackpot 320 Kbps.mp3', cover: 'kabhi.jpg' },
  { title: 'Song 7', src: 'Khairiyat (Bonus Track) - Chhichhore 320 Kbps.mp3', cover: 'khariyat.jpg' },
  { title: 'Song 8', src: 'Mujhe Peene Do - Judaiyaan 320 Kbps.mp3', cover: 'mujhe_peno_do.jpg' },
  { title: 'Song 9', src: 'Sanam Teri Kasam - Sanam Teri Kasam 320 Kbps.mp3', cover: 'sanam_teri.jpg' },
  { title: 'Song 10', src: 'Sunn Raha Hai (Male) - Aashiqui 2 320 Kbps.mp3', cover: 'tum.jpg' },
];

let currentSongIndex = 0;

function loadSong(song) {
  audio.src = song.src;
  document.getElementById('song-name').textContent = song.title;
  document.getElementById('cover').src = song.cover;
  progressBar.value = 0;
  audio.currentTime = 0;
  updateTimeDisplay();
}

function togglePlayPause() {
  if (isPlaying) {
    audio.pause();
    playPauseButton.textContent = '▶';
  } else {
    audio.play();
    playPauseButton.textContent = '❚❚';
  }
  isPlaying = !isPlaying;
}

function updateProgress() {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress;
  updateTimeDisplay();
}

function updateTimeDisplay() {
  const currentMinutes = Math.floor(audio.currentTime / 60);
  const currentSeconds = Math.floor(audio.currentTime % 60);
  const durationMinutes = Math.floor(audio.duration / 60);
  const durationSeconds = Math.floor(audio.duration % 60);

  timeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds} / ${durationMinutes}:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;
}

function seekTo(event) {
  const progress = (event.offsetX / progressBar.offsetWidth) * audio.duration;
  audio.currentTime = progress;
}

function changeVolume() {
  audio.volume = volumeBar.value / 100;
  volumeValue.textContent = volumeBar.value;
}

function playNext() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(songs[currentSongIndex]);
  if (isPlaying) audio.play();
}

function playPrev() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentSongIndex]);
  if (isPlaying) audio.play();
}

playPauseButton.addEventListener('click', togglePlayPause);
prevButton.addEventListener('click', playPrev);
nextButton.addEventListener('click', playNext);
progressBar.addEventListener('click', seekTo);
volumeBar.addEventListener('input', changeVolume);

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', playNext);

// Load the first song
loadSong(songs[currentSongIndex]);
