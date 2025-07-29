import { fetchTopHistory } from "../api/apptica";

function getDefaultDates() {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - 29);
  return {
    dateFrom: from.toISOString().slice(0, 10),
    dateTo: to.toISOString().slice(0, 10),
  };
}

const defaultDates = getDefaultDates();

const initialState = {
  data: null,
  loading: false,
  error: null,
  selectedCountry: null,
  dateFrom: defaultDates.dateFrom,
  dateTo: defaultDates.dateTo,
  selectedCategories: [],
};

export function topHistoryReducer(state = initialState, action) {
  switch (action.type) {
    case "topHistory/load/pending":
      return { ...state, loading: true, error: null };
    case "topHistory/load/fulfilled":
      return { ...state, loading: false, data: action.payload };
    case "topHistory/load/rejected":
      return { ...state, loading: false, error: action.error };
    case "topHistory/setSelectedCountry":
      return { ...state, selectedCountry: action.payload };
    case "topHistory/setDateRange":
      return {
        ...state,
        dateFrom: action.payload.dateFrom,
        dateTo: action.payload.dateTo,
      };
    case "topHistory/setSelectedCategories":
      return { ...state, selectedCategories: action.payload };
    default:
      return state;
  }
}

export function loadTopHistory({ countryId, dateFrom, dateTo }) {
  return async (dispatch) => {
    dispatch({ type: "topHistory/load/pending" });
    try {
      const data = await fetchTopHistory({ countryId, dateFrom, dateTo });
      dispatch({ type: "topHistory/load/fulfilled", payload: data });
    } catch (error) {
      dispatch({ type: "topHistory/load/rejected", error: error.message });
    }
  };
}

export function setSelectedCountry(countryId) {
  return { type: "topHistory/setSelectedCountry", payload: countryId };
}

export function setDateRange(dateFrom, dateTo) {
  return { type: "topHistory/setDateRange", payload: { dateFrom, dateTo } };
}

export function setSelectedCategories(categories) {
  return { type: "topHistory/setSelectedCategories", payload: categories };
}

export default topHistoryReducer;
