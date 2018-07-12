/**
 * 表单验证
 */
import React, { Component, cloneElement, Fragment } from 'react';
import PropTypes from 'prop-types';
import { css } from '../../../utilities';
import bootstrap from '../../../components/publicStyle/bootstrap.sass';
import style from './style.sass';

class InputItem extends Component{
  static propTypes: Object = {
    children: PropTypes.element,
    errors: PropTypes.arrayOf(PropTypes.string),
    form: PropTypes.object,
    fieldProps: PropTypes.object,
    formKey: PropTypes.string
  };
  state: Object = {
    value: ''  // 表单值
  };

  // change事件
  handleInputChange: Function = (event: Event): void=>{
    const { form, formKey }: {
      form: Object,
      formKey: string
    } = this.props;
    const value: string = event.target.value;
    this.setState({
      value
    });
    form.setFieldsValue({
      [formKey]: value
    });
  };
  render(): React.Element{
    const { errors, children, fieldProps }: {
      errors: ?string[],
      children: React.Element,
      fieldProps: Object
    } = this.props;

    const newElement: React.Element = cloneElement(children, {
      ...fieldProps,
      className: children.props.className + (errors ? ` ${ bootstrap['is-invalid'] }` : ''),
      value: this.state.value,
      onChange: this.handleInputChange
    });

    return (
      <Fragment>
        { newElement }
        {
          do{
            if(errors){
              <div className={ css(bootstrap['invalid-feedback'], style.invalid) }>{ errors.join(', ') }</div>;
            }
          }
        }
      </Fragment>
    );
  }
}

function createInputDecorator(props: Object, key: string, options: Object = {}): Function{
  const { getFieldProps, getFieldError }: {
    getFieldProps: Function,
    getFieldError: Function
  } = props.form;

  return function(element: React.Element): React.Element{
    const errors: ?string[] = getFieldError(key);
    const fieldProps: Object = getFieldProps(key, options);

    return (
      <InputItem errors={ errors } form={ props.form } fieldProps={ fieldProps } formKey={ key }>
        { element }
      </InputItem>
    );
  };
}

export default createInputDecorator;