import Header from "../Layouts/Header";
import Products from "../Layouts/Products";
import Logout from "../Logout";
import styles from "./styles.module.css";

const Main = () => {
  return (
    <div className="container">
      <Header />
      <Products />
    </div>
  );
};

export default Main;
