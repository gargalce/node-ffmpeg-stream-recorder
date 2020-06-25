var rffmpeg = require('../lib/node-ffmpeg-stream-recorder');

const conf = {
    ffmpegPath: 'C:/ffmpeg/bin/',
    urlStream: 'http://playertest.longtailvideo.com/adaptive/bipbop/bipbop.m3u8',
    enabledLogs: true,
    logFile: 'C:/TEMP/ffmpegRecorder-' +new Date().toISOString().slice(0, 10) + '.log'
};

const data = {
    basePath: 'C:/TEMP/',
    fileName: 'grab_' + (new Date().getTime()) + '.mp4',
    duration: 30, // duration in seconds
    type: 'video', // video or audio,
};


const callback = (data) => {
    console.log("End Process");
}

const callbackError = (data) => {
    console.log("End ERROR Process");
}

// Record Stream
rffmpeg.record(data, conf, callback, callbackError);

// Process PID
console.log('Process:' + rffmpeg.getProcessPid());

// Subprocess PID
console.log('ChildProcess:' + rffmpeg.getPid());
console.log('FFMPG PID :' + rffmpeg.getFFMPEGPid());
