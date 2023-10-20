const play = document.getElementById('play')
const audio = document.getElementById('audio')
const progressBar = document.getElementById('seek-bar')
const pBarDiv = document.getElementById("progressBar")
const forSmalls = document.getElementById("forSmalls")

const small_2 = document.createElement('small')
forSmalls.appendChild(small_2)

const small = document.createElement('small')
forSmalls.appendChild(small)



play.addEventListener('click', () => {
    if(audio.paused){
        audio.play();
        play.textContent = "Pause"
        updateProgressBar();
    } else {
        audio.pause();
        play.textContent = 'Play';
    }
})

audio.addEventListener('loadedmetadata', () => {
    // The 'loadedmetadata' event is triggered when the duration is available.
    small.textContent = formatTime(audio.duration); // Display the duration.
});

audio.addEventListener('timeupdate', () => {
    updateProgressBar()
})

progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
})

function updateProgressBar() {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progressBarValue = (currentTime / duration) * 100;
    progressBar.value = progressBarValue;
    small_2.textContent = formatTime(audio.currentTime);

}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedTime = minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
    return formattedTime;
}