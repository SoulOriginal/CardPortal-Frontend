import Vue from 'vue'

import videojs from 'video.js'

import 'webrtc-adapter'
import RecordRTC from 'recordrtc'

// the following imports are only needed when you're recording
// audio-only using the videojs-wavesurfer plugin
/*
    import WaveSurfer from 'wavesurfer.js';
    import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js';
    WaveSurfer.microphone = MicrophonePlugin;

    // register videojs-wavesurfer plugin
    import videojs_wavesurfer_css from 'videojs-wavesurfer/dist/css/videojs.wavesurfer.css';
    import Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer.js';
    */

import Record from 'videojs-record/dist/videojs.record.js'
Vue.use(videojs)
Vue.use(webrtc - adapter)
Vue.use(RecordRTC)
Vue.use(Record)
