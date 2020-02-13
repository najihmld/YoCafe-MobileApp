import axios from 'axios';

export const getCategory = () => {
  return {
    type: 'GET_CATEGORY',
    payload: axios.get('http://127.0.0.1:3001/category')
  };
};

export const postCategory = form => {
  return {
    type: 'POST_CATEGORY',
    payload: axios.post('http://127.0.0.1:3001/category', form)
  };
};

export const patchCategory = (idCategory, newValue) => {
  return {
    type: 'PATCH_CATEGORY',
    payload: axios.patch(
      `http://127.0.0.1:3001/category/${idCategory}`,
      newValue
    )
  };
};

export const deleteCategory = (event, idCategory) => {
  return {
    type: 'DELETE_CATEGORY',
    payload: axios.delete(`http://127.0.0.1:3001/category/${idCategory}`, event)
  };
};
