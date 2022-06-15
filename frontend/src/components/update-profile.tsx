import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { appConfig } from "../config";
import {
  FurtherAction,
  useApi,
  ApiCallArgs,
} from "../view/protected/serverApi";

const validationSchema = yup.object({
  first_name: yup
    .string()
    .trim()
    .min(2, "Please enter a valid name")
    .max(50, "Please enter a valid name")
    .required("Please specify your first name"),
  last_name: yup
    .string()
    .trim()
    .min(2, "Please enter a valid name")
    .max(50, "Please enter a valid name")
    .required("Please specify your last name"),
  bio: yup.string().trim().max(500, "Should be less than 500 chars"),
  country: yup
    .string()
    .trim()
    .min(2, "Please enter a valid name")
    .max(80, "Please enter a valid name")
    .required("Please specify your country name"),
  city: yup
    .string()
    .trim()
    .min(2, "Please enter a valid name")
    .max(80, "Please enter a valid name")
    .required("Please specify your city name"),
  address: yup
    .string()
    .required("Please specify your address")
    .min(2, "Please enter a valid address")
    .max(200, "Please enter a valid address"),
});

export interface FormFields {
  first_name?: string;
  last_name?: string;
  bio?: string;
  country?: string;
  city?: string;
  address?: string;
}

const EmptyForm = () => ({
  first_name: "",
  last_name: "",
  bio: "",
  country: "",
  city: "",
  address: "",
});
export interface UpdateProfileProps {
  initialValues?: FormFields;
}

export const UpdateProfile = ({
  initialValues,
}: UpdateProfileProps): JSX.Element => {
  const handle = useApi();

  const [formVals, setFormVals] = useState<ApiCallArgs>({
    url: `${appConfig.SERVER_DOMAIN}:${appConfig.API_PORT}/user`,
    fetchOptions: {
      method: "PUT",
      body: "",
    },
  });

  const onSubmit = (newFormVal: any) => {
    console.log("submit");
    setFormVals((prev) => {
      prev.fetchOptions = {
        ...prev.fetchOptions,
        body: JSON.stringify(newFormVal),
      };
      return prev;
    });
    handle.refresh?.(formVals);
  };

  const formik = useFormik({
    initialValues: initialValues || EmptyForm(),
    validationSchema,
    onSubmit,
  });
  return (
    <FurtherAction protectedCallHandle={handle} refreshArgs={formVals}>
      <Box>
        {handle.data && <Alert severity="success">Update Succeeded!</Alert>}
        <Typography variant="h6" gutterBottom fontWeight={700}>
          Change your private information
        </Typography>
        <Typography variant={"subtitle2"} color={"text.secondary"}>
          Please read our{" "}
          <Link color={"primary"} href={"/company-terms"} underline={"none"}>
            terms of use
          </Link>{" "}
          to be informed how we manage your private data.
        </Typography>
        <Box paddingY={4}>
          <Divider />
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant={"subtitle2"}
                sx={{ marginBottom: 2 }}
                fontWeight={700}
              >
                Enter your first name
              </Typography>
              <TextField
                label="First name *"
                variant="outlined"
                name={"first_name"}
                fullWidth
                value={formik.values.first_name}
                onChange={formik.handleChange}
                error={
                  formik.touched.first_name && Boolean(formik.errors.first_name)
                }
                helperText={
                  formik.touched.first_name && formik.errors.first_name
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant={"subtitle2"}
                sx={{ marginBottom: 2 }}
                fontWeight={700}
              >
                Enter your last name
              </Typography>
              <TextField
                label="Last name *"
                variant="outlined"
                name={"last_name"}
                fullWidth
                value={formik.values.last_name}
                onChange={formik.handleChange}
                error={
                  formik.touched.last_name && Boolean(formik.errors.last_name)
                }
                helperText={formik.touched.last_name && formik.errors.last_name}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant={"subtitle2"}
                sx={{ marginBottom: 2 }}
                fontWeight={700}
              >
                Bio
              </Typography>
              <TextField
                label="Bio"
                variant="outlined"
                name={"bio"}
                multiline
                rows={5}
                fullWidth
                value={formik.values.bio}
                onChange={formik.handleChange}
                error={formik.touched.bio && Boolean(formik.errors.bio)}
                helperText={formik.touched.bio && formik.errors.bio}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant={"subtitle2"}
                sx={{ marginBottom: 2 }}
                fontWeight={700}
              >
                Country
              </Typography>
              <TextField
                label="Country *"
                variant="outlined"
                name={"country"}
                fullWidth
                value={formik.values.country}
                onChange={formik.handleChange}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant={"subtitle2"}
                sx={{ marginBottom: 2 }}
                fontWeight={700}
              >
                City
              </Typography>
              <TextField
                label="City *"
                variant="outlined"
                name={"city"}
                fullWidth
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant={"subtitle2"}
                sx={{ marginBottom: 2 }}
                fontWeight={700}
              >
                Enter your address
              </Typography>
              <TextField
                label="Address *"
                variant="outlined"
                name={"address"}
                fullWidth
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            <Grid item container xs={12}>
              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "stretched", sm: "center" }}
                justifyContent={"space-between"}
                width={1}
                margin={"0 auto"}
              >
                <Box marginBottom={{ xs: 1, sm: 0 }}>
                  <Typography variant={"subtitle2"}>
                    You may also consider to update your{" "}
                    <Link
                      color={"primary"}
                      href={"/account-billing"}
                      underline={"none"}
                    >
                      billing information.
                    </Link>
                  </Typography>
                </Box>
                <Button size={"large"} variant={"contained"} type={"submit"}>
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </FurtherAction>
  );
};
