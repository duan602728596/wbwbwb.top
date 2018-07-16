import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { createForm } from 'rc-form';
import axios from 'axios';
import { jsonp, USER_INFORMATION } from '../../../utilities';
import publicStyle from '../../../components/publicStyle/publicStyle.sass';
import bootstrap from '../../../components/publicStyle/bootstrap.sass';
import style from './style.sass';
import createInputDecorator from './createInputDecorator';
import message from './message';
import Earth from './earth/Earth';
import config from '../../../components/config/config';

@withRouter
@createForm()
class Index extends Component{
  static propTypes: Object = {
    form: PropTypes.object,
    history: PropTypes.object
  };
  patternCallbackBind: ?Function = null;

  componentDidMount(): void{
    localStorage.removeItem(USER_INFORMATION);
    sessionStorage.removeItem(USER_INFORMATION);
  }
  // 登陆
  async login(formValue: Object, id: ?string): Promise<void>{
    try{
      const data: Object = {
        username: formValue.username,
        password: formValue.password
      };
      if(id) data.vid = id;
      const step4: Object = await axios({
        url: config.api['/sso/login'],
        method: 'POST',
        data
      });
      const step4Data: Object = step4.data;
      
      if(step4Data.retcode === 20000000){
        const storageData: string = JSON.stringify({
          username: formValue.username,
          cookie: step4Data._cookie,
          time: new Date().getTime()
        });
        if(formValue['remember-password']){
          localStorage.setItem(USER_INFORMATION, storageData);
        }else{
          sessionStorage.setItem(USER_INFORMATION, storageData);
        }
        this.props.history.push('/Index');
        message('success', '登陆成功！');
      }else{
        message('danger', `（${ step4Data.retcode }）${ step4Data.msg }`);
      }
    }catch(err){
      console.error(err);
      message('danger', '登陆失败！');
    }
  }
  // 验证完毕后的毁掉函数
  async patternCallback(formValue: Object, id: string, event: Event): Promise<void>{
    try{
      const data: Object = event.data;
      const username: string = encodeURIComponent(formValue.username);
      const pathEnc: string = encodeURIComponent(data.path_enc);
      const dataEnc: string = encodeURIComponent(data.data_enc);
      const uri: string = 'https://captcha.weibo.com/api/pattern/verify?ver=1.0.0&source=ssologin'
        + `&id=${ id }&usrname=${ username }&path_enc=${ pathEnc }&data_enc=${ dataEnc }`;
      const step3: Object = await jsonp(uri);
      
      if(step3.code === '100000'){
        this.login(formValue, id);
      }else{
        message('danger', `（${ step3.code }）${ step3.msg }`);
      }
    }catch(err){
      console.error(err);
      message('danger', '验证失败！');
    }
    document.removeEventListener('weibo-pattlock', this.patternCallbackBind);
    this.patternCallbackBind = null;
  }
  // 验证登陆是否需要验证码
  async prelogin(formValue: Object): Promise<void>{
    try{
      const ub64: string = btoa(formValue.username); // base64加密
      const step1: Object = await jsonp(`https://login.sina.com.cn/sso/prelogin.php?checkpin=1&entry=mweibo&su=${ ub64 }`);
      // 需要验证码
      if(('showpin' in step1 && step1.showpin === 1) || ('smsurl' in step1)){
        // 获取验证码
        const uri: string = 'https://captcha.weibo.com/api/pattern/get?'
          + `ver=1.0.0&source=ssologin&usrname=${ formValue.username }&line=160&side=100&radius=30&_rnd=${ Math.random() }`;
        const step2: Object = await jsonp(uri);
        this.patternCallbackBind = this.patternCallback.bind(this, formValue, step2.id);
        document.addEventListener('weibo-pattlock', this.patternCallbackBind, false);
        hint(step2.path_enc, step2.id);
      }else{
        // 直接登陆
        this.login(formValue);
      }
    }catch(err){
      console.error(err);
      message('danger', '获取验证失败！');
    }
  }
  // 提交方法
  handleFormSubmit: Function = (event: Event): void=>{
    event.preventDefault();
    this.props.form.validateFields((err: any, value: Object): void=>{
      if(err) return void 0;
      this.prelogin(value);
    });
  };
  render(): React.Element{
    const { getFieldProps }: { getFieldProps: Function } = this.props.form;
    return (
      <div className={ publicStyle.main }>
        {/* 登陆表单 */}
        <Earth />
        <form className={ style.form } onSubmit={ this.handleFormSubmit }>
          <div className={ classNames(bootstrap['form-group'], style.group) }>
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
          <div className={ classNames(bootstrap['form-group'], style.group) }>
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
          <div className={ classNames(bootstrap['form-check'], style.checkGroup) }>
            <input className={ bootstrap['form-check-input'] }
              id="remember-password"
              type="checkbox"
              { ...getFieldProps('remember-password') }
            />
            <label className={ bootstrap['form-check-label'] } htmlFor="remember-password">七天内免登陆</label>
          </div>
          <button className={ classNames(bootstrap['btn'], bootstrap['btn-block'], bootstrap['btn-primary']) } type="submit">登陆</button>
        </form>
      </div>
    );
  }
}

export default Index;