import React, { Component } from 'react';
import { Slider } from 'react-native';
import { connect } from 'react-redux';
import {
    View,
    Card,
    CardItem,
    Body,
    Right,
    Button,
    Text,
    Switch,
    Accordion
} from 'native-base';

import { toggleAutoClosingDrawer, toggleCrazyMode } from '../Actions/SettingsActions';
import { wipeData, syncDevice } from '../Actions/SongsActions';
import { setLoadState } from '../Actions/SongsActions';

class AppSettings extends React.Component {
    render() {
        return (
            <View>
                <Card style={{ backgroundColor: this.props.style.grey, borderColor: this.props.style.lightBlack }}>
                    <CardItem style={{ backgroundColor: this.props.style.grey }}>
                        <Body>
                            <Button onPress={() => {this.props.syncDevice(), this.props.setLoadState(false)}} style={{backgroundColor: this.props.style.wtfGrey}} block>
                                <Text>Refresh Content</Text>
                            </Button>
                        </Body>
                    </CardItem>
                    <CardItem style={{ backgroundColor: this.props.style.grey }}>
                        <Body>
                            <Text style={{ color: 'white', fontSize: 14 }}>* Use this button to sync the device. Recommended to be used after update</Text>
                        </Body>
                    </CardItem>
                </Card>
                
                <Card style={{ backgroundColor: this.props.style.grey, borderColor: this.props.style.lightBlack }}>
                    <CardItem style={{ backgroundColor: this.props.style.grey }}>
                        <Body>
                            <Button onPress={() => this.props.wipeData()} danger block>
                                <Text>Wipe Data</Text>
                            </Button>
                        </Body>
                    </CardItem>
                    <CardItem style={{ backgroundColor: this.props.style.grey }}>
                        <Body>
                            <Text style={{ color: 'red', fontSize: 14 }}>* Using this button will delete all saved data</Text>
                        </Body>
                    </CardItem>
                </Card>
                
                <Card style={{ backgroundColor: this.props.style.grey, borderColor: this.props.style.lightBlack }}>
                    <CardItem style={{ backgroundColor: this.props.style.grey }}>
                        <Body>
                            <Text style={{ color: 'white', fontSize: 14 }}>Self closing sidebar</Text>
                        </Body>
                        <Right>
                            <Switch value={this.props.settings.autoClosingDrawer} onValueChange={() => this.props.toggleAutoClosingDrawer()} />
                        </Right>
                    </CardItem>
                    <CardItem style={{ backgroundColor: this.props.style.grey }}>
                        <Body>
                            <Text style={{ color: 'red', fontSize: 14 }}>CRAZY MODE(temporally disabled)</Text>
                        </Body>
                        <Right>
                            <Switch value={this.props.settings.crazyMode} onValueChange={() => this.props.toggleCrazyMode()} />
                        </Right>
                    </CardItem>
                </Card>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        style: state.StyleReducer,
        settings: state.SettingsReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        wipeData: () => {
            dispatch(wipeData())
        },
        syncDevice: () => {
            dispatch(syncDevice())
        },
        toggleAutoClosingDrawer: () => {
            dispatch(toggleAutoClosingDrawer());
        },
        toggleCrazyMode: () => {
            dispatch(toggleCrazyMode());
        },
        setLoadState: (value) => {
            dispatch(setLoadState(value))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppSettings);