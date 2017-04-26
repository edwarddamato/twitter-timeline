import * as React from 'react';
import './Header.scss';

export class Header extends React.Component<undefined, undefined> {
  render () {
    return (
      <header className="header">
        <h1 className="header_title">Twitter Search</h1>
      </header>
    );
  }
}

export default Header;
