import { client } from "../db/mysqldb_config";
import { IProduct } from "../interfaces/Product.interface";

export const getProducts = async (): Promise<IProduct[]> => {
  let conn;
  try {
    conn = await client();
    const products = await conn?.query("SELECT * FROM products");
    return products;
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    conn?.destroy();
  }
};

export const getProduct = async (id: number): Promise<IProduct | null> => {
  let conn;
  try {
    conn = await client();
    const product = await conn?.query(
      "SELECT * FROM products WHERE id = ?",
      id
    );
    return product[0];
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    conn?.destroy();
  }
};

export const addProduct = async (product: IProduct) => {
  let conn;
  try {
    conn = await client();
    console.log(product);
    await conn?.query("INSERT INTO products (name, description, price) VALUES (?, ?, ?)", [
      product.name,
      product.description,
      product.price,
    ]);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    conn?.destroy();
  }
};

export const updateProduct = async (product: IProduct) => {
  let conn;
  try {
    conn = await client();
    await conn?.query(
      "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?",
      [product.name, product.description, product.price, product.id]
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    conn?.destroy();
  }
};

export const deleteProduct = async (id: string) => {
  let conn;
  try {
    conn = await client();
    await conn?.query("DELETE FROM products WHERE id = ?", [id]);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    conn?.destroy();
  }
};
