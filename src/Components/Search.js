import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {
    Item,
    Input,
    Icon
} from 'native-base';

import { toggleSearchBar } from '../Actions/SearchActions';

class Search extends React.Component {
    render() {
        return (
            <Item style={{backgroundColor: this.props.style.mainColor}}>
                <Input placeholder="Search" placeholderTextColor="white" style={{color: 'white'}} />
                <TouchableOpacity onPress={() => this.props.toggleSearchBar(false)}>
                    <Icon name="close" style={{color: 'white'}} />
                </TouchableOpacity>
            </Item>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        style: state.StyleReducer,
        search: state.SearchReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleSearchBar: (value) => {
            dispatch(toggleSearchBar(value))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);