/* message */
import React from 'react';
import classNames from 'classnames';
import Notification from 'rc-notification';
import bootstrap from '../publicStyle/bootstrap.sass';
import style from './style.sass';

function message(type: string, text: string): void{
  let div: Element = document.createElement('div');
  document.body.appendChild(div);

  Notification.newInstance({
    style: {
      position: 'absolute',
      top: '70px',
      left: 0,
      right: 0,
      textAlign: 'center'
    },
    getContainer: (): Element => div
  }, (notification: Object): void=> {
    notification.notice({
      content: <div className={ classNames(bootstrap.alert, bootstrap[`alert-${ type }`], style.message) } role="alert">{ text }</div>,
      onClose: (): void=>{
        document.body.removeChild(div);
        div = null;
      }
    });
  });

}

export default message;