'use strict'

const User = use('App/Models/User')

class AuthenticateController {
    async store({ request }){
        const data = request.only(['username', 'email', 'password'])

        const user = await User.create(data)

        return user
    }

    async login({auth, request}){
        const { email, password } = request.all()
        
        const token = await auth.attempt(email, password)

        return token
    }

    async logout(){
        await auth.logout()
    }
}

module.exports = AuthenticateController
