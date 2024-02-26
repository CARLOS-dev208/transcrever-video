import ytdl from "ytdl-core";
import fs from "fs";

export const downloadVideo = (videoId) => new Promise((resolve, reject) => {
    const videoUrl = `https://youtube.com/watch?v=${videoId}`;
    const downLoad = ytdl(videoUrl, {
        quality: 'lowestaudio', filter: 'audioonly'
    });
    downLoad.on('end', () => resolve());
    downLoad.on('error', () => reject('ERROR_DOWNLOADING_VIDEO_'));
    downLoad.pipe(fs.createWriteStream('audio.mp4'))
})
