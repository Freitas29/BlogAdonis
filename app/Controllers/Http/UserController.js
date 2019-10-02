'use strict'

const User = use('App/Models/User')

class UserController {
    async index({ request, response, auth}){
        const id = auth.user.id
        const user = await User.find(id)
        
        const posts = await user.posts().with('image').fetch()
        return posts
    }
}

module.exports = UserController
