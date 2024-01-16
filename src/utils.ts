import { SortOption } from "./useParams";

export function getNearPages(
  activePage: number,
  totalPages: number,
  raduis: number = 1
) {
  const pages = [];
  for (let i = activePage - raduis; i <= activePage + raduis; i++) {
    if (i >= 0 && i < totalPages) {
      pages.push(i);
    }
  }
  return pages;
}

export const sortRecords = (
  date1: string,
  date2: string,
  sortOption: SortOption
) => {
  const date1Obj = new Date(date1);
  const date2Obj = new Date(date2);

  if (sortOption === SortOption.Oldest) {
    return date1Obj.getTime() - date2Obj.getTime();
  }
  if (sortOption === SortOption.Newest) {
    return date2Obj.getTime() - date1Obj.getTime();
  }
  return 0;
};
