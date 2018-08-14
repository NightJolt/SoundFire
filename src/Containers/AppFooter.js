import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {
    Footer,
    FooterTab,
    View,
    Text,
    Button,
    Icon
} from 'native-base';

import { playPlayer, pausePlayer, setSongId, prepareAtPath, setProgress } from '../Actions/PlayerActions';

import { setPage } from '../Actions/ContentActions';

import { toPercent } from '../Functions';

const styles = StyleSheet.create ({
    footertab: {
        display: 'flex',
        flexDirection: 'column'
    },
    controls: {
        display: 'flex',
        flexDirection: 'row',
        height: '95%'
    },
    title: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    titletext: {
        color: 'white',
        fontWeight: 'bold'
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        paddingHorizontal: 8
    },
    button: {
        height: '100%'
    }
});

class AppFooter extends React.Component {
    componentDidMount() {
        this.props.prepareAtPath({id: 0, path: this.props.songs.songList[0].path});
        
        this.interval = setInterval(() => {
            if (Math.trunc(this.props.player.player.currentTime / 1000) == Math.trunc(this.props.player.player.duration / 1000) - 1) {
                setTimeout(() => {
                    if (this.props.player.repeat) {
                        this.props.setSongId({id: this.props.player.currentSongId, path: this.props.songs.songList[this.props.player.currentSongId].path})
                    } else if (this.props.player.shuffle) {
                        let random = Math.floor(Math.random() * this.props.songs.songList.length + 1);
                        this.props.setSongId({id: random, path: this.props.songs.songList[random].path})
                    } else {
                        this.playNext();
                    }
                }, 1000);
            } else if (this.props.player.player.currentTime >= 0 || this.props.player.player.duration > 0) {
                this.props.setProgress(this.props.player.player.currentTime);
            } else {
                this.props.setProgress(0);
            }
        }, 1000)
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    
    playNext = () => {
        let id = this.props.player.currentSongId;
        id++;
        if (id > this.props.songs.songList.length - 1) {
            id = 0;
        }
        this.props.setSongId({id: id, path: this.props.songs.songList[id].path});
    }
    
    playPrevious = () => {
        let id = this.props.player.currentSongId;
        id--;
        if (id < 0) {
            id = this.props.songs.songList.length - 1;
        }
        this.props.setSongId({id: id, path: this.props.songs.songList[id].path});
    }
    
    render() {
        return (
            <Footer>
                <FooterTab style={[styles.footertab, {backgroundColor: this.props.style.darkGrey}]}>
                    <View style={{backgroundColor: this.props.style.grey, height: '5%'}}>
                        <View style={{backgroundColor: this.props.style.mainColor, width: toPercent(this.props.player.progress, this.props.player.player.duration), height: '100%'}} />
                    </View>
                    <View style={styles.controls}>
                        <TouchableOpacity style={styles.title} onPress={() => {this.props.setPage(0)}}>
                            <Text numberOfLines={1} style={styles.titletext}>
                                {this.props.songs.songList[this.props.player.currentSongId].title}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.box}>
                            <Button style={styles.button} onPress={() => this.playPrevious()} transparent>
                                <Icon name='skip-backward' style={[styles.icon, {color: 'white'}]} />
                            </Button>
                        </View>
                        <View style={[styles.box, {backgroundColor: this.props.style.grey}]}>
                            { this.props.player.isPlaying ? (
                                <Button style={styles.button} onPress={() => this.props.pausePlayer()} transparent>
                                    <Icon name='pause' style={[styles.icon, {color: this.props.style.mainColor}]} />
                                </Button>
                            ) : (
                                <Button style={styles.button} onPress={() => this.props.playPlayer()} transparent>
                                    <Icon name='play' style={[styles.icon, {color: this.props.style.mainColor}]} />
                                </Button>
                            )}
                        </View>
                        <View style={styles.box}>
                            <Button style={styles.button} onPress={() => this.playNext()} transparent>
                                <Icon name='skip-forward' style={[styles.icon, {color: 'white'}]} />
                            </Button>
                        </View>
                    </View>
                </FooterTab>
            </Footer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        style: state.StyleReducer,
        search: state.SearchReducer,
        player: state.PlayerReducer,
        songs: state.SongsReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setProgress: (value) => {
            dispatch(setProgress(value));
        },
        prepareAtPath: (value) => {
            dispatch(prepareAtPath(value));
        },
        playPlayer: () => {
            dispatch(playPlayer());
        },
        pausePlayer: () => {
            dispatch(pausePlayer());
        },
        setSongId: (value) => {
            dispatch(setSongId(value));
        },
        setPage: (value) => {
            dispatch(setPage(value));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppFooter);