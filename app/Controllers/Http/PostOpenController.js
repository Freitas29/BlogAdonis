'use strict'

const Post = use('App/Models/Post')

class PostOpenController {

    async index ({ request, response, view }) {
        const posts = Post.query().with('image').fetch()
        return posts
      }
}

module.exports = PostOpenController
