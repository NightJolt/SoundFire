import React, { Component } from 'react';
import { StyleSheet, Clipboard, Linking, TextInput } from 'react-native';
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
    Toast,
    Input
} from 'native-base';

import axios from 'axios';

class AppHelp extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            subject: '',
            content: '',
            code: '',
            statusMessage: '',
            statusCode: 0
        }
    }
    
    copyToClipboard = async (text) => {
        await Clipboard.setString(text);
    }
    
    sendFeedback = () => {
        let data = new FormData();
        data.append('EMAIL', global.CONTACT_EMAIL);
        data.append('SUBJECT', this.state.subject);
        data.append('CODE', this.state.code);
        data.append('CONTENT', this.state.content);
        axios.post('http://fireflyservices.000webhostapp.com/soundfire/feedback.php', data).then((res) => {
            console.log(res);
            this.setState({
                statusMessage: res.data.statusMessage,
                statusCode: parseInt(res.data.statusCode)
            })
        }).catch((err) => {x
            console.log(err);
            this.setState({
                statusMessage: 'Connection Error',
                statusCode: 0
            })
        })
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
                
                <Card style={{ backgroundColor: this.props.style.grey, borderColor: this.props.style.lightBlack }}>
                    <View style={{ padding: 20 }}>
                        <Text style={{ fontSize: 18, color: 'white', marginBottom: 10 }}>Send Feedback (Invite code only)</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: this.props.style.lightGrey, marginRight: 10 }}>Email</Text>
                            <Input style={{ flex: 1, color: this.props.style.mainColor }} value={global.CONTACT_EMAIL}  disabled />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: this.props.style.lightGrey, marginRight: 10 }}>Subject</Text>
                            <Input style={{ flex: 1, color: this.props.style.darkWhite }} onChangeText={(subject) => this.setState({subject})} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: this.props.style.lightGrey, marginRight: 10 }}>Invitational Code</Text>
                            <Input style={{ flex: 1, color: this.props.style.darkWhite }} onChangeText={(code) => this.setState({code})} />
                        </View>
                        <TextInput multiline={true} numberOfLines={1} edible={true} autoCorrect={false} style={{ width: '100%', color: this.props.style.darkWhite, fontSize: 15 }} onChangeText={(content) => this.setState({content})} />
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ flex: 5, fontSize: 14, color: this.state.statusCode == 0 ? 'red' : 'green'  }}>{this.state.statusMessage}</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Button style={{ backgroundColor: this.props.style.mainColor }} onPress={() => this.sendFeedback()} small>
                                    <Icon name="ios-mail" />
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