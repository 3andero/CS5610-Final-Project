import { Outlet } from "react-router-dom";
import { StoreNavigation } from "./components/store-navigation";

function App() {
  return (
    <>
      <StoreNavigation />
      <Outlet />
    </>
  );
}

export default App;
