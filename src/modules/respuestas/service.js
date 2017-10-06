import { addRespuesta, getRespuestas } from './repository'
import logger from './../../lib/logger'
import XLSX from 'xlsx'
import { readFile, unlink } from 'fs'
import { promisify } from 'util'

const unlinkAsync = promisify(unlink)
const readFileAsync = promisify(readFile)

export async function recordRespuesta (respuesta) {
  try {
    await addRespuesta(respuesta)

    return 'ok!'
  } catch (e) {
    throw e
  }
}

export async function crearPlanillaExportable (filename) {
  try {
    await unlinkAsync(`${__dirname}/${filename}`)

    const respuestas = await getRespuestas()
    const RespuestasWorksheet = XLSX.utils.aoa_to_sheet([
      [ "Nombre completo", "Telefono", "Email"],
      ...respuestas.map(r => Object.values(r))
    ])

    RespuestasWorksheet['!cols'] = [
      {wch: 20},
      {wch: 20},
      {wch: 20}
    ]
    
    const workbook = {
      SheetNames:['Respuestas'],
      Sheets:{
        Respuestas: RespuestasWorksheet
      }
    };

    await XLSX.writeFile(workbook, `${__dirname}/${filename}`);
    return readFileAsync(`${__dirname}/${filename}`)
  } catch (e) {
    throw e
  }
}
