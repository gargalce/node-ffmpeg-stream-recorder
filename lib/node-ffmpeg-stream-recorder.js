const defaultConf = {
    'ffmpegPath': '',
    'urlStream': ''
};

const defaultFile = {
    basePath: '',
    fileName: '',
    duration: 0, // duration in seconds
    maxDuration: 10800, // 3 hours in seconds
    minDuration: 1, // 1 second
    type: 'video', // video or audio,

    audioEncoding: {
        ar: 22050, // Set the audio frequency of the output file. The common values used are  22050, 44100, 48000 Hz
        ac: 2, // Set the number of audio channels
        audiobitrate: "180k", // Indicates the audio bitrate
        f: "mp3" // Output file format. In our case, it’s mp3 format   
    },
    videoEncoding: {
        acodec: "copy", // Set the audio codec
        vcodec: "copy", // Set the video codec
        audiobitrate: "128k",
        videobitrate: "2600k",
        size: "720x405"
    }
}


exports.record = function(data = {}, conf = {}, callback) {


    try {

        let _data = {
            basePath: data.basePath || defaultFile.basePath,
            fileName: data.fileName || defaultFile.fileName,
            duration: parseInt(data.duration) || defaultFile.duration,
            maxDuration: parseInt(data.maxDuration) || defaultFile.maxDuration,
            minDuration: parseInt(data.minDuration) || defaultFile.minDuration,
            type: data.type || defaultFile.type,

            audioEncoding: {
                ar: (data.audioEncoding || {}).ar || defaultFile.audioEncoding.ar,
                ac: (data.audioEncoding || {}).ac || defaultFile.audioEncoding.ac,
                ab: (data.audioEncoding || {}).audiobitrate || defaultFile.audioEncoding.audiobitrate,
                f: (data.audioEncoding || {}).f || defaultFile.audioEncoding.f
            },
            videoEncoding: {
                acodec: (data.videoEncoding || {}).acodec || defaultFile.videoEncoding.acodec,
                audiobitrate: (data.videoEncoding || {}).audiobitrate || defaultFile.videoEncoding.audiobitrate,
                vcodec: (data.videoEncoding || {}).vcodec || defaultFile.videoEncoding.vcodec,
                videobitrate: (data.videoEncoding || {}).videobitrate || defaultFile.videoEncoding.videobitrate,
                size: (data.videoEncoding || {}).size || defaultFile.videoEncoding.size
            }

        }


        if (!isObject(conf)) {
            throw "Configuration not is Valid Object";
        }

        if (!isObject(data)) {
            throw "Data not is Valid Object";
        }

        if (!fileExists(data.basePath)) {
            throw "Out Folder not exists";
        }

        if (!validUrl(conf.urlStream)) {
            throw "urlStream  not is Valid URL";
        }



        if (!fileExists(conf.ffmpegPath, 'ffmpeg.exe')) {
            throw "ffmpeg is required, not exists in config path";
        }

        if (_data.duration < _data.minDuration || _data.duration > _data.maxDuration) {
            throw "Duration is out of range";
        }



        const timeSeconds = data

        const { spawn } = require('child_process');

        let params = [];

        // Input Streaming URL
        params.push("-i")
        params.push(conf.urlStream);

        // recording time
        params.push("-t");
        // transforn seconds to HH:MM:SS format
        params.push((new Date(_data.duration * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0]);

        if (_data.type == 'video') {

            params.push("-acodec");
            params.push(_data.videoEncoding.acodec);

            params.push("-ab");
            params.push(_data.videoEncoding.audiobitrate);

            params.push("-vcodec");
            params.push(_data.videoEncoding.vcodec);

            params.push("-b:v");
            params.push(_data.videoEncoding.videobitrate);

            params.push("-s");
            params.push(_data.videoEncoding.size);



        } else if (type == 'audio') {

            params.push("-ar");
            params.push(_data.audioEncoding.ar);

            params.push("-ac");
            params.push(_data.audioEncoding.ac);

            params.push("-ab");
            params.push(_data.audioEncoding.audiobitrate);

            params.push("-f");
            params.push(_data.audioEncoding.f);

        } else {
            throw "Type file is not valid";
        }


        params.push(_data.basePath + _data.fileName);
        console.log(params);

        // execute action
        const child = spawn(conf.ffmpegPath + 'ffmpeg', params);

        child.stdout.on('data', (chunk) => {});

        //child.stdout.pipe(process.stdout);
        child.stderr.pipe(process.stderr);

        child.on('close', (code) => {
            //  console.log(`child process exited with code ${code}`);
            callback(_data);
        });

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

function isObject(a) {
    return (!!a) && (a.constructor === Object);
}

function validUrl(url) {
    var r = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
    return r.test(url);
}

function fileExists(path, file = '') {
    const fs = require('fs');
    return fs.existsSync(path + file);
}