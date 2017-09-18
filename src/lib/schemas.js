import formatRequestError from './exception/requestError'
import Ajv from 'ajv'

const ajv = new Ajv()

export function validarSchema (schemas, actionName, body) {
  if (!schemas[actionName](body)) {
    throw formatRequestError(schemas[actionName].errors)
  }
}

export const compile = ajv.compile.bind(ajv)
