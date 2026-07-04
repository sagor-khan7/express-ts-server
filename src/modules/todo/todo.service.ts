import { pool } from "../../config/db";

const createTodo = async (
  user_id: number,
  title: string,
  description: string,
  completed: string,
) => {
  const result = await pool.query(
    `INSERT INTO todos(user_id, title, description, completed) VALUES($1, $2, $3, $4) RETURNING *`,
    [user_id, title, description, completed],
  );
  return result;
};

const getTodo = async () => {
  const result = await pool.query(`SELECT * FROM todos`);
  return result;
};

const getSingleTodo = async (id: string) => {
  const result = await pool.query(`SELECT * FROM todos WHERE id = $1`, [id]);
  return result;
};

const updateTodo = async (
  user_id: number,
  title: string,
  description: string,
  completed: string,
  id: string,
) => {
  const result = await pool.query(
    `UPDATE todos SET user_id=$1, title=$2, description=$3, completed=$4 WHERE id=$5 RETURNING *`,
    [user_id, title, description, completed, id],
  );
  return result;
};

const deleteTodo = async (id: string) => {
  const result = await pool.query(`DELETE FROM todos WHERE id = $1`, [id]);
  return result;
};

export const todoServices = {
  createTodo,
  getTodo,
  getSingleTodo,
  updateTodo,
  deleteTodo,
};
