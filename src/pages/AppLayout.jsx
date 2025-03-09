import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import styles from "./AppLayout.module.css";
import { useAuth } from "../contexts/FakeLoginContext";
// import { useNavigate } from "react-router-dom";
import Login from "./Login";
import User from "../components/User";
function AppLayout() {
  const { authentication } = useAuth();
  // const navigate = useNavigate();
  if (!authentication) return <Login />;
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}
export default AppLayout;
