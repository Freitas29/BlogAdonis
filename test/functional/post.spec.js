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

test('it should delete a post', async ({ client, assert}) => {

    const email = "matheus@email.com"
    const password = "123456"
    
    const user = await Factory.model('App/Models/User').create({ email, password })
    const userPost = await Factory.model('App/Models/Post').make()

    await user.posts().save(userPost)

    const post = await client
    .delete(`/posts/${userPost.id}`)
    .send()
    .loginVia(user, 'jwt')
    .end()

    post.assertStatus(204)
})

test('it should get all posts', async ({ client, assert}) => {

    const email = "aa@email.com"
    const password = "123456"
    
    const user = await Factory.model('App/Models/User').create({ email, password })
    const userPosts = await Factory.model('App/Models/Post').createMany(3)

    const posts = await client
    .get('/posts')
    .send()
    .loginVia(user, 'jwt')
    .end()

    const size = posts.body.length

    assert.equal(userPosts[2].title, posts.body[size-1].title)
    posts.assertStatus(200)
})