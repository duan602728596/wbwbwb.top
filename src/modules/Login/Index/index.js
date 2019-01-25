import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Layout, Row, Col, Form, Input, Checkbox, Button, message } from 'antd';
import { USER_INFORMATION, encryption, getQuery } from '../../../utils';
import publicStyle from '../../../components/publicStyle/publicStyle.sass';
import style from './style.sass';
import Ad from '../../../components/Ad/Ad';
import Footer from '../../../assembly/Footer/index';
import { login, geetest, geetestValidate, geetestCaptcha } from '../request';

@withRouter
@Form.create()
class Index extends Component{
  static propTypes: Object = {
    form: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  };

  state: {
    isEmbedCaptchaDisplay: boolean
  } = {
    isEmbedCaptchaDisplay: false // 验证码
  };

  componentDidMount(): void{
    localStorage.removeItem(USER_INFORMATION);
    sessionStorage.removeItem(USER_INFORMATION);
  }
  // 关闭
  handleCloseEmbedCaptchaClick: Function = (event: Event): void=>{
    this.setState({ isEmbedCaptchaDisplay: false });
  };
  // 登陆成功的回调函数
  loginSuccessCallback(username: string, cookie: string, rememberPassword: boolean): void{
    const storageData: string = JSON.stringify({
      username,
      cookie: encryption.decode(cookie),
      time: new Date().getTime()
    });

    if(rememberPassword) localStorage.setItem(USER_INFORMATION, storageData);
    else sessionStorage.setItem(USER_INFORMATION, storageData);

    this.props.history.push('/Index');
    message.success('登陆成功！');
  }
  // 验证的回调函数
  handleEmbed(id: string, cookie: string, formValue: Object, captchaObj: Object): void{
    const _this: this = this;

    this.setState({
      isEmbedCaptchaDisplay: true
    }, (): void=>{
      captchaObj.appendTo('#embed-captcha');
      captchaObj.onSuccess(async function(): Promise<void>{
        const result: Object = captchaObj.getValidate();
        const step1: Object = await geetestValidate(id, {
          geetest_challenge: result.geetest_challenge,
          geetest_validate: result.geetest_validate,
          geetest_seccode: result.geetest_seccode
        }, cookie);

        const step1Data: Object = step1.data;

        if(step1Data.retcode === 100000){
          const step2: Object = await geetestCaptcha(id, cookie);

          _this.setState({ isEmbedCaptchaDisplay: false });
          _this.loginSuccessCallback(formValue.username, step2.data._, formValue['remember-password']);
        }else{
          message.error(`（${ step1Data.retcode }）${ step1Data.msg }`);
        }
      });
    });
  }
  // 登陆
  async login(formValue: Object, id: ?string): Promise<void>{
    try{
      const data: Object = {
        username: formValue.username,
        password: formValue.password
      };
      if(id) data.vid = id;
      const step0: Object = await login(data);
      const step0Data: Object = step0.data;

      if(step0Data.retcode === 20000000){
        this.loginSuccessCallback(formValue.username, step0Data._, formValue['remember-password']);
      }else if(step0Data.retcode === 50060000){
        // 需要验证码
        const errUrl: string = step0Data.data.errurl;
        const q: Object = getQuery(errUrl);
        const { data }: { data: Object } = await geetest(q.id, step0Data._);

        window.initGeetest({
          gt: data.gt,
          challenge: data.challenge,
          new_captcha: data.new_captcha,
          product: 'embed',
          offline: !data.success
        }, this.handleEmbed.bind(this, q.id, step0Data._, formValue));
      }else{
        message.error(`（${ step0Data.retcode }）${ step0Data.msg }`);
      }
    }catch(err){
      console.error(err);
      message.error('登陆失败！');
    }
  }
  // 提交方法
  handleFormSubmit: Function = (event: Event): void=>{
    event.preventDefault();
    this.props.form.validateFields((err: any, value: Object): void=>{
      if(err) return void 0;
      this.login(value);
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
            <Ad className={ style.loginAd } />
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
                })(<Input.Password />)
              }
            </Form.Item>
            <Row type="flex">
              <Col span={ 12 }>
                <Form.Item className={ style.checkGroup }>
                  { getFieldDecorator('remember-password')(<Checkbox aria-label="三十天内免登陆" />) }
                  <label className={ style.checkText } htmlFor="remember-password">三十天内免登陆</label>
                </Form.Item>
              </Col>
              <Col className={ style.linkDescription } span={ 12 }>
                <Link to="/Login/Description">网站说明</Link>
              </Col>
            </Row>
            <Button className={ style.loginBtn } type="primary" htmlType="submit" size="large" block={ true }>登陆</Button>
            <Ad className={ style.loginAd } />
          </Form>
        </Layout.Content>
        <Footer />
        {
          this.state.isEmbedCaptchaDisplay ? (
            <div className={ style.embedCaptchaBox }>
              <div className={ style.embedCaptcha } id="embed-captcha" />
              <Button type="danger" icon="close" onClick={ this.handleCloseEmbedCaptchaClick }>关闭</Button>
            </div>
          ) : null
        }
      </Layout>
    ];
  }
}

export default Index;