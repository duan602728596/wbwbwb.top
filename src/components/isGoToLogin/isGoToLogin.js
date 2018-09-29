/* 判断是否跳转到登陆页 */
import { getUserInformation } from '../../utils';
import store from '../../store/store';

const T: number = 30 * 24 * 60 * 60 * 1000; // 三十天内免登陆

function isGoToLogin(): void{
  const infor: ?Object = getUserInformation();
  const time: number = store.getState().get('time');

  if(infor === null || time - infor.time > T){
    this.props.history.push('/Login');
  }
}

export default isGoToLogin;