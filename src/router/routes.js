import App from '../app'

 /* auth true登录才能访问，false不需要登录，默认true
 */
export default [
  {
    path: '/',
    component: App,
    children: [
    ]
  }
]
