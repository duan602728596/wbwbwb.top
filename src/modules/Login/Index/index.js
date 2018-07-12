import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createForm } from 'rc-form';
import QueueAnim from 'rc-queue-anim';
import { css } from '../../../utilities';
import publicStyle from '../../../components/publicStyle/publicStyle.sass';
import bootstrap from '../../../components/publicStyle/bootstrap.sass';
import style from './style.sass';
import createInputDecorator from './createInputDecorator';

@createForm()
class Index extends Component{
  static propTypes: Object = {
    form: PropTypes.object
  };

  // 提交方法
  handleFormSubmit: Function = (event: Event): void=>{
    event.preventDefault();
    this.props.form.validateFields((err: ?Object, value: Object): void=>{
      if(err) return void 0;
    });
  };
  render(): React.Element{
    const { getFieldProps }: { getFieldProps: Function } = this.props.form;

    return (
      <div className={ publicStyle.main }>
        {/* 登陆表单 */}
        <form className={ style.form } onSubmit={ this.handleFormSubmit }>
          <div className={ css(bootstrap['form-group'], style.group) }>
            <label htmlFor="username">用户名：</label>
            {
              createInputDecorator(this.props, 'username', {
                rules: [
                  {
                    required: true,
                    message: '请输入用户名！',
                    whitespace: true
                  }
                ]
              })(<input className={ bootstrap['form-control'] } id="username" type="text" />)
            }
          </div>
          <div className={ css(bootstrap['form-group'], style.group) }>
            <label htmlFor="password">密码：</label>
            {
              createInputDecorator(this.props, 'password', {
                rules: [
                  {
                    required: true,
                    message: '请输入密码！'
                  }
                ]
              })(<input className={ bootstrap['form-control'] } id="password" type="password" />)
            }
          </div>
          <div className={ css(bootstrap['form-check'], style.checkGroup) }>
            <input className={ bootstrap['form-check-input'] }
              id="remember-password"
              type="checkbox"
              { ...getFieldProps('remember-password') }
            />
            <label className={ bootstrap['form-check-label'] } htmlFor="remember-password">记住密码</label>
          </div>
          <button className={ css(bootstrap['btn'], bootstrap['btn-block'], bootstrap['btn-primary']) } type="submit">登陆</button>
        </form>
      </div>
    );
  }
}

export default Index;