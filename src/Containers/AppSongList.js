import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {
    View,
    Text
} from 'native-base';

import { LargeList } from "react-native-largelist";

import { setSongId } from '../Actions/PlayerActions';

class AppSongList extends React.Component {    
    render() {
        return (
            <LargeList
                style={{ flex: 1 }}
                bounces={true}
                safeMargin={300}
                numberOfRowsInSection={() => this.props.songs.songList.length}
                heightForCell={(section, row) => 70}
                renderCell={(section, row) => {
                    return (
                        <TouchableOpacity onPress={() => this.props.setSongId({id: row, path: this.props.songs.songList[row].path})} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
                            <View style={{ flex: 4 }}>
                                <Text numberOfLines={1} style={{color: 'white', fontWeight: 'bold'}}>{this.props.songs.songList[row].title}</Text>
                                <Text numberOfLines={1} style={{color: this.props.style.lightGrey}} note>{this.props.songs.songList[row].author}</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Text numberOfLines={1} style={{color: this.props.style.darkWhite}} note>{this.props.songs.songList[row].time}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
                renderItemSeparator={() => 
                    <View style={{ height: 1, backgroundColor: 'rgb(90, 90, 90)' }} />
                                    }
                />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        style: state.StyleReducer,
        songs: state.SongsReducer,
        player: state.PlayerReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSongId: (value) => {
            dispatch(setSongId(value));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppSongList);