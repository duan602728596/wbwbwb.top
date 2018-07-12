/* 公共函数 */

/**
 * 将对象转换成一个数组
 * @param { Object } obj
 * @return { Array }
 */
export function objectToArray(obj: Object): Function[]{
  const arr: Function[] = [];
  for(const key: string in obj){
    arr.push(obj[key]);
  }
  return arr;
}

/**
 * 合并className
 */
export function css(): string{
  return [...arguments].join(' ');
}

/**
 * jsonp方法
 * @param { string } uri: 请求地址
 */
export function jsonp(uri: string): Promise{
  let script: Element = document.createElement('script');
  return new Promise((resolve: Function, reject: Function): void=>{
    // callback
    const time: number = new Date().getTime();
    const callbackName: string = `jsonpCallback${ time }`;
    script.src = `${ uri }&callback=${ callbackName }`;
    script.id = callbackName;

    window[callbackName] = (data: Object): void=>{
      resolve(data);
    };
    // load
    const handleScriptLoad: Function = (event: Event): void=>{
      delete window[callbackName];
      script.removeEventListener('load', handleScriptLoad);
      script.removeEventListener('error', handleScriptError);
      document.body.removeChild(script);
      script = null;
    };
    // error
    const handleScriptError: Function = (event: Event): void=>{
      handleScriptLoad();
      reject(event);
    };

    script.addEventListener('load', handleScriptLoad, false);
    script.addEventListener('error', handleScriptError, false);
    document.body.appendChild(script);
  });
}