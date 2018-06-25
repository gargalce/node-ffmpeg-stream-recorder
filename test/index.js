var rffmpeg = require('../lib/node-ffmpeg-stream-recorder');


const conf = {
    'ffmpegPath': 'e:/ffmpeg-20180619-a990184-win64-static/bin/',
    'urlStream': 'http://live10.cdnmedia.tv/vsnxallive/smil:live.smil/playlist.m3u8'
};

const data = {
    basePath: 'e:/',
    fileName: 'grab_' + (new Date().getTime()) + '.mp4',
    duration: 10, // duration in seconds
    type: 'video', // video or audio,
};

function callback(data) {
    console.log("End Process");
}

console.log(rffmpeg.record(data, conf, callback));