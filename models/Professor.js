const { query } = require('../config/db')

class Professor {
  static async getAll() {
    const result = await query(
      `SELECT * FROM professor`
    )
    return result.rows
  }

  static async getById(id) {
    const result = await query(
      `SELECT * FROM public.professor WHERE id = $1`, [id]
    )
    return result.rows

  }

  static async insert({nome, email}) {
    
    const result = await query(
      `INSERT INTO public.professor (nome, email) 
      VALUES ($1, $2) 
      RETURNING *`,
      [nome, email]
    )
    return result.rows[0]
  }

  static async update(id, nome, email) {
    const result = await query(
      `UPDATE professor SET nome = $2, email = $3 
      where id = $1 RETURNING *`,
      [id, nome, email]
    )
    return result.rows[0]
  }
  static async delete(id) {
    const result = await query(
      `DELETE FROM professor WHERE id = $1 RETURNING *`, [id]
    )
    return result.rows[0]
  }
}
module.exports = Professor