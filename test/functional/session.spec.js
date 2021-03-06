const { test, trait } = use('Test/Suite')('User session')
const User = use('App/Models/User')
const Factory = use('Factory')
const Encryption = use('Encryption')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('it should return JWT token when session created', async ({ assert, client }) => {

    const sessionPayload = {
        email: "arao@email.com",
        password: "12345678"
    }

    const user = await Factory
    .model('App/Models/User')
    .create(sessionPayload)

    const response = await client
    .post('/users/login')
    .send(sessionPayload)
    .end()

    response.assertStatus(200)
    assert.exists(response.body.token)
})