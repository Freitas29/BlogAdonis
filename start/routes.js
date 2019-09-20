'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.resource('users', 'AuthenticateController').only(['store','update'])
Route.post('users/login', 'AuthenticateController.login')
Route.resource('posts', 'PostController').apiOnly().middleware('auth')
Route.post('posts/:id/images', 'ImageController.store').middleware('auth')
Route.get('images/:path', 'ImageController.show')
Route.resource('comments', 'CommentsController').apiOnly().middleware('auth')