import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Box, Card, List, ListItem, Grid, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Container from "components/Container";

const pages = [
  {
    id: "general",
    href: "/profile",
    title: "General",
  },
  {
    id: "billing",
    href: "/profile/billing",
    title: "Billing Information",
  },
];

const _profile = (): JSX.Element => {
  const location = useLocation();
  return (
    <Box margin={{ xs: "0.5em", md: "1em 3em 3em" }}>
      <Container>
        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
          sx={{ color: "text.primary", marginBottom: { xs: "1em", md: 0 } }}
        >
          Account settings
        </Typography>
      </Container>
      <Container paddingTop={"0 !important"} marginTop={-8}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Card sx={{ boxShadow: { xs: 3, md: 0 } }}>
              <List
                disablePadding
                sx={{
                  display: { xs: "inline-flex", md: "flex" },
                  flexDirection: { xs: "row", md: "column" },
                  overflow: "auto",
                  flexWrap: "nowrap",
                  width: "100%",
                  paddingY: { xs: 3, md: 0 },
                  paddingX: { xs: 4, md: 0 },
                }}
              >
                {pages.map((item) => (
                  <ListItem
                    key={item.id}
                    disableGutters
                    sx={{
                      marginRight: { xs: 2, md: 0 },
                      flex: 0,
                      paddingX: { xs: 0, md: 3 },
                      borderLeft: {
                        xs: "none",
                        md: "2px solid transparent",
                      },
                      borderLeftColor: {
                        md:
                          location.pathname === item.href
                            ? "primary.main"
                            : "transparent",
                      },
                      bgcolor: {
                        md:
                          location.pathname === item.href
                            ? "background.level2"
                            : "transparent",
                      },
                    }}
                  >
                    <Link to={item.href} style={{ textDecoration: "none" }}>
                      <Typography
                        component={"p"}
                        variant="subtitle1"
                        noWrap
                        color={
                          location.pathname === item.href
                            ? "text.primary"
                            : "text.secondary"
                        }
                      >
                        {item.title}
                      </Typography>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
          <Grid item xs={12} md={9}>
            <Card sx={{ boxShadow: 3, padding: { xs: 4, md: 7 } }}>
              {<Outlet />}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export const ProfileView = withAuthenticationRequired(_profile);
