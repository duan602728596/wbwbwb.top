import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import publicStyle from '../../../components/publicStyle/publicStyle.sass';
import bootstrap from '../../../components/publicStyle/bootstrap.sass';

class SuperTopicSignIn extends Component{
  render(): React.Element{
    return (
      <div className={ publicStyle.main }>
        <nav aria-label="breadcrumb">
          <ol className={ bootstrap.breadcrumb }>
            <li className={ bootstrap['breadcrumb-item'] }>
              <Link to="/Index">微博自动签到系统</Link>
            </li>
            <li className={ classNames(bootstrap['breadcrumb-item'], bootstrap.active) } aria-current="page">超级话题签到</li>
          </ol>
        </nav>
      </div>
    );
  }
}

export default SuperTopicSignIn;