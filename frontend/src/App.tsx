import { Box, Divider } from "@mui/material";
import Container from "components/Container";
import Footer from "components/footer";
import { Outlet } from "react-router-dom";
import { StoreNavigation } from "./components/store-navigation";

function App() {
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      justifyContent={"center"}
      bgcolor={"background.default"}
    >
      <StoreNavigation />
      <Outlet />
      <Divider />
      <Container>
        <Footer />
      </Container>
    </Box>
  );
}

export default App;
