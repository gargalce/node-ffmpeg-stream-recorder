# Install dependencies
> npm install

# Execute exemple
> node test/index.js

# Minimum version node
v8.10.0


# Config File
// Define route FFMPEG.EXE, URLStream to record and Enabled and config Log files
const conf = {
    ffmpegPath: 'C:/ffmpeg/bin/',
    urlStream: 'http://playertest.longtailvideo.com/adaptive/bipbop/bipbop.m3u8',
    enabledLogs: true,
    logFile: 'C:/TEMP/ffmpegRecorder-' +new Date().toISOString().slice(0, 10) + '.log'
};

// Define the path to save the recorded file, recording duration and type (video or audio file)
const data = {
    basePath: 'C:/TEMP/',
    fileName: '',
    duration: 0, // duration in seconds
    maxDuration: 10800, // 3 hours in seconds
    minDuration: 1, // 1 second
    type: 'video', // video or audio,
    headers: [],
    audioEncoding: {
        ar: 22050, // Set the audio frequency of the output file. The common values used are  22050, 44100, 48000 Hz
        ac: 2, // Set the number of audio channels
        audiobitrate: "192k", // Indicates the audio bitrate
        f: "mp3" // Output file format. In our case, it’s mp3 format   
    },
    videoEncoding: {
        acodec: "copy", // Set the audio codec
        vcodec: "copy", // Set the video codec
        audiobitrate: "192k",
        videobitrate: "2600k",
        size: "1280x720"
    }
}

# Example Code
const callback = (data) => {
    console.log("End Process");
}

const callbackError = (data) => {
    console.log("End ERROR Process");
}

// Record Stream
rffmpeg.record(data, conf, callback, callbackError);


# Get Process PID
rffmpeg.getProcessPid();

# Get FFMPEG process PID
rffmpeg.getPid();
or
rffmpeg.getFFMPEGPid();