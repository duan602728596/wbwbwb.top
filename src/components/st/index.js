import axios from 'axios';
import store from '../../store/store';
import { getUserInformation } from '../../utils';
import { st } from './reducer';

let timer: ?number = null;

function requestSt(): Promise{
  const infor: ?Object = getUserInformation();
  const cookie: string = infor.cookie;
  return axios({
    url: `/api/config?cookie=${ cookie }`,
    method: 'GET'
  });
}

async function stTimerFn(): void{
  const { data }: { data: Object } = await requestSt();
  const payload: Object = st({
    st: data.data.st,
    cookie: data.cookie
  });
  store.dispatch(payload);
}

function getSt(): void{
  const infor: ?Object = getUserInformation();
  if(infor){
    stTimerFn();
    timer = setInterval(stTimerFn, 1000 * 60 * 15);
  }
}

if(typeof document === 'object') getSt();