const { test, trait } = use('Test/Suite')('User registeration')
const User = use('App/Models/User')

trait('Test/ApiClient')

test('it should return JWT token when session created', async ({ assert, client }) => {
    const username = "Arão"
    const email = "arao@email.com"
    const password =  "password"
    const user = await User.create({
        username,
        email,
        password
    })

    const response = await client.post('/users/login').send({
        email,
        password
    })
    .end()

    response.assertStatus(200)
    assert.exists(response.body.token)
})