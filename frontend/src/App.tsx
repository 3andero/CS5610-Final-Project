import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { StoreNavigation } from "./components/store-navigation";

function App() {
  return (
    <Box display={"flex"} flexDirection="column" justifyContent={"center"}>
      <StoreNavigation />
      <Outlet />
    </Box>
  );
}

export default App;
