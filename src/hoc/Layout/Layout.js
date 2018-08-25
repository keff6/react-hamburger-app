import React, { Component } from 'react';
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
          />
          <SideDrawer
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

export default Layout;