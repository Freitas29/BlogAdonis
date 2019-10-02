const { test, trait, beforeEach } = use('Test/Suite')('Post')

const Factory = use('Factory')
const User = use('App/Models/User')

trait('Test/ApiClient')
trait('Auth/Client')
trait('DatabaseTransactions')

beforeEach(() => {

})

test('it should get all post by a user', async ({ client, assert}) => {

    const email = "edson@email.com"
    const password = "123456"
    
    const user = await Factory.model('App/Models/User').create({ email, password })
    const userPost = await Factory.model('App/Models/Post').make()

    await user.posts().save(userPost)

    await client
    .post('/users/login')
    .send({email, password})
    .end()
        
    const post = await client
    .post('/posts')
    .send(userPost.toJSON())
    .loginVia(user, 'jwt')
    .end()

    const posts = await client
    .get('/users/posts')
    .loginVia(user, 'jwt')
    .end()

    
    assert.equal(posts.body[0].title,post.body.title)
    assert.equal(posts.body[0].user_id, post.body.user_id)
})
