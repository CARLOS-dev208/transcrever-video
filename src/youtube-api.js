import {loadingMessage} from "./loading.js";

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
window.YTPlayer = null;

export function getVideoId(url) {
    const [_, parte] = url.split('?v=');
    return parte.split('&')[0]
}

export function loadVideo(url) {
    loadingMessage('Carregando vídeo do YouTube')
    return new Promise((resolve, reject) => {
        window.YTPlayer = new YT.Player('youtubeVideo', {
            videoId: getVideoId(url),
            events: {
                'onReady': resolve,
            }
        })
    })
}
