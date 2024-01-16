import styles from "./Table.module.css";
import records from "../../records.json";
import { useCallback, useEffect, useMemo, useState } from "react";

// getNearPages(0, 10) => [0, 1, 2]
// getNearPages(1, 10) => [0, 1, 2, 3]
// getNearPages(2, 10) => [1, 2, 3, 4]
// getNearPages(3, 10) => [2, 3, 4, 5]
function getNearPages(
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

interface Record {
  id: string;
  name: string;
  date: string;
  address: string;
  phone: string;
}
enum FilterOption {
  None = "None",
  Address = "Address",
  Date = "Date",
  Phone = "Phone",
  Name = "Name",
}
enum SortOption {
  None = "None",
  Newest = "Newest",
  Oldest = "Oldest",
}

const PAGE_SIZE = 10;
export const Table = () => {
  const [activePage, setActivePage] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");

  const [filterOption, setFilterOption] = useState<FilterOption>(
    FilterOption.None
  );
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.None);
  const onQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );
  const finalRecords = useMemo<Record[]>(() => {
    const filteredRecords = records.filter((record) => {
      if (searchQuery) {
        if (filterOption === FilterOption.None) {
          return true;
        } else if (filterOption === FilterOption.Address) {
          return record.address
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        } else if (filterOption === FilterOption.Date) {
          return record.date.includes(searchQuery);
        } else if (filterOption === FilterOption.Phone) {
          return record.phone.includes(searchQuery);
        } else if (filterOption === FilterOption.Name) {
          return record.name.toLowerCase().includes(searchQuery.toLowerCase());
        }
      }
      return true;
    });
    const sortedRecords = filteredRecords.sort((a, b) => {
      if (sortOption === SortOption.None) {
        return 0;
      } else if (sortOption === SortOption.Newest) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortOption === SortOption.Oldest) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return 0;
    });
    return sortedRecords;
  }, [searchQuery, filterOption, sortOption]);
  const pages = useMemo(() => {
    const pages = [];
    for (let i = 0; i < finalRecords.length; i += PAGE_SIZE) {
      pages.push(finalRecords.slice(i, i + PAGE_SIZE));
    }
    return pages;
  }, [finalRecords]);
  const nearPages = useMemo(() => {
    return getNearPages(activePage, pages.length, 1);
  }, [activePage, pages]);
  const onFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilterOption(e.target.value as FilterOption);
    },
    []
  );
  const onSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortOption(e.target.value as SortOption);
    },
    []
  );

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <input
          spellCheck={false}
          onChange={onQueryChange}
          className={styles.search_bar}
          placeholder="query"
        />
        <div className={styles.filters}>
          Filter:{" "}
          <select onChange={onFilterChange}>
            {Object.values(FilterOption).map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className={styles.filters}>
          Sort By:{" "}
          <select onChange={onSortChange}>
            <option>None</option>
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>
      </div>
      <div className={styles.list}>
        <div className={styles.header_row}>
          <div className={styles.cell}>Name</div>
          <div className={styles.cell}>Date</div>
          <div className={styles.cell}>Phone Number</div>
          <div role="address" className={styles.cell}>
            Somewhere in the universe
          </div>
          <div className={styles.cell}>User Id</div>
        </div>
        {finalRecords
          .slice(activePage * PAGE_SIZE, activePage * PAGE_SIZE + PAGE_SIZE)
          .map((item) => (
            <div key={item.id} className={styles.row}>
              <div className={styles.cell}>{item.name}</div>
              <div role="date" className={styles.cell}>
                {item.date}
              </div>
              <div className={styles.cell}>{item.phone}</div>
              <div role="address" className={styles.cell}>
                {item.address}
              </div>
              <div className={styles.cell}>{item.id}</div>
            </div>
          ))}
      </div>
      <div className={styles.footer}>
        <p>
          Showing data {activePage * PAGE_SIZE + 1} to{" "}
          {activePage * PAGE_SIZE + PAGE_SIZE} of {finalRecords.length} entries
        </p>
        <div className={styles.pagination}>
          {nearPages[0] !== 0 && (
            <div onClick={() => setActivePage(0)} className={styles.page}>
              1
            </div>
          )}
          {nearPages.map((pageIndex) => (
            <div
              key={pageIndex}
              onClick={() => setActivePage(pageIndex)}
              data-active={pageIndex === activePage}
              className={styles.page}
            >
              {pageIndex + 1}
            </div>
          ))}
          {nearPages[nearPages.length - 1] !== pages.length - 1 && (
            <div
              onClick={() => setActivePage(pages.length - 1)}
              className={styles.page}
            >
              {pages.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
