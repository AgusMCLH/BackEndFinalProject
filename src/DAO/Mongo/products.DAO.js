import { productModel } from './../../models/product.model.js';
import { logger } from './../../middleware/logger.middleware.js';

class ProductDAO {
  constructor() {
    this.model = productModel;
  }

  async addProducts(product) {
    try {
      const data = await this.model.create(product);
      return {
        code: 201,
        msg: `El producto fue agregado correctamente con el id: ${data._id}`,
      };
    } catch (error) {
      logger.error(error);
      return {
        code: 500,
        msg: `Error de servidor - ${error}`,
      };
    }
  }

  async getProducts(limit, page, sort, query) {
    try {
      let data;
      if (sort === false) {
        data = await this.model.paginate(query, { lean: true, limit, page });
      } else {
        data = await this.model.paginate(query, {
          lean: true,
          limit,
          page,
          sort: { price: sort },
        });
      }
      return data;
    } catch (error) {
      logger.error(error);
      return {
        code: 500,
        msg: `Error de servidor - ${error}`,
      };
    }
  }

  async getAllProducts() {
    try {
      const data = await this.model.find().lean();
      return data;
    } catch (error) {
      logger.error(error);
      return {
        code: 500,
        msg: `Error de servidor - ${error}`,
      };
    }
  }

  async getProductByID(id) {
    try {
      const data = await this.model.findById(id).lean();
      if (!data) {
        return {
          code: 400,
          msg: `No existe un producto con el id ${id}`,
        };
      }
      return data;
    } catch (error) {
      logger.error(error);
      return {
        code: 500,
        msg: `Error de servidor - ${error}`,
      };
    }
  }

  async updateProduct(idAEditar, product) {
    try {
      const data = await this.model.findByIdAndUpdate(idAEditar, product);
      if (!data) {
        return {
          code: 400,
          msg: `No existe un producto con el id ${idAEditar}`,
        };
      }
      return {
        code: 200,
        msg: `El producto con el id ${idAEditar} fue actualizado correctamente`,
      };
    } catch (error) {
      logger.error(error);
      return {
        code: 500,
        msg: `Error de servidor - ${error}`,
      };
    }
  }

  async deleteProduct(id) {
    try {
      const data = await this.model.findByIdAndDelete(id);
      if (!data) {
        return {
          code: 400,
          msg: `No existe un producto con el id ${id}`,
        };
      }
      return {
        code: 200,
        msg: `El producto con el id ${id} fue eliminado correctamente.`,
      };
    } catch (error) {
      logger.error(error);
      return {
        code: 500,
        msg: `Error de servidor - ${error}`,
      };
    }
  }

  async getProductsByOwner(owner) {
    try {
      const products = await this.model.find({ owner }).lean();
      return products;
    } catch (error) {
      logger.error(error);
      return {
        code: 500,
        msg: `Error de servidor - ${error}`,
      };
    }
  }
}

export const productDAO = new ProductDAO();
