export function login (username, password) {
  if (username === 'admin' && password === 'admin') {
    return Promise.resolve('123')
  } else {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('用户名或密码错误！')
  }
}
