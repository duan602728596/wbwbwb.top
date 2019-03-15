import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Row, Col, Form, Input, Checkbox, Button, message } from 'antd';
import { USER_INFORMATION, encryption, getQuery } from '../../../utils';
import style from './style.sass';
import { login, geetest, geetestValidate, geetestCaptcha } from '../request';

@withRouter
@Form.create()
class LoginForm extends Component {
  state = {
    isEmbedCaptchaDisplay: false // 是否显示验证码
  };

  // 关闭
  handleCloseEmbedCaptchaClick = (event) => {
    this.setState({ isEmbedCaptchaDisplay: false });
  };

  // 登陆成功的回调函数
  loginSuccessCallback(username, cookie, rememberPassword) {
    const storageData = JSON.stringify({
      username,
      cookie: encryption.decode(cookie),
      time: new Date().getTime()
    });

    if (rememberPassword) localStorage.setItem(USER_INFORMATION, storageData);
    else sessionStorage.setItem(USER_INFORMATION, storageData);

    this.props.history.push('/Index');
    message.success('登陆成功！');
  }

  // 验证的回调函数
  handleEmbed(id, cookie, formValue, captchaObj) {
    const _this = this;

    this.setState({
      isEmbedCaptchaDisplay: true
    }, () => {
      captchaObj.appendTo('#embed-captcha');
      captchaObj.onSuccess(async function() {
        const result = captchaObj.getValidate();
        const step1 = await geetestValidate(id, {
          geetest_challenge: result.geetest_challenge,
          geetest_validate: result.geetest_validate,
          geetest_seccode: result.geetest_seccode
        }, cookie);

        const step1Data = step1.data;

        if (step1Data.retcode === 100000) {
          const step2 = await geetestCaptcha(id, cookie);

          _this.setState({ isEmbedCaptchaDisplay: false });
          _this.loginSuccessCallback(formValue.username, step2.data._, formValue['remember-password']);
        } else {
          message.error(`（${ step1Data.retcode }）${ step1Data.msg }`);
        }
      });
    });
  }

  // 登陆
  async login(formValue, id) {
    try {
      const data = {
        username: formValue.username,
        password: formValue.password
      };

      if (id) data.vid = id;
      const step0 = await login(data);
      const step0Data = step0.data;

      if (step0Data.retcode === 20000000) {
        this.loginSuccessCallback(formValue.username, step0Data._, formValue['remember-password']);
      } else if (step0Data.retcode === 50060000) {
        // 需要验证码
        const errUrl = step0Data.data.errurl;
        const q = getQuery(errUrl);
        const { data } = await geetest(q.id, step0Data._);

        window.initGeetest({
          gt: data.gt,
          challenge: data.challenge,
          new_captcha: data.new_captcha,
          product: 'embed',
          offline: !data.success
        }, this.handleEmbed.bind(this, q.id, step0Data._, formValue));
      } else {
        message.error(`（${ step0Data.retcode }）${ step0Data.msg }`);
      }
    } catch (err) {
      console.error(err);
      message.error('登陆失败！');
    }
  }

  // 提交方法
  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (err) return void 0;
      this.login(value);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return [
      <Form key="form" id="login-form" onSubmit={ this.handleFormSubmit }>
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
      </Form>,
      this.state.isEmbedCaptchaDisplay ? (
        <div key="embedCaptcha" className={ style.embedCaptchaBox }>
          <div className={ style.embedCaptcha } id="embed-captcha" />
          <Button type="danger" icon="close" onClick={ this.handleCloseEmbedCaptchaClick }>关闭</Button>
        </div>
      ) : null
    ];
  }
}

export default LoginForm;