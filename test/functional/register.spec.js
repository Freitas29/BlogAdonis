const { test, trait } = use('Test/Suite')('User registration')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('it should return a user with success', async ({ assert, client }) => {
    const data = {
        username: "teste",
        email: "teste@email.com",
        password: "password"
    }

    const response = await client.post('/users').send(data).end()

    response.assertStatus(200)
    assert.equal(data.email,response.body.email)
})