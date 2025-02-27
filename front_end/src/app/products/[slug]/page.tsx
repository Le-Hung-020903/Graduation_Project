import Categories from "@/app/_component/Categories"
import NavigationBar from "@/app/_component/NavigationBar"
import Box from "@mui/material/Box"
import Image from "next/image"
import StarIcon from "@mui/icons-material/Star"
import React from "react"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import Stack from "@mui/material/Stack"
import Grid from "@mui/material/Grid2"
import AddtoCart from "@/app/_component/AddtoCart"
import FavoriteButton from "@/app/_component/FavoriteButton"
import Divider from "@mui/material/Divider"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Expository from "@/app/_component/Expository"
import CardProduct from "@/app/_component/CardProduct"

function PageDetail() {
  return (
    <Box>
      <NavigationBar />
      <Box sx={{ mt: "50px" }}>
        <Box
          sx={{
            width: "100%",
            height: "200px",
            overflow: "hidden",
            borderRadius: "10px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image
            src="/images/Icon/banner01.jpg"
            width={0}
            height={0}
            sizes="100vw"
            alt="Logo website clean food"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
        <Typography
          sx={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)", // Dịch chuyển về trung tâm
            color: "white",
            fontWeight: "bold",
            fontSize: "24px",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
          }}
        >
          nam
        </Typography>
      </Box>
      <Grid container spacing={3} sx={{ mt: "50px" }}>
        <Grid size={{ md: 4 }}>
          <Categories />
        </Grid>
        <Grid size={{ md: 8 }}>
          <Box>
            <Grid container spacing={2}>
              <Grid size={{ md: 5 }}>
                <Box
                  sx={{
                    border: "1px solid #E2E3E4",
                    borderRadius: "20px",
                    height: "410px",
                    position: "relative"
                  }}
                >
                  <Image
                    src="/images/Icon/bapcai.png"
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt="Logo website clean food"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                  <RemoveRedEyeIcon
                    sx={{
                      position: "absolute",
                      top: "10px",
                      right: "15px",
                      cursor: "pointer"
                    }}
                  />
                </Box>
              </Grid>
              <Grid size={{ md: 7 }}>
                <Typography
                  component={"h2"}
                  sx={{
                    fontSize: "36px",
                    fontWeight: "800",
                    lineHeight: "44px",
                    color: "primary.main"
                  }}
                >
                  Xà lách Búp mỡ
                </Typography>
                <Box sx={{ mt: "16px" }}>
                  <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </Box>
                <Box sx={{ mt: "16px" }}>
                  <Typography
                    component={"p"}
                    sx={{
                      fontSize: "30px",
                      fontWeight: "800",
                      lineHeight: "28px",
                      color: "primary.main"
                    }}
                  >
                    160.000 VNĐ
                  </Typography>
                </Box>
                <Box sx={{ mt: "28px" }}>
                  <Typography
                    component={"p"}
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "20px"
                    }}
                  >
                    Bất kỳ ai cũng có thể kịp thời hoặc sớm hơn. Hãy để niềm vui
                    thoát khỏi đau khổ và niềm vui cũng không thoát khỏi đau
                    khổ.
                  </Typography>
                </Box>
                <Stack direction={"row"} sx={{ my: "28px" }}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "20px",
                      color: "#757577"
                    }}
                  >
                    Đơn vị :
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "20px",
                      color: "#1D1D1F",
                      ml: "5px"
                    }}
                  >
                    Kg
                  </Typography>
                </Stack>
                <Box>
                  <AddtoCart />
                </Box>
                <Box sx={{ mt: "18px" }}>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <FavoriteButton />
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "400",
                        lineHeight: "14px",
                        color: "#757577"
                      }}
                    >
                      Thêm vào danh sách yêu thích
                    </Typography>
                  </Stack>
                </Box>
                <Divider sx={{ my: "24px" }} />
                <Stack spacing={1.5}>
                  <Stack
                    direction={"row"}
                    spacing={1}
                    sx={{
                      "& .MuiTypography-root": {
                        color: "#757577",
                        fontSize: "12px",
                        fontWeight: "400",
                        lineHeight: "16px"
                      }
                    }}
                  >
                    <Typography>Nguồn gốc xuất xứ:</Typography>
                    <Typography
                      sx={{
                        color: "#1D1D1F !important",
                        fontWeight: "500 !important"
                      }}
                    >
                      Nông trại nha trang, tỉnh khánh hoà
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    spacing={1}
                    alignItems={"center"}
                    sx={{
                      "& .MuiTypography-root": {
                        color: "#757577",
                        fontSize: "12px",
                        fontWeight: "400",
                        lineHeight: "16px"
                      }
                    }}
                  >
                    <Typography>Tiêu chuẩn/ chứng nhận:</Typography>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Box
                        sx={{
                          width: "30px",
                          height: "30px"
                        }}
                      >
                        <Image
                          src="/images/Icon/certification.png"
                          width={0}
                          height={0}
                          sizes="100vw"
                          alt="Logo website clean food"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          width: "30px",
                          height: "30px"
                        }}
                      >
                        <Image
                          src="/images/Icon/certification02.png"
                          width={0}
                          height={0}
                          sizes="100vw"
                          alt="Logo website clean food"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                          }}
                        />
                      </Box>
                    </Box>
                  </Stack>
                  <Stack
                    direction={"row"}
                    spacing={1}
                    sx={{
                      "& .MuiTypography-root": {
                        color: "#757577",
                        fontSize: "12px",
                        fontWeight: "400",
                        lineHeight: "16px"
                      }
                    }}
                  >
                    <Typography>NSX:</Typography>
                    <Typography
                      sx={{
                        color: "#1D1D1F !important",
                        fontWeight: "500 !important"
                      }}
                    >
                      20/12/2024
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    spacing={1}
                    sx={{
                      "& .MuiTypography-root": {
                        color: "#757577",
                        fontSize: "12px",
                        fontWeight: "400",
                        lineHeight: "16px"
                      }
                    }}
                  >
                    <Typography>HSD:</Typography>
                    <Typography
                      sx={{
                        color: "#1D1D1F !important",
                        fontWeight: "500 !important"
                      }}
                    >
                      20/12/2024
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              mt: "90px",
              border: "1px solid #E2E3E4",
              borderRadius: "20px",
              overflow: "hidden"
            }}
          >
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography component="span">Mô tả sản phẩm</Typography>
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography component="span">Thông tin dinh dưỡng</Typography>
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </Accordion>
            <Expository />
          </Box>
          <Box>
            <Typography
              sx={{
                mt: "89px",
                fontSize: "32px",
                fontWeight: "800",
                lineHeight: "42px",
                textAlign: "center",
                color: "primary.main"
              }}
            >
              Sản phẩm liên quan
            </Typography>
            <Grid container spacing={2} mt={"62px"}>
              <CardProduct />
              <CardProduct />
              <CardProduct />
              <CardProduct />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PageDetail
