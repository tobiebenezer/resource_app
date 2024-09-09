module.exports = (model, options = {}) => {
    const { page = 1, limit = 10, ...queryOptions } = options;
    
    const offset = (page - 1) * limit;
    
    return model.findAndCountAll({
      ...queryOptions,
      limit: limit,
      offset: offset
    }).then(({ count, rows }) => {
      const totalPages = Math.ceil(count / limit);
  
      return {
        data: rows,
        pagination: {
          totalItems: count,
          totalPages: totalPages,
          currentPage: parseInt(page),
          pageSize: limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1
        }
      };
    });
  }
 