const { test, trait } = use('Test/Suite')('Forgot password')

const Factory = use('Factory')
const Hash = use('Hash')
const Mail = use("Mail")
const User = use('App/Models/User')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('it should send an email with forgot password instructions', async ({ assert, client }) => {
    Mail.fake()

    const email = "arao@email.com"

    const user = await Factory
    .model('App/Models/User')
    .create({email})

    await client
    .post('/forgot')
    .send({email})
    .end()

    const token = await user.tokens().first()

    const recentEmail = Mail.pullRecent()

    assert.equal(recentEmail.message.to[0].address, email)
   
    assert.include(token.toJSON(), {
        type: 'forgotpassword'
    })

    Mail.restore()


})


test('it should reset password', async ({ client, assert}) => {
    const email = "arao@email.com"
    const user = await Factory.model('App/Models/User').create({ email })
    const userToken = await Factory.model('App/Models/Token').make()

    await user.tokens().save(userToken)
   

    const response = await client
    .post('/reset')
    .send({
        token: userToken.token,
        password: '123456',
        password_confirmation: '123456'
    })
    .end()

    await user.reload()
    const checkPassword = await Hash.verify('123456', user.password)
        
    assert.isTrue(checkPassword)
})