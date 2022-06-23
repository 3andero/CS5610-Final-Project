import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
      Back
    </Button>
  );
};
