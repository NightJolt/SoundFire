import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Body,
    Right,
    Title,
    Button,
    Icon,
    View
} from 'native-base';

import { toggleSearchBar } from '../Actions/SearchActions';

class BtnGroup extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Body>
                    <Title>{this.props.header.pageTitle}</Title>
                </Body>
                <Right>
                    {this.props.header.searchBtn ? (
                        <Button onPress={() => this.props.toggleSearchBar(true)} transparent>
                            <Icon name='search' />
                        </Button>
                    ) : (
                        <View>
                            
                        </View>
                    )}
                </Right>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        header: state.HeaderReducer,
        header: state.HeaderReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleSearchBar: (value) => {
            dispatch(toggleSearchBar(value))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BtnGroup);