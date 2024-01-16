import "./App.css";
import { Table } from "./components/table/Table";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <Table />
    </div>
  );
}

export default App;
