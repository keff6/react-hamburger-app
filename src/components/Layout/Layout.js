import React from 'react';
import Wrapper from '../../hoc/Wrapper';

const layout = props => (
  <Wrapper>
    <div>
      Toolbar,
      Sidebar,
      Backdrop
    </div>
    <main>
      {props.children}
    </main>
  </Wrapper>
);

export default layout;