import { readFileSync, writeFileSync } from 'fs'

export function addRespuesta (respuesta) {
  const respuestas = JSON.parse(readFileSync(`${__dirname}/respuestas.json`, 'utf8'))

  respuestas.push({nombre: respuesta.nombre, telefono: respuesta.telefono, email: respuesta.email})

  writeFileSync(`${__dirname}/respuestas.json`, JSON.stringify(respuestas, null, 4))
}

export function getRespuestas () {
  return JSON.parse(readFileSync(`${__dirname}/respuestas.json`, 'utf8'))
}