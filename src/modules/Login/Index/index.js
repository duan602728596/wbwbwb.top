import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import { Layout, Row, Col, Form, Input, Checkbox, Button, message } from 'antd';
import { USER_INFORMATION, encryption } from '../../../utils';
import publicStyle from '../../../components/publicStyle/publicStyle.sass';
import style from './style.sass';
import Ad from '../../../components/Ad/index';
import adList from '../../../components/Ad/adList';
import Footer from '../../../assembly/Footer/index';
import { prelogin, pattern, verify, login } from '../request';

@withRouter
@Form.create()
class Index extends Component{
  static propTypes: Object = {
    form: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
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
      const step4: Object = await login(data);
      const step4Data: Object = step4.data;

      if(step4Data.retcode === 20000000){
        const storageData: string = JSON.stringify({
          username: formValue.username,
          cookie: encryption.decode(step4Data._),
          time: new Date().getTime()
        });
        if(formValue['remember-password']){
          localStorage.setItem(USER_INFORMATION, storageData);
        }else{
          sessionStorage.setItem(USER_INFORMATION, storageData);
        }
        this.props.history.push('/Index');
        message.success('登陆成功！');
      }else{
        message.error(`（${ step4Data.retcode }）${ step4Data.msg }`);
      }
    }catch(err){
      console.error(err);
      message.error('登陆失败！');
    }
  }
  // 验证完毕后的回调函数
  async patternCallback(formValue: Object, id: string, event: Event): Promise<void>{
    try{
      const data: Object = event.data;
      const username: string = encodeURIComponent(formValue.username);
      const pathEnc: string = encodeURIComponent(data.path_enc);
      const dataEnc: string = encodeURIComponent(data.data_enc);
      const step3: Object = await verify(id, username, pathEnc, dataEnc);

      if(step3.code === '100000'){
        this.login(formValue, id);
      }else{
        message.error(`（${ step3.code }）${ step3.msg }`);
      }
    }catch(err){
      console.error(err);
      message.error('验证失败！');
    }
    document.removeEventListener('weibo-pattlock', this.patternCallbackBind);
    this.patternCallbackBind = null;
  }
  // 验证登陆是否需要验证码
  async prelogin(formValue: Object): Promise<void>{
    try{
      const ub64: string = btoa(formValue.username); // base64加密
      const step1: Object = await prelogin(ub64);
      // 需要验证码
      if(('showpin' in step1 && step1.showpin === 1) || ('smsurl' in step1) || formValue.vcode){
        // 获取验证码
        const step2: Object = await pattern(formValue.username);
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
  render(): React.ChildrenArray<React.Element>{
    const { getFieldDecorator }: { getFieldDecorator: Function } = this.props.form;
    return [
      <Helmet key="helmet">
        <title>登陆 - 微博签到系统</title>
      </Helmet>,
      <Layout key="element" className={ publicStyle.main }>
        <Layout.Content className={ style.content }>
          {/* 登陆表单 */}
          <Form className={ style.form } id="login-form" onSubmit={ this.handleFormSubmit }>
            <Ad className={ style.loginAd }
              src={ adList }
            />
            <Form.Item className={ style.group } label="微博用户名：" colon={ false }>
              {
                getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      message: '请输入用户名！',
                      whitespace: true
                    }
                  ]
                })(<Input />)
              }
            </Form.Item>
            <Form.Item className={ style.group } label="密码：" colon={ false }>
              {
                getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: '请输入密码！'
                    }
                  ]
                })(<Input type="password" />)
              }
            </Form.Item>
            <Row type="flex">
              <Col span={ 12 }>
                <Form.Item className={ style.checkGroup }>
                  { getFieldDecorator('remember-password')(<Checkbox aria-label="三十天内免登陆" />) }
                  <label className={ style.checkText } htmlFor="remember-password">三十天内免登陆</label>
                </Form.Item>
                <Form.Item className={ classNames(style.checkGroup, style.mb40) }>
                  { getFieldDecorator('vcode')(<Checkbox aria-label="使用验证码登陆" />) }
                  <label className={ style.checkText } htmlFor="vcode">使用验证码登陆</label>
                </Form.Item>
              </Col>
              <Col className={ style.linkDescription } span={ 12 }>
                <Link to="/Login/Description">网站说明</Link>
              </Col>
            </Row>
            <Button className={ style.loginBtn } type="primary" htmlType="submit" size="large" block={ true }>登陆</Button>
            <Ad className={ style.loginAd } src={ adList } />
          </Form>
        </Layout.Content>
        <Footer />
      </Layout>
    ];
  }
}

export default Index;