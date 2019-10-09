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

//Private routes
Route.resource('posts', 'PostController').apiOnly().middleware('auth')
Route.post('posts/:id/images', 'ImageController.store').middleware('auth')
Route.put('posts/:id/images', 'ImageController.update').middleware('auth')
Route.resource('comments', 'CommentController').apiOnly().middleware('auth')
Route.get('users/posts', 'UserController.index').middleware('auth')

//Public routes
Route.get('open/posts', 'PostOpenController.index')
Route.get('open/posts/:id', 'PostOpenController.show')
Route.resource('users', 'AuthenticateController').only(['store','update'])
Route.post('users/login', 'AuthenticateController.login')
Route.get('images/:path', 'ImageController.show')
Route.post('forgot', 'ForgotPasswordController.store')
Route.post('reset', 'ResetPasswordController.store')
