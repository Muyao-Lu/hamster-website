const music_player = document.getElementById("music");
function play_music(){
    if (music_player.paused){
        music_player.play()
    }
    else{
        music_player.pause()
    }
}