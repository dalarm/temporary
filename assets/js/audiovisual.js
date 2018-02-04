/*
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 100, 100);
*/

/* * * * * * 
 * New code *
 * * * * * * 
 */

var isPlaying = false; 
var playCount = 0;
$(document).ready(function(){
	$('.fa-play').click(function() {
		$(this).toggleClass('fa-pause'); 
	});
}); 


$(document).ready(function(){
	$('.fa-arrow-right').click(function() {
		isPlaying = false;
		var playButton = document.getElementById("play");
		if (($(playButton).hasClass("fa-pause")) == true) {
			$(playButton).toggleClass('fa-pause'); 
		}
		else if(($(playButton).hasClass("fa-play")) == true){ 
			return;
		}
	});
}); 


$(document).ready(function(){
	$('.fa-stop').click(function() {
		var playButton = document.getElementById("play");
		if(($(playButton).hasClass("fa-pause")) == true){ 
			$(playButton).toggleClass('fa-pause'); 
		}
	});
});  


var canvas = document.querySelector("canvas");
var musicButton = document.getElementById("playbtn");
var stopButton = document.getElementById("stopbtn");
var mySlider = document.getElementById("songSlider"); 
var myAudioSlider = document.getElementById("audioSlider"); 
var myMusic, seconds, minutes, diff, total, currentTime;
var audiosrcF, audiosrcT;
var audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // AudioContext
var analyser = audioCtx.createAnalyser(); 	// Create AnalyserNode
var distortion = audioCtx.createWaveShaper();
var gainNode = audioCtx.createGain();
var biquadFilter = audioCtx.createBiquadFilter();
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
var isTemp = false;
var audiosrc;
console.log(bufferLength);


//Initializing the song

findSong($('#music li:first-child'));

function findSong(current){
	var song = current.attr('song');
	var title = song.split(".");
	$('#songTitle').text(title[0]);
	myMusics = current.children(".song")
	myMusic = myMusics[0];
	$('#music li').removeClass('active');
	current.addClass('active');
	// not really needed in this exact case, but since it is really important in other cases,
	// don't forget to revoke the blobURI when you don't need it
	myMusic.addEventListener('loadedmetadata', function () {
		var time = myMusic.duration;
		var timer = document.getElementById("duration");
		time = convertTime(time);
		timer.innerHTML = time;
	});
	myMusic.onend = function (e) {
		URL.revokeObjectURL(this.src);
	}
	if(playCount === 0){
		audiosrcF = audioCtx.createMediaElementSource(myMusic);
	}
	else if (playCount === 1){
		audiosrcT = audioCtx.createMediaElementSource(myMusic);
	}
	initCanvas();
	var time = myMusic.duration;
	var timer = document.getElementById("duration");
	time = convertTime(time);
	timer.innerHTML = time;
}




// Slider will update time relative to the position of the slider thumb
myAudioSlider.value = 100; 
mySlider.value = 0; 
mySlider.addEventListener("change", function () {
	var seekTo = myMusic.duration * mySlider.value;
	myMusic.currentTime = seekTo;
});

function convertTime(secs) {
	if (secs >= 60) {
		minutes = Math.floor(secs / 60);
		diff = minutes * 60;
		seconds = Math.floor(secs - diff);
		if (seconds == 0) {
			total = minutes + ":0" + seconds;
			return total;
		}
		else {
			if (seconds < 10) {
				return minutes + ":0" + seconds;
			}
			total = minutes + ":" + seconds;
			return total;
		}
	}

	else {
		seconds = Math.floor(secs)
		if (seconds < 10) {
			return "0" + ":0" + seconds;
		}
		total = "0" + ":" + seconds;
		return total;
	}
}


$('#next').click(function() {
	myMusic.pause();
	var nextSong = $('#music li.active').next();
	
	if(nextSong.length == 0){
		nextSong = $('#music li:first-child');
	}

	findSong(nextSong);
})

function setCurrentTime(currentTime) {
	/*	var converted;
		currentTime += 1; 
		converted = convertTime(currentTime);
		
	*/
	// Smh, turns out the audio api comes with a "currentTime" property. 

	var current, timer, updateSliderTo;
	current = convertTime(myMusic.currentTime);
	timer = document.getElementById("currentTime");
	timer.innerHTML = current;

	updateSliderTo = myMusic.currentTime / myMusic.duration;
	mySlider.value = updateSliderTo; 
}

function toggleMusic() {
	musicButton.onclick = function () {
		if (!isPlaying) {
			myMusic.play();
			isPlaying = true;
			setInterval(setCurrentTime, 250); 
		}
		else {
			myMusic.pause();
			//musicButton
			isPlaying = false;
		}
	}

	stopButton.onclick = function () {
		myMusic.pause();
		isPlaying = false;
		myMusic.currentTime = 0;
	}
}

function adjustVolume() {
	myMusic.volume = document.getElementById("audioSlider").value;
}

/* * * * * 
 * Canvas *
 * * * * *
 */

function initCanvas() {
		var context = canvas.getContext('2d');

		// Extract data from audio source with AnalyserNode
		//var audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // AudioContext

		if(playCount % 2 === 0){
			audiosrc = audiosrcF;
			audiosrc.connect(analyser);
			
			analyser.connect(audioCtx.destination);
		}
		else{
			audiosrc = audiosrcT;
			audiosrc.connect(analyser);
			
			analyser.connect(audioCtx.destination);
		}
		playCount++;


		//var audiosrc = audioCtx.createMediaElementSource(myMusic); // Takes music
	/*	var analyser = audioCtx.createAnalyser(); 	// Create AnalyserNode
		var distortion = audioCtx.createWaveShaper();
		var gainNode = audioCtx.createGain();
		var biquadFilter = audioCtx.createBiquadFilter();
	*/


		//Setting up the array to store data from sound file.

		WIDTH = canvas.width;
		HEIGHT = canvas.height;
		context.clearRect(0, 0, WIDTH, HEIGHT);
/*
		var bufferLength = analyser.frequencyBinCount;
		var dataArray = new Uint8Array(bufferLength);
		console.log(bufferLength);

		context.clearRect(0, 0, WIDTH, HEIGHT);

		audiosrc.connect(analyser);

		analyser.connect(audioCtx.destination);*/
		bvisualize();
		/*
		* Visualizer for bars 
		*/

		function bvisualize() {
			function draw() {
				var colors = document.getElementById("color");
				var selectedCol = colors.options[colors.selectedIndex].value;
				var drawVisual = requestAnimationFrame(draw);

				analyser.getByteFrequencyData(dataArray);

				// Set canvas properties 
				context.fillStyle = '#002D3C';
				context.fillRect(0, 0, WIDTH, HEIGHT);

				var barWidth = (WIDTH / bufferLength) * 3.5;
				var barHeight;

				// Set bar color property
				//context.fillStyle = '#00CCFF';
				context.fillStyle = selectedCol;
				// Render the bars 
				for (var i = 0; i < bufferLength; i++) {
					x = i * 2;
					barHeight = dataArray[i];
					context.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);

					x += barWidth + 1;
				}
			}
			draw();

		}

}
toggleMusic();