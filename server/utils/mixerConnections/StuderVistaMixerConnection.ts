//@ts-ignore
import { BER } from 'node-emberplus'
import { state } from '../../reducers/store'
const net = require('net')

//Utils:
import { IMixerProtocol } from '../../constants/MixerProtocolInterface';
import { logger } from '../logger';

export class StuderVistaMixerConnection {
    mixerProtocol: IMixerProtocol
    deviceRoot: any;
    emberNodeObject: Array<any>;
    socket: any

    constructor(mixerProtocol: IMixerProtocol) {
        this.sendOutMessage = this.sendOutMessage.bind(this);
        this.pingMixerCommand = this.pingMixerCommand.bind(this);
        
        this.emberNodeObject = new Array(200);
        this.mixerProtocol = mixerProtocol;
        
        logger.info("Setting up Ember connection")

       this.socket = net.createConnection(
            {
                port: 8087,
                host: "10.225.15.196",
                timeout: 20000000
            }, 
            () => {

            }
        )
        this.socket.on('data', (data: any) => {
            // A 2 way respons is to be implemented
            logger.verbose('Ember Server data recieved')
        })   
        .on('end',() => {
            // When connection disconnected.
            logger.info('Ember Client socket disconnect. ');
        })
        .on('error', (err: any) => {
            logger.error(JSON.stringify(err));
        })
        .on('connect', () => {
            this.setupMixerConnection()
        })
    }

    setupMixerConnection() {
        logger.info('Ember connection established')

        //Ping OSC mixer if mixerProtocol needs it.
        if (this.mixerProtocol.pingTime > 0) {
            let emberTimer = setInterval(
                () => {
                    this.pingMixerCommand();
                },
                this.mixerProtocol.pingTime
            );
        }
    }

    subscribeFaderLevel(ch: number, typeIndex: number, channelTypeIndex: number) {
        return
    }

    subscribeChannelName(ch: number, typeIndex: number, channelTypeIndex: number) {
        return
    }

    pingMixerCommand() {
        this.mixerProtocol.pingCommand.map((command) => {
            let hexArray = command.mixerMessage.split(' ')
            let buf = new Buffer(hexArray.map((val:string) => { return parseInt(val, 16) }))
            this.socket.write(buf)
            logger.verbose('WRITING PING TO MIXER')
        })
    }

    sendOutMessage(mixerMessage: string, channel: number, value: string | number, type: string) {
        return
    }

    sendOutLevelMessage(channel: number, value: number) {
        let levelMessage: string
        let channelVal: number
        let channelType = state.channels[0].channel[channel - 1].channelType;
        let channelTypeIndex = state.channels[0].channel[channel - 1].channelTypeIndex;

        levelMessage = this.mixerProtocol.channelTypes[channelType].toMixer.CHANNEL_OUT_GAIN[0].mixerMessage
        channelVal = 160 + channelTypeIndex + 1

        let channelByte = new Uint8Array([
            (channelVal & 0x000000ff),
        ])

        logger.verbose('Fader value : ' + Math.floor(value))
        let BERwriter = new BER.Writer()

        BERwriter.startSequence();
        BERwriter.writeReal(Math.floor(value));
        BERwriter.endSequence();

        let bufferString: string = ''
        BERwriter.buffer.forEach((element: any) => {
            bufferString += ('0' + element.toString(16)).slice(-2) + ' '
        });
        levelMessage = levelMessage.replace('{channel}', ('0' + channelByte[0].toString(16)).slice(-2))
        levelMessage = levelMessage.replace('{level}', (bufferString + '00 00 00 00 00').slice(3, 35))

        let hexArray = levelMessage.split(' ')
        let buf = new Buffer(hexArray.map((val:string) => { return parseInt(val, 16) }))
        this.socket.write(buf)
        logger.verbose("Send HEX: " + levelMessage) 
    }

    sendOutRequest(mixerMessage: string, channel: number) {
        return
    }

    updateOutLevel(channelIndex: number) {
        let outputlevel = state.channels[0].channel[channelIndex].outputLevel
        let level = 20 * Math.log((1.3*outputlevel)/0.775)
        if (level < -90) {
            level = -90
        }
        // console.log('Log level :', level)

        this.sendOutLevelMessage(
            channelIndex+1,
            level,
        );
    }

    updateFadeIOLevel(channelIndex: number, outputLevel: number) {
        let level = 20 * Math.log((1.3*outputLevel)/0.775)
        if (level < -90) {
            level = -90
        }
        // console.log('Log level :', level)

        this.sendOutLevelMessage(
            channelIndex+1,
            level
        )
    }

    updatePflState(channelIndex: number) {
        return
    }

    updateMuteState(channelIndex: number, muteOn: boolean) {
        return true
    } 

    updateNextAux(channelIndex: number, level: number) {
        return true
    } 


    updateThreshold(channelIndex: number, level: number) {
        return true
    }
    updateRatio(channelIndex: number, level: number) {        
        return true

    }
    updateDelayTime(channelIndex: number, level: number) {
         return true
    }
    updateLow(channelIndex: number, level: number) {
         return true
    }
    updateLoMid(channelIndex: number, level: number) {
        return true
    }
    updateMid(channelIndex: number, level: number) {
        return true
    }
    updateHigh(channelIndex: number, level: number) {
        return true
    }
    updateAuxLevel(channelIndex: number, auxSendIndex: number, level: number) {
        return true
    }

    updateChannelName(channelIndex: number) {
        return
    }

    injectCommand(command: string[]) {
        return true
    }

}

