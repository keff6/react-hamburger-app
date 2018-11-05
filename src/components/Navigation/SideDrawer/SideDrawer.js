import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Wrapper  from '../../../hoc/Wrapper/Wrapper';

const sideDrawer = props => {
  let attachedClasses = [
    classes.SideDrawer,
    classes.Close
  ];

  if (props.show) {
    attachedClasses = [
      classes.SideDrawer,
      classes.Open
    ];
  }

  return (
    <Wrapper>
      <Backdrop show={props.show} clicked={props.closed} />
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Wrapper>
  )
}

export default sideDrawer;