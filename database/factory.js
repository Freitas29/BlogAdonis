'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')

Factory.blueprint('App/Models/User', async (faker, i, data) => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: faker.password(),
    ...data
  }
})

Factory.blueprint('App/Models/Token', async (faker, i, data) => {
  return {
    type: data.type || 'refreshtoken',
    token: faker.string({ length: 20}),
    ...data
  }
})


Factory.blueprint('App/Models/Post', async (faker, i, data) => {
  return {
    title: faker.string({ length: 10}),
    small_description: faker.string({ length: 20}),
    description: faker.string({ string: 30}),
    ...data
  }
})
