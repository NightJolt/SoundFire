import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Root,
    Drawer,
    Container,
    Footer
} from 'native-base';

import SideBar from './SideBar';
import AppHeader from './AppHeader';
import AppContent from './AppContent';
import AppFooter from './AppFooter';

import { getListFromDevice, setLoadState } from '../Actions/SongsActions';

class App extends Component {
    componentDidMount() {
        this.props.getListFromDevice();
    }
    
    closeDrawer = () => {
      this.drawer._root.close()
    };

    openDrawer = () => {
      this.drawer._root.open()
    };

    render() {
        return (
            <Drawer ref={(ref) => { this.drawer = ref; }} content={<SideBar navigator={this.navigator} closeDrawer={() => this.closeDrawer()} />} onClose={() => this.closeDrawer()} >
                <Root>
                    <Container style={{ backgroundColor: this.props.style.darkGrey }}>
                        <AppHeader openDrawer={() => this.openDrawer()} />

                        <AppContent />

                        {
                            this.props.songs.loaded &&
                                <AppFooter />
                        }
                    </Container>
                </Root>
            </Drawer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        style: state.StyleReducer,
        songs: state.SongsReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getListFromDevice: (name) => {
            dispatch(getListFromDevice(name));
        },
        setLoadState: (value) => {
            dispatch(setLoadState(value))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);