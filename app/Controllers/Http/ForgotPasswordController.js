'use strict'

const Mail = use('Mail')
const Env = use('Env')
const User = use('App/Models/User')
const { randomBytes } = require('crypto')
const { promisify } = require('util')

class ForgotPasswordController {

    async store({ request }) {

        const email = request.input('email')

        const user = await User.findByOrFail('email', email)

        const random = await promisify(randomBytes)(24)

        const token = random.toString('hex')

        await user.tokens().create({
            token,
            type: 'forgotpassword'
        })

        const resetPasswordUrl = `${Env.get('FRONT_URL')}/reset?token=${token}`

        await Mail.send('emails.forgotPassword', {
            username: user.username,
            token,
            resetPasswordUrl
        }, (message) => {
            message
            .to(user.email)
            .from('blog@email.com')
            .subject('Recuperação de senha')
        })
        
    }
    
}

module.exports = ForgotPasswordController
