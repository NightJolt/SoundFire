import React, { Component } from 'react';
import { StyleSheet, Clipboard, Linking } from 'react-native';
import { connect } from 'react-redux';
import {
    Content,
    Card,
    CardItem,
    Text,
    View,
    Body,
    Button,
    Icon,
    Toast
} from 'native-base';

class AppHelp extends React.Component {
    
    copyToClipboard = async (text) => {
        await Clipboard.setString(text);
    }
    
    render() {
        return (
            <Content padder>
                <Card style={{ backgroundColor: this.props.style.grey, borderColor: this.props.style.lightBlack }}>
                    <View style={{ padding: 20 }}>
                        <Text style={{ fontSize: 18, color: 'white', marginBottom: 10 }}>Have an idea or a question? Contact here</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ flex: 5, fontSize: 16, color: this.props.style.lightGrey }}>{global.CONTACT_EMAIL}</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Button onPress={() => {this.copyToClipboard(global.CONTACT_EMAIL); Toast.show({text: 'Email Copied', duration: 3000})}} transparent small danger>
                                    <Icon name="ios-clipboard" style={{ color: this.props.style.mainColor }} />
                                </Button>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ flex: 5, fontSize: 16, color: this.props.style.lightGrey }}>{global.CONTACT_FACEBOOK}</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Button onPress={() => {Linking.openURL(global.CONTACT_FACEBOOK); Toast.show({text: 'Visiting Page', duration: 3000})}} transparent small danger>
                                    <Icon name="logo-facebook" style={{ color: 'rgb(59, 89, 152)' }} />
                                </Button>
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
        style: state.StyleReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHelp);