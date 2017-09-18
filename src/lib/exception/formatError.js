import env from '../env'

export default function formatError (originalError) {
  try {
    if (env.NODE_ENV !== 'production') {
      return {
        status: originalError.status || 500,
        message: originalError.message,
        stack: originalError.stack
      }
    } else {
      return {
        status: originalError.status || 500,
        message: originalError.message ? originalError.message : 'Internal Server Error'
      }
    }
  } catch (e) {
    return {
      status: 500, message: env.NODE_ENV !== 'production' ? e.message : 'Internal Server Error'
    }
  }
}
