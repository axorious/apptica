import { fetchCountries } from "../api/apptica";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export function countriesReducer(state = initialState, action) {
  switch (action.type) {
    case "countries/load/pending":
      return { ...state, loading: true, error: null };
    case "countries/load/fulfilled":
      return { ...state, loading: false, items: action.payload };
    case "countries/load/rejected":
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

export function loadCountries() {
  return async (dispatch) => {
    dispatch({ type: "countries/load/pending" });
    try {
      const data = await fetchCountries();
      dispatch({ type: "countries/load/fulfilled", payload: data });
    } catch (error) {
      dispatch({ type: "countries/load/rejected", error: error.message });
    }
  };
}

export default countriesReducer;
