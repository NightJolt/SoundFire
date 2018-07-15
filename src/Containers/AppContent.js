import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Content,
    View,
    Spinner,
    Text
} from 'native-base';

import AppSongList from './AppSongList';
import AppSettings from './AppSettings';

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
        case 2:
            return (
                <Content contentContainerStyle={{ flex: 1 }}>
                    <AppSongList />
                </Content>
            )
            break;
        case 4:
            return (
                <Content padder>
                    <AppSettings />
                </Content>
            )
            break;
        default:
            return (
                <Content contentContainerStyle={{ flex: 1 }}>
                    <View>
                        
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