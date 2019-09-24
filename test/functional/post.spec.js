const { test, trait, beforeEach } = use('Test/Suite')('Post')

const Factory = use('Factory')
const User = use('App/Models/User')

trait('Test/ApiClient')
trait('Auth/Client')

beforeEach(() => {

})

test('it should create a post', async ({ client, assert}) => {

    const email = "edson@email.com"
    const password = "123456"
    
    const user = await Factory.model('App/Models/User').create({ email, password })
    const userPost = await Factory.model('App/Models/Post').make()

    await user.posts().save(userPost)

    const session = await client
    .post('/users/login')
    .send({email, password})
    .end()
        
    const post = await client
    .post('/posts')
    .send(userPost.toJSON())
    .loginVia(user, 'jwt')
    .end()

    assert.equal(post.body.title, userPost.title)
    session.assertStatus(200)
})

test('it should update a post', async ({ client, assert}) => {

    const email = "luan@email.com"
    const password = "123456"
    const newTitle = 'title updated' 
    
    const user = await Factory.model('App/Models/User').create({ email, password })
    const userPost = await Factory.model('App/Models/Post').make()

    await user.posts().save(userPost)

    const session = await client
    .post('/users/login')
    .send({email, password})
    .end()

    const post = await client
    .put(`/posts/${userPost.id}`)
    .send({title: newTitle})
    .loginVia(user, 'jwt')
    .end()

    assert.equal(post.body.title, 'title updated')
    session.assertStatus(200)
})