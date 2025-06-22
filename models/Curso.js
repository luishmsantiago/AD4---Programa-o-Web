const { query } = require('../config/db')

class Curso {
  static async getAll() {
    const result = await query(
      `SELECT * FROM cursos`
    )
    return result.rows
  }

  static async getById(id) {
    const result = await query(
      `SELECT * FROM public.cursos WHERE id = $1`, [id]
    )
    return result.rows

  }

  static async insert({ sigla, descricao, id_coordenador, nome }) {
    const str_query = `
      INSERT INTO cursos (sigla, descricao, id_coordenador, nome)
      VALUES ($1, $2, $3, $4)
      RETURNING *`
    console.log(str_query)
    console.log(sigla, descricao, id_coordenador, nome)
    const result = await query(
      str_query,
      [sigla, descricao, id_coordenador, nome]
    )
    return result.rows[0]
  }

  static async update(id, sigla, descricao, id_coordenador, nome ) {
    const result = await query(
      `UPDATE cursos SET sigla = $2, descricao = $3, id_coordenador = $4, nome = $5
      where id = $1 RETURNING *`,
      [id, sigla, descricao, id_coordenador, nome]
    )
    return result.rows[0]
  }
  static async delete(id) {
    const result = await query(
      `DELETE FROM cursos WHERE id = $1 RETURNING *`, [id]
    )
    return result.rows[0]
  }
}
module.exports = Curso