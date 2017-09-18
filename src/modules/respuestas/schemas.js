import {
  compile
} from './../../lib/schemas'


const RespuestaSchema = {
  properties: {
    nombre: { type: 'string' },
    telefono: { type: 'string' },
    email: { type: 'string', format: 'email' }
  },
  required: [
    'nombre',
    'telefono',
    'email'
  ],
  additionalProperties: false
}

export default {
  record: compile(RespuestaSchema)
}
