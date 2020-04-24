import { IMixerProtocol, emptyMixerMessage } from '../MixerProtocolInterface';

export const BehringerXrMaster: IMixerProtocol = {
    protocol: 'OSC',
    label: 'Behringer XR-series / Midas MR-series',
    mode: "master",
    FADE_DISPATCH_RESOLUTION: 5,
    leadingZeros: true,
    pingCommand: [
        {
            mixerMessage: "/xremote", value: 0,
            type: "f", min: 0, max: 1, zero: 0.75
        },
        {
            mixerMessage: "/meters", value: "/meters/1",
            type: "s", min: 0, max: 1, zero: 0.75
        },
        {
            mixerMessage: "/meters", value: "/meters/6",
            type: "s", min: 0, max: 1, zero: 0.75
        }
    ],
    pingResponseCommand: [
        {
            mixerMessage: "/xremote", value: 0,
            type: "f", min: 0, max: 1, zero: 0.75
        },
    ],
    pingTime: 9500,
    initializeCommands: [
        {
            mixerMessage: '/ch/{channel}/mix/fader',
            value: "",
            type: "s",
            min: 0,
            max: 1,
            zero: 0.75
        },
        {
            mixerMessage: '/ch/{channel}/config/name',
            value: "",
            type: "s",
            min: 0,
            max: 1,
            zero: 0.75
        },
        {
            mixerMessage: '/ch/{channel}/mix/{argument}/level',
            value: "",
            type: "aux",
            min: 0,
            max: 1,
            zero: 0.75
        },
        {
            mixerMessage: '/ch/{channel}/dyn/thr',
            value: "",
            type: "s",
            min: 0,
            max: 1,
            zero: 0.75
        },
        {
            mixerMessage: '/ch/{channel}/dyn/ratio',
            value: "",
            type: "s",
            min: 0,
            max: 1,
            zero: 0.75
        },
        {
            mixerMessage: '/ch/{channel}/delay/time',
            value: "",
            type: "s",
            min: 0,
            max: 1,
            zero: 0.75
        },
        {
            mixerMessage: '/ch/{channel}/eq/1/g',
            value: "",
            type: "s",
            min: 0,
            max: 1,
            zero: 0.75
        },
        {
            mixerMessage: '/ch/{channel}/eq/2/g',
            value: "",
            type: "s",
            min: 0,
            max: 1,
            zero: 0.75
        },
        {
            mixerMessage: '/ch/{channel}/eq/3/g',
            value: "",
            type: "s",
            min: 0,
            max: 1,
            zero: 0.75
        },
        {
            mixerMessage: '/ch/{channel}/eq/4/g',
            value: "",
            type: "s",
            min: 0,
            max: 1,
            zero: 0.75
        },
    ],
    channelTypes: [{
        channelTypeName: 'CH',
        channelTypeColor: '#2f2f2f',
        fromMixer: {
            CHANNEL_OUT_GAIN: [{ mixerMessage: '/ch/{channel}/mix/fader', value: 0, type: 'f', min: 0, max: 1, zero: 0.75}],
            CHANNEL_VU: [{ mixerMessage: '/meters/1', value: 0, type: 'f', min: 0, max: 1, zero: 0.75}],
            CHANNEL_VU_REDUCTION: [{ mixerMessage: '/meters/6', value: 0, type: 'f', min: 0, max: 1, zero: 0.75}],
            CHANNEL_NAME: [{ mixerMessage: '/ch/{channel}/config/name', value: 0, type: 'f', min: 0, max: 1, zero: 0.75}],
            PFL: [emptyMixerMessage()],
            NEXT_SEND: [emptyMixerMessage()],
            THRESHOLD: [{ mixerMessage: '/ch/{channel}/dyn/thr', value: 0, type: 'f', min: 0, max: 1, zero: 0}],
            RATIO: [{ mixerMessage: '/ch/{channel}/dyn/ratio', value: 0, type: 'f', min: 0, max: 11, zero: 0}],  
            DELAY_TIME: [{ mixerMessage: '/ch/{channel}/delay/time', value: 0, type: 'f', min: 0, max: 1, zero: 0}],
            LOW: [{ mixerMessage: '/ch/{channel}/eq/1/g', value: 0, type: 'f', min: 0, max: 1, zero: 0}],
            LO_MID: [{ mixerMessage: '/ch/{channel}/eq/2/g', value: 0, type: 'f', min: 0, max: 1, zero: 0}],
            MID: [{ mixerMessage: '/ch/{channel}/eq/3/g', value: 0, type: 'f', min: 0, max: 1, zero: 0}],
            HIGH: [{ mixerMessage: '/ch/{channel}/eq/4/g', value: 0, type: 'f', min: 0, max: 1, zero: 0}],
            AUX_LEVEL: [{mixerMessage: '/ch/{channel}/mix/{argument}/level', value: 0, type: 'f', min: 0, max: 1, zero: 0}], 
            CHANNEL_MUTE_ON: [{ mixerMessage: '/ch/{channel}/mix/on', value: 0, type: 'i', min: 0, max: 1, zero: 0}],
            // Only MUTE_ON is used as receiver
            CHANNEL_MUTE_OFF: [emptyMixerMessage()]
        },
        toMixer : {
            CHANNEL_OUT_GAIN: [{ mixerMessage: '/ch/{channel}/mix/fader', value: 0, type: 'f', min: 0, max: 1, zero: 0.75}],
            CHANNEL_NAME: [{ mixerMessage: '/ch/{channel}/config/name', value: 0, type: 'f', min: 0, max: 1, zero: 0.75}],
            PFL_ON: [emptyMixerMessage()],
            PFL_OFF: [emptyMixerMessage()],
            NEXT_SEND: [emptyMixerMessage()],
            THRESHOLD: [{ mixerMessage: '/ch/{channel}/dyn/thr', value: 0, type: 'f', min: 0, max: 1, zero: 0}],
            RATIO: [{ mixerMessage: '/ch/{channel}/dyn/ratio', value: 0, type: 'f', min: 0, max: 1, zero: 0}], 
            DELAY_TIME: [{ mixerMessage: '/ch/{channel}/delay/time', value: 0, type: 'f', min: 0, max: 1, zero: 0}],
            LOW: [{ mixerMessage: '/ch/{channel}/eq/1/g', value: 0, type: 'f', min: 0, max: 1, zero: 0}],
            LO_MID: [{ mixerMessage: '/ch/{channel}/eq/2/g', value: 0, type: 'f', min: 0, max: 1, zero: 0}],
            MID: [{ mixerMessage: '/ch/{channel}/eq/3/g', value: 0, type: 'f', min: 0, max: 1, zero: 0}],
            HIGH: [{ mixerMessage: '/ch/{channel}/eq/4/g', value: 0, type: 'f', min: 0, max: 1, zero: 0}],
            AUX_LEVEL: [{mixerMessage: '/ch/{channel}/mix/{argument}/level', value: 0, type: 'f', min: 0, max: 1, zero: 0}], 
            CHANNEL_MUTE_ON: [{ mixerMessage: '/ch/{channel}/mix/on', value: 0, type: 'f', min: 0, max: 1, zero: 0}],
            CHANNEL_MUTE_OFF: [{ mixerMessage: '/ch/{channel}/mix/on', value: 1, type: 'f', min: 0, max: 1, zero: 0}]
        },
    }],
    fader: {
        min: 0,
        max: 1,
        zero: 0.75,
        step: 0.01,
    },
    meter: {
        min: 0,
        max: 1,
        zero: 0.75,
        test: 0.6,
    }
}
