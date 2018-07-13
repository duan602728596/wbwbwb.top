/* 判断是否跳转到登陆页 */
import { getUserInformation } from '../../utilities';

const T: number = 7 * 24 * 60 * 60 * 1000; // 七天内免登陆

function isGoToLogin(): void{
  const infor: ?Object = getUserInformation();
  if(infor === null || this.props.time - infor.time > T){
    this.props.history.push('/Login');
  }
}

export default isGoToLogin;