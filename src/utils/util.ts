/**
 * 
 * @param servicesFun 
 */
export const createEffects = (servicesFun) => function *({ payload, callback },{ put, call }) {  
  if(typeof servicesFun !== 'function') {
    return console.error(new Error(`servicesFun: ${servicesFun} is not function`));
  }
  const response = yield call(servicesFun, payload);
  if(callback && typeof callback === 'function') {
    callback(response);
  };
  return response;
}