'use strict'

const Image = use('App/Models/Image')
const Helpers = use('Helpers')
const Post = use('App/Models/Post')
class ImageController {

    async store ({ request, params }) {
        const post = await Post.findOrFail(params.id)

        const image = request.file('image', {
            types: ['image'],
            size: '2mb'
        })

        await image.move(Helpers.tmpPath('uploads'),{
        name: `${Date.now()}`
        })

        if (!image.moved()) {
            return image.error()
         }

        post.image().create({ path: image.fileName })
    }

    async show({ response, params }){
        return response.download(Helpers.tmpPath(`uploads/${params.path}`))
    }

}

module.exports = ImageController
