import {
  compile
} from './../../lib/schemas'


const LoginSchema = {
  properties: {
    username: { type: 'string', format: 'email' },
    password: { type: 'string' }
  },
  required: [
    'username',
    'password'
  ],
  additionalProperties: false
}

export default {
  login: compile(LoginSchema)
}
