import React, { useCallback, useState } from "react";
import Header from "../../components/Header";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { QuillEditor } from "../../components/editor/quill-editor";
import { fileToBase64 } from "../../utils/file-to-base64";
import { FileDropzone } from "../../components/preview-image/file-dropzone";

const serviceGroupOptions = [
  {
    label: "GÓI DỊCH VỤ VỆ SINH + BẢO DƯỠNG",
    value: 1,
  },
  {
    label: "GÓI DỊCH VỤ NGOẠI THẤT",
    value: 2,
  },
  {
    label: "GÓI DỊCH VỤ NỘI THẤT",
    value: 3,
  },
];

const serviceUnitOptions = [
  {
    label: "Lần",
    value: 1,
  },
  {
    label: "Gói",
    value: 2,
  },
];
const AddService = () => {
  const [cover, setCover] = useState("");

  const handleCoverDrop = useCallback(async ([file]) => {
    const data = await fileToBase64(file);
    setCover(data);
  }, []);

  const handleCoverRemove = useCallback(() => {
    setCover(null);
  }, []);

  return (
    <>
      <div className="md:pt-24 md:px-8">
        <Header
          icon="https://i.imgur.com/1EPVEZN.png"
          size={25}
          alt=""
          title="Add New Service"
        />
        {/* Name and description*/}
        <div className="card">
          <div className="px-3 py-4">
            <form>
              <Grid container>
                <Grid xs={12} md={4}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "550", textTransform: "none" }}
                  >
                    Basic details
                  </Typography>
                </Grid>
                <Grid xs={12} md={8}>
                  <Stack spacing={3}>
                    <TextField
                      error={() => {}}
                      fullWidth
                      helperText={() => {}}
                      label="Service Name"
                      name="name"
                      onBlur={() => {}}
                      onChange={() => {}}
                      value={() => {}}
                    />
                    <div>
                      <Typography
                        color="text.secondary"
                        sx={{ mb: 2 }}
                        variant="subtitle2"
                      >
                        Description
                      </Typography>
                      <QuillEditor
                        onChange={(value) => {}}
                        placeholder="Detail something"
                        sx={{ height: 200 }}
                        value={""}
                      />
                    </div>
                  </Stack>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>

        {/* Image */}
        <div className="card mt-3">
          <div className="px-3 py-4">
            <Grid container>
              <Grid xs={12} md={4}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "550", textTransform: "none" }}
                >
                  Image
                </Typography>
              </Grid>

              <Grid xs={12} md={8}>
                <Stack spacing={3}>
                  {cover ? (
                    <Box
                      sx={{
                        backgroundImage: `url(${cover})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        borderRadius: 1,
                        height: 230,
                        mt: 3,
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        border: 1,
                        borderRadius: 1,
                        borderStyle: "dashed",
                        borderColor: "divider",
                        height: 230,
                        mt: 3,
                        p: 3,
                      }}
                    >
                      <Typography
                        align="center"
                        color="text.secondary"
                        variant="h6"
                      >
                        Select a cover image
                      </Typography>
                      <Typography
                        align="center"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                        variant="subtitle1"
                      >
                        Image used for the blog post cover and also for Open
                        Graph meta
                      </Typography>
                    </Box>
                  )}

                  {/* add photo */}
                  <div>
                    <Button
                      color="inherit"
                      disabled={!cover}
                      onClick={handleCoverRemove}
                    >
                      Remove photo
                    </Button>
                  </div>
                  <FileDropzone
                    accept={{ "image/*": [] }}
                    maxFiles={1}
                    onDrop={handleCoverDrop}
                    caption="(SVG, JPG, PNG, or gif maximum 900x400)"
                  />
                </Stack>
              </Grid>
            </Grid>
          </div>
        </div>

        {/* Types-Units & Set duration */}
        <div className="card mt-3">
          <div className="px-3 py-4">
            <Grid container>
              <Grid xs={12} md={4}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "550", textTransform: "none" }}
                >
                  Types-Units & Set duration
                </Typography>
              </Grid>

              <Grid xs={12} md={8}>
                <Stack spacing={3}>
                  <TextField
                    error={() => {}}
                    fullWidth
                    label="Types"
                    name="category"
                    onBlur={() => {}}
                    onChange={() => {}}
                    select
                    value={() => {}}
                  >
                    {serviceGroupOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    error={() => {}}
                    fullWidth
                    label="Unit"
                    name="category"
                    onBlur={() => {}}
                    onChange={() => {}}
                    select
                    value={() => {}}
                  >
                    {serviceUnitOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                   
                    error={() => {}}
                    fullWidth
                    label="Barcode"
                    name="barcode"
                    onBlur={() => {}}
                    onChange={() => {}}
                     
                    value={() => {}}
                  
                  />
                </Stack>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddService;
