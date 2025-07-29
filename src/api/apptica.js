export async function fetchCountries() {
  const res = await fetch(
    `https://api.apptica.com/v1/geo?B4NKGg=fVN5Q9KVOlOHDx9mOsKPAQsFBlEhBOwguLkNEDTZvKzJzT3l`
  );
  if (!res.ok) throw new Error("Failed to fetch countries");
  const data = await res.json();
  return data.data || [];
}

export async function fetchCategories() {
  const res = await fetch(
    `https://api.apptica.com/v1/applicationCategory?platform=1&B4NKGg=fVN5Q9KVOlOHDx9mOsKPAQsFBlEhBOwguLkNEDTZvKzJzT3l`
  );
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  return data.data || [];
}

export async function fetchTopHistory({ countryId, dateFrom, dateTo }) {
  const res = await fetch(
    `https://api.apptica.com/package/top_history/9379/${countryId}?date_from=${dateFrom}&date_to=${dateTo}&platforms=1&B4NKGg=fVN5Q9KVOlOHDx9mOsKPAQsFBlEhBOwguLkNEDTZvKzJzT3l`
  );
  if (!res.ok) throw new Error("Failed to fetch top history");
  const data = await res.json();
  return data.data || null;
}
