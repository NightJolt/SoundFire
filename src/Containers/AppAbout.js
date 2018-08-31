import React, { Component } from 'react';
import { StyleSheet, Clipboard, Image } from 'react-native';
import { connect } from 'react-redux';
import {
    Content,
    Card,
    CardItem,
    Text,
    View,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Toast
} from 'native-base';

class AppAbout extends React.Component {
    constructor(props) {
        super(props);
        
        this.style = StyleSheet.create({
            listHeader: {
                fontSize: 22,
                marginBottom: 5,
                color: this.props.style.mainColor
            },
            listItem: {
                fontSize: 18,
                marginLeft: 20,
                marginBottom: 1,
                marginTop: 10,
                color: 'white'
            },
            listNote: {
                fontSize: 12,
                marginLeft: 30
            }
        })
    }
    
    render() {
        return (
            <Content padder>
                <Card style={{ backgroundColor: this.props.style.grey, borderColor: this.props.style.lightBlack }}>
                    <View style={{ padding: 20 }}>
                        <Text style={this.style.listHeader}>Version 0.0.1(beta) Update Log:</Text>
                        
                        <View style={{ borderTopWidth: 1, borderColor: 'rgba(120, 120, 120, 0.3)', marginVertical: 5 }} />
                        
                        <Text style={this.style.listItem}>Added music player</Text>
                        <Text style={this.style.listNote} note>- Still expected bugs</Text>
                        <Text style={this.style.listNote} note>- Performance for now is a little poor</Text>
                        
                        <Text style={this.style.listItem}>Added player options for shuffle, repeat and seek</Text>
                        <Text style={this.style.listNote} note>- For now favourite button does not works</Text>
                        
                        <Text style={this.style.listItem}>Added ability to add lyrics</Text>
                        <Text style={this.style.listNote} note>- Using same titles for multipe music files(even in case of inserting spaces) will cause lyrics corruption</Text>
                        <Text style={this.style.listNote} note>- Renaming music files will cause loosing lyrics(renaming back will fix that)</Text>
                        <Text style={this.style.listNote} note>- All those bugs are going to be fixed any soon</Text>
                        
                        <Text style={this.style.listItem}>Added ability to change theme color</Text>
                        <Text style={this.style.listNote} note>- Supports both hex(#rrggbb) and rgba() formats</Text>
                        
                        <Text style={this.style.listItem}>Added CRAZY mode(temporally disabled)</Text>
                        <Text style={this.style.listNote} note>- Option enables ability to play multiple music files at once</Text>
                        
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
                            <Text style={{ color: 'white', fontSize: 16 }}>Note</Text>
                            <View style={{ borderTopWidth: 1, borderColor: 'rgba(120, 120, 120, 0.3)', marginLeft: 20, flex: 1 }} />
                        </View>
                        
                        <Text style={this.style.listNote} note>- Some settings are not saved at this time</Text>
                        <Text style={this.style.listNote} note>- App loading time will be greatly reduced in the future</Text>
                        <Text style={this.style.listNote} note>- App size will be decreazed in the future</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(AppAbout);