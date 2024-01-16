export interface DateRecord {
  id: string;
  name: string;
  date: string;
  address: string;
  phone: string;
}
export enum FilterOption {
  None = "None",
  Address = "Address",
  Date = "Date",
  Phone = "Phone",
  Name = "Name",
}
export enum SortOption {
  None = "None",
  Newest = "Newest",
  Oldest = "Oldest",
}

export const useParams = () => {
  const setFilter = (filter: string) => {
    // set filter in query params
    const params = window.location.search;
    const url = new URLSearchParams(params);
    url.set("filter", filter);
    window.history.replaceState({}, "", `${window.location.pathname}?${url}`);
  };
  const setSearchQuery = (searchQuery: string) => {
    // set search query in query params
    const params = window.location.search;
    const url = new URLSearchParams(params);
    url.set("search", searchQuery);
    window.history.replaceState({}, "", `${window.location.pathname}?${url}`);
  };

  const setSorting = (sorting: string) => {
    const params = window.location.search;
    const url = new URLSearchParams(params);
    url.set("sorting", sorting);
    window.history.replaceState({}, "", `${window.location.pathname}?${url}`);
  };
  const setCurrentPage = (page: number) => {
    const params = window.location.search;
    const url = new URLSearchParams(params);
    url.set("page", page.toString());
    window.history.replaceState({}, "", `${window.location.pathname}?${url}`);
  };
  const getFilter = (): FilterOption => {
    const params = window.location.search;
    const url = new URLSearchParams(params);
    return (url.get("filter") as FilterOption) || FilterOption.None;
  };
  const getSorting = (): SortOption => {
    const params = window.location.search;
    const url = new URLSearchParams(params);
    return (url.get("sorting") as SortOption) || SortOption.None;
  };
  const getCurrentPage = (): number => {
    const params = window.location.search;
    const url = new URLSearchParams(params);
    return Number(url.get("page")) || 0;
  };

  const getSearchQuery = (): string => {
    const params = window.location.search;
    const url = new URLSearchParams(params);
    return url.get("search") || "";
  };

  return {
    setFilter,
    setSorting,
    setCurrentPage,
    setSearchQuery,
    getFilter,
    getSorting,
    getCurrentPage,
    getSearchQuery,
  };
};
