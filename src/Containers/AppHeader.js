import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Header,
    Left,
    Button,
    Icon
} from 'native-base';

import BtnGroup from '../Components/BtnGroup';
import Search from '../Components/Search';

class AppHeader extends React.Component {
    render() {
        return (
            <Header style={{ backgroundColor: this.props.style.mainColor }} androidStatusBarColor={this.props.style.darkGrey} searchBar>
                <Left>
                    <Button onPress={() => this.props.openDrawer()} transparent>
                        <Icon name='menu' />
                    </Button>
                </Left>
                {
                    this.props.search.isSearching ? (
                        <Search />
                    ) : (
                        <BtnGroup />
                    )}
            </Header>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);