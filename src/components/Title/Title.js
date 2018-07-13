import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Title extends Component{
  static propTypes: Object = {
    children: PropTypes.string
  };

  componentDidMount(): void{
    const children: ?string = this?.props?.children || null;
    if(children !== null){
      document.title = this?.props?.children;
    }
  }
  render(): null{
    return null;
  }
}

export default Title;