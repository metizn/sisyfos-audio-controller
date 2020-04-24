import * as React from 'react';
import { connect } from "react-redux";
import { IStore } from '../../server/reducers/indexReducer';


import '../assets/css/App.css';
import Channels from './Channels';
import Settings from './Settings';
import Storage from './RoutingStorage'
import MiniChannels from './MiniChannels';

export interface IAppProps {
    store: IStore
}

class App extends React.Component<IAppProps> {

    constructor(props: IAppProps) {
        super(props)
    }

    componentWillMount() {
        console.log('http args : ', window.location.search.includes('settings=0'))
        window.socketIoClient.emit('get-mixerprotocol', 'get selected mixerprotocol')
        window.socketIoClient.emit('get-store', 'update local store');
        window.socketIoClient.emit('get-settings', 'update local settings');
        this.iFrameFocusHandler()
    }

    public shouldComponentUpdate(nextProps: IAppProps) {
        return (
            nextProps.store.settings[0].showSettings != this.props.store.settings[0].showSettings
            || nextProps.store.settings[0].serverOnline != this.props.store.settings[0].serverOnline
            || nextProps.store.settings[0].showStorage != this.props.store.settings[0].showStorage
        )
    }

    sendSofieMessage(type: string, payload?: any | '', replyTo?: string | '') {
        window.top.postMessage({
            id: Date.now().toString(),
            replyToId: replyTo,
            type: type,
            payload: payload
        }, "*");
    }

    iFrameFocusHandler() {
        if (window.top !== window.self) {
            this.sendSofieMessage('hello')
            document.addEventListener('click', (e) => {
                e.preventDefault()
                this.sendSofieMessage('focus_in')
            }, true)
            window.addEventListener('message', (event) => {
                try {
                    const message = event.data
                    if (!message || !message.type) return;
                    switch (message.type) {
                        case 'welcome':
                            console.log('Hosted by: ' + message.payload);
                            // finish three-way handshake
                            this.sendSofieMessage('ack', undefined, message.id);
                            break;

                    }
                } catch (e) {
                    console.log('Error Sofie API')
                }
            })
    }
    }

    render() {
        return (
        <div>
            {!this.props.store.settings[0].serverOnline ? 
                <div className="server-offline">
                    TRYING TO CONNECT TO SISYFOS SERVER
                </div> 
            :
                 null 
            }
            {!window.location.search.includes('minimonitor=1') ? <Channels /> : null }
            {window.location.search.includes('minimonitor=1') ? <MiniChannels /> : null }
            {this.props.store.settings[0].showStorage ? <Storage/> : null}
            {this.props.store.settings[0].showSettings ? <Settings/> : null}
        </div>
        )
    }
}


const mapStateToProps = (state: any): IAppProps => {
    return {
        store: state
    }
}

export default connect<any, IAppProps>(mapStateToProps)(App) as any;
