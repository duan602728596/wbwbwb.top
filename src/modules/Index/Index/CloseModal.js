import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import bootstrap from '../../../components/publicStyle/bootstrap.sass';
import style from './style.sass';

class CloseModal extends Component{
  static propTypes: Object = {
    onOk: PropTypes.func,
    onCancel: PropTypes.func
  };

  render(): React.Element{
    return (
      <div className={ classNames(bootstrap.modal, style.modal) } role="dialog">
        <div className={ bootstrap['modal-dialog'] } role="document">
          <div className={ bootstrap['modal-content'] }>
            <div className={ bootstrap['modal-header'] }>
              <h5 className={ bootstrap['modal-title'] }>提示</h5>
              <button className={ bootstrap.close }
                type="button"
                data-dismiss="modal"
                aria-label="关闭"
                onClick={ this.props.onCancel }
              >
                &times;
              </button>
            </div>
            <div className={ bootstrap['modal-body'] }>
              <p>是否退出当前账号？</p>
            </div>
            <div className={ bootstrap['modal-footer'] }>
              <button className={ classNames(bootstrap.btn, bootstrap['btn-danger']) }
                type="button"
                onClick={ this.props.onOk }
              >
                确定
              </button>
              <button className={ classNames(bootstrap.btn, bootstrap['btn-secondary']) }
                type="button"
                data-dismiss="modal"
                onClick={ this.props.onCancel }
              >
                取消
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CloseModal;