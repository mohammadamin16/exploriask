import styles from "./Table.module.css";
import records from "../../records.json";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DateRecord,
  FilterOption,
  SortOption,
  useParams,
} from "../../useParams";
import { getNearPages, sortRecords } from "../../utils";

const PAGE_SIZE = 10;
const SEARCH_DELAY = 300;
export const Table = () => {
  const {
    getCurrentPage,
    getFilter,
    getSearchQuery,
    getSorting,
    setCurrentPage,
    setFilter,
    setSearchQuery,
    setSorting,
  } = useParams();

  const [activePage, setActivePage] = useState(getCurrentPage);
  const [query, setQuery] = useState(getSearchQuery);
  const [filterOption, setFilterOption] = useState<FilterOption>(getFilter);
  const [sortOption, setSortOption] = useState<SortOption>(getSorting);

  const onQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
      timerId.current = setTimeout(() => {
        setQuery(e.target.value);
        setSearchQuery(e.target.value);
      }, SEARCH_DELAY);
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );
  const handleChangeSorting = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortOption(e.target.value as SortOption);
      setSorting(e.target.value);
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );
  const handleChangePage = useCallback(
    (page: number) => {
      setActivePage(page);
      setCurrentPage(page);
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const finalRecords = useMemo<DateRecord[]>(() => {
    const filteredRecords = records.filter((record) => {
      if (query) {
        if (filterOption === FilterOption.None) {
          return true;
        } else if (filterOption === FilterOption.Address) {
          return record.address.toLowerCase().includes(query.toLowerCase());
        } else if (filterOption === FilterOption.Date) {
          return record.date.includes(query);
        } else if (filterOption === FilterOption.Phone) {
          return record.phone.includes(query);
        } else if (filterOption === FilterOption.Name) {
          return record.name.toLowerCase().includes(query.toLowerCase());
        }
      }
      return true;
    });
    const sortedRecords = filteredRecords.sort((a, b) =>
      sortRecords(a.date, b.date, sortOption)
    );
    return sortedRecords;
  }, [query, filterOption, sortOption]);

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

  const timerId = useRef<NodeJS.Timeout>(null);
  const handleChangeFilter = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilterOption(e.target.value as FilterOption);
      setFilter(e.target.value);
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    return () => {
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <input
          spellCheck={false}
          onChange={onQueryChange}
          className={styles.search_bar}
          placeholder="filter"
        />
        <div className={styles.filters}>
          Filter:{" "}
          <select onChange={handleChangeFilter} value={filterOption}>
            {Object.values(FilterOption).map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className={styles.filters}>
          Sort By:{" "}
          <select onChange={handleChangeSorting} value={sortOption}>
            {Object.values(SortOption).map((option) => (
              <option key={option}>{option}</option>
            ))}
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
            <div onClick={() => handleChangePage(0)} className={styles.page}>
              1
            </div>
          )}
          {nearPages.map((pageIndex) => (
            <div
              key={pageIndex}
              onClick={() => handleChangePage(pageIndex)}
              data-active={pageIndex === activePage}
              className={styles.page}
            >
              {pageIndex + 1}
            </div>
          ))}
          {nearPages[nearPages.length - 1] !== pages.length - 1 && (
            <div
              onClick={() => handleChangePage(pages.length - 1)}
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
