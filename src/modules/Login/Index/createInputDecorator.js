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
    fieldProps: PropTypes.object
  };

  render(): React.Element{
    const { errors, children, fieldProps }: {
      errors: ?string[],
      children: React.Element,
      fieldProps: Object
    } = this.props;

    const newElement: React.Element = cloneElement(children, {
      className: children.props.className + (errors ? ` ${ bootstrap['is-invalid'] }` : ''),
      ref: fieldProps.ref,
      onChange: fieldProps.onChange
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
      <InputItem errors={ errors } fieldProps={ fieldProps }>
        { element }
      </InputItem>
    );
  };
}

export default createInputDecorator;