import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { connect } from 'react-redux';
import {
    View,
    Thumbnail,
    H3,
    Text,
    List,
    ListItem,
    Left,
    Body,
    Icon
} from "native-base";

import { setPage } from '../Actions/ContentActions';
import { setTitle } from '../Actions/HeaderActions';

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 120,
        alignItems: "center",
        flexDirection: "row"
    }
});

class SideBar extends React.Component {
    constructor(props) {
        super(props);

        this.renderData = [
            {
                press: () => {this.props.setPage(0); this.props.setTitle('Playing Now')},
                icon: 'ios-musical-notes',
                iconColor: this.props.style.aqua,
                text: 'Playing now',
                textColor: this.props.style.darkWhite,
                hasDivider: false
            },
            {
                press: () => {this.props.setPage(1); this.props.setTitle('Playlist')},
                icon: 'md-list',
                iconColor: this.props.style.purple,
                text: 'Playlist',
                textColor: this.props.style.darkWhite,
                hasDivider: false
            },
            {
                press: () => {this.props.setPage(2); this.props.setTitle('Songs')},
                icon: 'md-headset',
                iconColor: this.props.style.yellow,
                text: 'Songs',
                textColor: this.props.style.darkWhite,
                hasDivider: false
            },
            {
                press: () => {this.props.setPage(3); this.props.setTitle('Favourites')},
                icon: 'md-heart',
                iconColor: this.props.style.red,
                text: 'Favourites',
                textColor: this.props.style.darkWhite,
                hasDivider: true
            },
            {
                press: () => {this.props.setPage(4); this.props.setTitle('Settings')},
                icon: 'ios-settings',
                iconColor: this.props.style.lime,
                text: 'Settings',
                textColor: this.props.style.darkWhite,
                hasDivider: false
            },
            {
                press: () => {this.props.setPage(5); this.props.setTitle('Help')},
                icon: 'ios-help-circle-outline',
                iconColor: this.props.style.orange,
                text: 'Help',
                textColor: this.props.style.darkWhite,
                hasDivider: false
            },
            {
                press: () => {this.props.setPage(6); this.props.setTitle('About')},
                icon: 'ios-information-circle',
                iconColor: this.props.style.blue,
                text: 'About',
                textColor: this.props.style.darkWhite,
                hasDivider: false
            },
        ]
    }

    render() {
        return (
            <ScrollView style={{backgroundColor: this.props.style.darkGrey, height: '100%'}}>
                <View style={[styles.header, {backgroundColor: this.props.style.lightBlack}]}>
                    <View style={{flex: 2, flexDirection:"row", justifyContent:"center"}}>
                        <Thumbnail source={global.APP_LOGO} />
                    </View>
                    <View style={{flex: 4}}>
                        <H3 style={{color: 'rgb(255, 122, 0)'}}>{global.APP_NAME}</H3>
                        <Text note>Version {global.APP_VERSION}</Text>
                    </View>
                </View>
                <View>
                    <List dataArray={this.renderData} renderRow={(item) =>
                        <React.Fragment>
                            <ListItem last icon onPress={() => {item.press(); if(this.props.settings.autoClosingDrawer) this.props.closeDrawer()}} style={{height: 60}}>
                                <Left>
                                    <Icon style={{color: item.iconColor}} name={item.icon} />
                                </Left>
                                <Body>
                                    <Text style={{color: item.textColor}}>{item.text}</Text>
                                </Body>
                            </ListItem>
                            {
                                item.hasDivider &&
                                    <View style={{height: 1, backgroundColor: this.props.style.lightGrey}}>
                                    </View>
                            }
                        </React.Fragment>
                    }>  
                    </List>
                </View>
            </ScrollView>
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
        setPage: (value) => {
            dispatch(setPage(value));
        },
        setTitle: (value) => {
            dispatch(setTitle(value));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);