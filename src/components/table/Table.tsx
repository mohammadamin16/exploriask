import styles from "./Table.module.css";
import records from "../../records.json";
import { useEffect, useMemo, useState } from "react";

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
const PAGE_SIZE = 10;
export const Table = () => {
  const finalRecords = useMemo<Record[]>(() => {
    return records;
  }, []);
  const [activePage, setActivePage] = useState(0);
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
  useEffect(() => {
    console.log("activePage: ", activePage);
    console.log(getNearPages(activePage, pages.length, 1));
  }, [activePage, pages]);
  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <input
          spellCheck={false}
          className={styles.search_bar}
          placeholder="query"
        />
        <div className={styles.filters}>
          Filter:{" "}
          <select>
            <option>None</option>
            <option>Filter 1</option>
            <option>Filter 2</option>
            <option>Filter 3</option>
          </select>
        </div>
        <div className={styles.filters}>
          Sort By:{" "}
          <select>
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
        {records
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
        </div>
      </div>
    </div>
  );
};
