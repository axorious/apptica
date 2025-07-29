import { fetchCategories } from "../api/apptica";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case "categories/load/pending":
      return { ...state, loading: true, error: null };
    case "categories/load/fulfilled":
      return { ...state, loading: false, items: action.payload };
    case "categories/load/rejected":
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

export function loadCategories() {
  return async (dispatch) => {
    dispatch({ type: "categories/load/pending" });
    try {
      const data = await fetchCategories();
      dispatch({ type: "categories/load/fulfilled", payload: data });
    } catch (error) {
      dispatch({ type: "categories/load/rejected", error: error.message });
    }
  };
}

export default categoriesReducer;
