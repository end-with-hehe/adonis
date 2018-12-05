'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
// page
Route.on('/', 'IndexController.index')
Route.get('/index', 'IndexController.index')
Route.get('/login', 'IndexController.login')

// api
Route.get('/do_login','IndexController.do_login')
Route.get('/posts/:id', ({ params }) => {
  return `Post ${JSON.stringify(params)}`
})
