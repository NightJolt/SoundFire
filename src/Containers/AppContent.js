import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Content,
    View,
    Spinner,
    Text
} from 'native-base';

import AppPlayer from './AppPlayer';
import AppSongList from './AppSongList';
import AppSettings from './AppSettings';
import AppHelp from './AppHelp';
import AppAbout from './AppAbout';

function GetContent(props) {
    if (!props.songs.loaded) {
        return (
            <Content contentContainerStyle={{ justifyContent: 'center', flex: 1, backgroundColor: props.style.darkGrey }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Spinner color={props.style.mainColor} />
                </View>
            </Content>
        )
    }

    switch(props.content.currentPage) {
        case 0:
            return (
                <AppPlayer />
            )
            break;
        case 2:
            return (
                <AppSongList />
            )
            break;
        case 4:
            return (
                <AppSettings />
            )
            break;
        case 5:
            return (
                <AppHelp />
            )
            break;
        case 6:
            return (
                <AppAbout />
            )
            break;
        default:
            return (
                <Content contentContainerStyle={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 26, color: props.style.mainColor }}>Coming Soon</Text>
                        <Text note>Possibly in the next release (hopefully)</Text>
                    </View>
                </Content>
            )
            break;
    }
}

class AppContent extends Component {
    render() {
        return (
            <GetContent content={this.props.content} songs={this.props.songs} style={this.props.style} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        style: state.StyleReducer,
        content: state.ContentReducer,
        songs: state.SongsReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContent);