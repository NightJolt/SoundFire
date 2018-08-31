import React, { Component } from 'react';
import { Slider, AsyncStorage } from 'react-native';
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
    Accordion,
    Input,
    Content
} from 'native-base';

import { toggleAutoClosingDrawer, toggleCrazyMode } from '../Actions/SettingsActions';
import { syncDevice } from '../Actions/SongsActions';
import { setLoadState } from '../Actions/SongsActions';
import { setMainColor } from '../Actions/StyleActions';
import { formatRGBA } from '../Functions';

class AppSettings extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            color_r: 0,
            color_g: 0,
            color_b: 0,
            color_a: 1
        }
    }
    render() {
        return (
            <Content padder>
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
                            <Button onPress={() => AsyncStorage.clear()} danger block>
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
                
                <Card style={{ backgroundColor: this.props.style.grey, borderColor: this.props.style.lightBlack, padding: 20, paddingTop: 8 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ color: 'white' }}>Main Color</Text>
                        </View>
                        <View style={{ flex: 3 }}>
                            <Input placeholder={this.props.style.mainColor[0] == '#' ? this.props.style.mainColor : '#rrggbb'} placeholderTextColor={this.props.style.lightGrey} style={{ color: this.props.style.mainColor }} onChangeText={(text) => {
                                    let rrggbb = /^#[0-9A-F]{6}$/i.test(text);
                                    if (rrggbb)
                                    this.props.setMainColor(text);
                                }} />
                        </View>
                    </View>
                    <Text note>Supported Formats: #rrggbb. ex: #32cd32</Text>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                <Text style={{ color: formatRGBA(this.state.color_r, 0, 0, this.state.color_a), marginRight: 5, fontSize: 20 }}>R</Text>
                            </View>
                            <View style={{ justifyContent: 'center', flex: 10 }}>
                                <Slider minimumValue={0} maximumValue={255} minimumTrackTintColor={formatRGBA(this.state.color_r, 0, 0, this.state.color_a)} thumbTintColor={formatRGBA(this.state.color_r, 0, 0, this.state.color_a)} onValueChange={(value) => {this.setState({color_r: value}); this.props.setMainColor(formatRGBA(value, this.state.color_g, this.state.color_b, this.state.color_a))}} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                <Text style={{ color: formatRGBA(0, this.state.color_g, 0, this.state.color_a), marginRight: 5, fontSize: 20 }}>G</Text>
                            </View>
                            <View style={{ justifyContent: 'center', flex: 10 }}>
                                <Slider minimumValue={0} maximumValue={255} minimumTrackTintColor={formatRGBA(0, this.state.color_g, 0, this.state.color_a)} thumbTintColor={formatRGBA(0, this.state.color_g, 0, this.state.color_a)} onValueChange={(value) => {this.setState({color_g: value}); this.props.setMainColor(formatRGBA(this.state.color_r, value, this.state.color_b, this.state.color_a))}} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                <Text style={{ color: formatRGBA(0, 0, this.state.color_b, this.state.color_a), marginRight: 5, fontSize: 20 }}>B</Text>
                            </View>
                            <View style={{ justifyContent: 'center', flex: 10 }}>
                                <Slider minimumValue={0} maximumValue={255} minimumTrackTintColor={formatRGBA(0, 0, this.state.color_b, this.state.color_a)} thumbTintColor={formatRGBA(0, 0, this.state.color_b, this.state.color_a)} onValueChange={(value) => {this.setState({color_b: value}); this.props.setMainColor(formatRGBA(this.state.color_r, this.state.color_g, value, this.state.color_a))}} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                <Text style={{ color: formatRGBA(this.state.color_r, this.state.color_g, this.state.color_b, this.state.color_a), marginRight: 5, fontSize: 20 }}>A</Text>
                            </View>
                            <View style={{ justifyContent: 'center', flex: 10 }}>
                                <Slider minimumValue={0} maximumValue={1} minimumTrackTintColor={formatRGBA(this.state.color_r, this.state.color_g, this.state.color_b, this.state.color_a)} thumbTintColor={formatRGBA(this.state.color_r, this.state.color_g, this.state.color_b, this.state.color_a)} onValueChange={(value) => {this.setState({color_a: value}); this.props.setMainColor(formatRGBA(this.state.color_r, this.state.color_g, this.state.color_b, value))}} />
                            </View>
                        </View>
                    </View>
                </Card>
            </Content>
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
        },
        setMainColor: (value) => {
            dispatch(setMainColor(value))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppSettings);