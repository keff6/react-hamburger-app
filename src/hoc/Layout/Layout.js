import React, { Component } from 'react';
import { connect } from 'react-redux';
import Wrapper from '../Wrapper/Wrapper';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: true
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false })
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer }
    });
  }

  render() {
    return (
      <Wrapper>
        <div>
          <Toolbar
            drawerToggleClicked={this.sideDrawerToggleHandler}
            isAuth={this.props.isAuthenticated}
          />
          <SideDrawer
            isAuth={this.props.isAuthenticated}
            show={this.state.showSideDrawer}
            closed={this.sideDrawerClosedHandler}
          />
        </div>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Wrapper>
    )
  }
} 

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);