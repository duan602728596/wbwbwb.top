import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Title extends Component{
  static propTypes: Object = {
    children: PropTypes.string
  };

  componentDidMount(): void{
    document.title = this.props.children;
  }
  render(): null{
    return null;
  }
}

export default Title;