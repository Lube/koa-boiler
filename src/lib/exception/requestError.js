import env from '../env'

export default function formatRequestError (originalMessage) {
  const prodMessage = 'Error de validación de request'
  const message = env.NODE_ENV !== 'production' ? `${prodMessage} ${JSON.stringify(originalMessage)}` : prodMessage
  const RequestError = new Error(message)
  RequestError.status = 400
  RequestError.name = 'Request Error'

  return RequestError
}
