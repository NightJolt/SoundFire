import React, { Component } from 'react';
import { Image, Slider, TextInput, AsyncStorage } from 'react-native';
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

import { setPlayerItem } from '../Actions/PlayerActions';

import { formatTimeBySeconds, toPercent } from '../Functions';

class AppPlayer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            lyricsEdible: false,
            lyrics: '',
            progressEdible: false,
            heart: false
        }
        
        this.getLyrics();
        setPlayerItem({name: 'repeat', value: true});
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.player.currentSongId != this.props.player.currentSongId) {
            this.getLyrics();
        }
    }
    
    setLyrics = async () => {
        try {
            let key = '@Lyrics:' + this.props.songs.songList[this.props.player.currentSongId].title.replace(' ', '');
            await AsyncStorage.setItem(key, this.state.lyrics);
        } catch (error) {
            alert(error);
        }
    }
    
    getLyrics = async (name) => {
        try {
            let key = '@Lyrics:' + this.props.songs.songList[this.props.player.currentSongId].title.replace(' ', '');
            let result = await AsyncStorage.getItem(key, (error, result) => {
                if (result != null)
                    this.setState({lyrics: result});
                else
                    this.setState({lyrics: ''});
            });
        } catch (error) {
            alert(error);
        }
    }
    
    render() {
        return (
            <Content padder>
                <Card style={{ backgroundColor: this.props.style.grey, borderColor: this.props.style.lightBlack }}>
                    <CardItem style={{ backgroundColor: this.props.style.grey }}>
                      <Left>
                        <Thumbnail source={require('../Images/default_cover.png')} />
                        <Body>
                          <Text numberOfLines={2} style={{ color: this.props.style.darkWhite }}>{this.props.songs.songList[this.props.player.currentSongId].title}</Text>
                          <Text numberOfLines={1} note>{this.props.songs.songList[this.props.player.currentSongId].author}</Text>
                        </Body>
                      </Left>
                    </CardItem>
                </Card>
                <Card style={{ backgroundColor: this.props.style.grey, borderColor: this.props.style.lightBlack }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginVertical: 5 }}>
                        <Icon style={{ color: this.props.player.repeat ? this.props.style.purple : this.props.style.darkWhite }} name="md-repeat" onPress={() => {this.props.setPlayerItem({name: 'repeat', value: !this.props.player.repeat})}} />
                        <Icon style={{ color: this.props.player.shuffle ? this.props.style.aqua : this.props.style.darkWhite }} name="md-shuffle" onPress={() => {this.props.setPlayerItem({name: 'shuffle', value: !this.props.player.shuffle})}} />
                        <Icon style={{ color: this.state.heart ? this.props.style.red : this.props.style.darkWhite }} name="md-heart" onPress={() => {this.setState({heart: !this.state.heart})}} />
                    </View>
                </Card>
                <Card style={{ backgroundColor: this.props.style.grey, borderColor: this.props.style.lightBlack }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5 }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: this.props.style.darkWhite }}>{formatTimeBySeconds(Math.ceil(this.props.player.progress / 1000))}</Text>
                        </View>
                        <View style={{ width: '74%', justifyContent: 'center' }}>
                            <Slider minimumValue={0} maximumValue={this.props.player.player.duration} value={!this.state.progressEdible ? this.props.player.progress : 0} minimumTrackTintColor={this.props.style.mainColor} thumbTintColor={this.props.style.mainColor} onValueChange={() => {this.setState({progressEdible: true})}} onSlidingComplete={(value) => {this.setState({progressEdible: false}); this.props.player.player.seek(value)}} />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: this.props.style.darkWhite }}>{this.props.songs.songList[this.props.player.currentSongId].time}</Text>
                        </View>
                    </View>
                </Card>
                <Card style={{ backgroundColor: this.props.style.grey, borderColor: this.props.style.lightBlack }}>
                    <CardItem style={{ backgroundColor: this.props.style.grey }}>
                        <Left>
                            <Text style={{ color: this.props.style.darkWhite, fontSize: 16 }}>Lyrics</Text>
                        </Left>
                        <Right>
                            {
                                this.state.lyricsEdible ? (
                                    <Button onPress={() => {this.setState({lyricsEdible: false}); this.setLyrics()}} style={{ backgroundColor: this.props.style.mainColor }} rounded small><Text>Save</Text></Button>
                                ) : (
                                    <Button onPress={() => {this.setState({lyricsEdible: true})}} style={{ backgroundColor: this.props.style.mainColor }} rounded small><Text>Edit</Text></Button>
                                )
                            }
                        </Right>
                    </CardItem>
                    <CardItem style={{ backgroundColor: this.props.style.grey }}>
                        {
                            this.state.lyricsEdible ? (
                                <TextInput multiline={true} numberOfLines={1} edible={true} autoCorrect={false} underlineColorAndroid='transparent' style={{ width: '100%', color: this.props.style.darkWhite, fontSize: 15 }} textAlign={'center'} value={this.state.lyrics} onChangeText={(text) => this.setState({lyrics: text})} />
                            ) : (
                                <Text style={{ width: '100%', color: this.props.style.darkWhite, fontSize: 15, textAlign: 'center' }}>
                                    {this.state.lyrics}
                                </Text>
                            )
                        }
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
        setPlayerItem: (value) => {
            dispatch(setPlayerItem(value))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppPlayer);