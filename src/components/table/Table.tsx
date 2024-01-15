import styles from "./Table.module.css";

export const Table = () => {
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
        <div className={styles.row}>
          <div className={styles.cell}>Jane Cooper</div>
          <div role="date" className={styles.cell}>
            1402/02/02
          </div>
          <div className={styles.cell}>09123456789</div>
          <div role="address" className={styles.cell}>
            Somewhere in the universe
          </div>
          <div className={styles.cell}>324982743</div>
        </div>
      </div>
      <div className={styles.footer}>
        <p>Showing data 1 to 8 of 256K entries</p>
        <div className={styles.pagination}>
          <div data-active={true} className={styles.page}>
            1
          </div>
          <div className={styles.page}>2</div>
          <div className={styles.page}>3</div>
        </div>
      </div>
    </div>
  );
};
