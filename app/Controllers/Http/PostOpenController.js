'use strict'

const Post = use('App/Models/Post')

class PostOpenController {

    async index ({ request, response, view }) {
        const { page } = request.only(['page'])

        const perPage = 6

        const posts = await Post
        .query()
        .with('image')
        .paginate(page, perPage)

        return posts
      }

    async show ({ params, request, response }) {
        const post = await Post
        .query()
        .with('image')
        .where('id', params.id)
        .fetch()
        return post
    }
}

module.exports = PostOpenController
