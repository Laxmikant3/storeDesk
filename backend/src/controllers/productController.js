import pool from '../models/db.js';

export const getProducts = async (req, res) => {
  const { search } = req.query;
  try {
    const query = search
      ? `SELECT * FROM products WHERE name ILIKE $1 OR description ILIKE $1`
      : `SELECT * FROM products`;
    const values = search ? [`%${search}%`] : [];
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const addProduct = async (req, res) => {
  const { name, price, description, image_url } = req.body;
  try {
    await pool.query(
      `INSERT INTO products (name, price, description, image_url) VALUES ($1, $2, $3, $4)`,
      [name, price, description, image_url]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product' });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM products WHERE id = $1`, [id]);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image_url } = req.body;
  try {
    await pool.query(
      `UPDATE products SET name=$1, price=$2, description=$3, image_url=$4 WHERE id=$5`,
      [name, price, description, image_url, id]
    );
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Failed to update product' });
  }
};
