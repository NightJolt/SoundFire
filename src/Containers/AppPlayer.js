import React, { Component } from 'react';
import { Image, Slider } from 'react-native';
import { connect } from 'react-redux';
import {
    Content,
    View,
    Card,
    CardItem,
    Thumbnail,
    Text,
    Button,
    Icon,
    Left,
    Body,
    Right,
    Accordion
} from 'native-base';

import { formatTimeBySeconds } from '../Functions';

class AppPlayer extends Component {
    componentDidMount() {
        let path = this.props.songs.songList[this.props.player.currentSongId].cover;
        /*if (path == undefined) {
            this.cover = require('../Images/default_cover.png');
        } else {
            path = path.replace('file:///storage/emulated/0/', '');
            this.cover = require('file:///storage/emulated/0/' + path);
        }*/
    }
    
    render() {
        return (
            <Content padder>
                <Card style={{ backgroundColor: this.props.style.grey, borderColor: this.props.style.lightBlack }}>
                    <CardItem style={{ backgroundColor: this.props.style.grey }}>
                      <Left>
                        <Thumbnail source={'../Images/default_cover.png'} />
                        <Body>
                          <Text numberOfLines={2} style={{ color: this.props.style.darkWhite }}>{this.props.songs.songList[this.props.player.currentSongId].title}</Text>
                          <Text numberOfLines={1} note>{this.props.songs.songList[this.props.player.currentSongId].author}</Text>
                        </Body>
                      </Left>
                    </CardItem>
                </Card>
                <Card style={{ backgroundColor: this.props.style.grey, borderColor: this.props.style.lightBlack }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5 }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: this.props.style.darkWhite }}>00:00</Text>
                        </View>
                        <View style={{ width: '74%', justifyContent: 'center' }}>
                            <Slider minimumTrackTintColor={this.props.style.mainColor} thumbTintColor={this.props.style.mainColor} />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: this.props.style.darkWhite }}>{this.props.songs.songList[this.props.player.currentSongId].time}</Text>
                        </View>
                    </View>
                </Card>
                <Card style={{ backgroundColor: this.props.style.grey, borderColor: this.props.style.lightBlack }}>
                    <CardItem style={{ backgroundColor: this.props.style.grey }}>
                        <Accordion dataArray={[{
                            title: 'Lyrics',
                            content: 'Playing Minecraft'
                        }]} />
                    </CardItem>
                </Card>
                <Card style={{ backgroundColor: this.props.style.grey, borderColor: this.props.style.lightBlack }}>
                    <CardItem style={{ backgroundColor: this.props.style.grey }}>
                        <Left>
                            <Body>
                                <Text numberOfLines={1} style={{ color: this.props.style.darkWhite }} note>
                                    Total Music Files Loaded: {this.props.songs.songList.length}
                                </Text>
                                <Text numberOfLines={1} style={{ color: this.props.style.darkWhite }} note>
                                    Total Music Files Duration: {formatTimeBySeconds(this.props.songs.fullLength)}
                                </Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
            </Content>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        style: state.StyleReducer,
        settings: state.SettingsReducer,
        songs: state.SongsReducer,
        player: state.PlayerReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppPlayer);