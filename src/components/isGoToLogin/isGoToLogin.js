/* 判断是否跳转到登陆页 */
import { getUserInformation } from '../../utilities';

function isGoToLogin(): void{
  if(getUserInformation() === null){
    this.props.history.push('/Login');
  }
}

export default isGoToLogin;