import Box from "@mui/material/Box"
import Image from "next/image"
import React from "react"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import Stack from "@mui/material/Stack"
import Grid from "@mui/material/Grid2"
import FavoriteButton from "@/app/_component/FavoriteButton"
import Divider from "@mui/material/Divider"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Expository from "@/app/_component/Expository"
// import CardProduct from "@/app/_component/CardProduct"
import Container from "@mui/material/Container"
import NotFound from "@/app/not-found"
import { getProductDetail } from "@/app/api/apiwithserver"
import Variants from "@/app/_component/Variants"
import "../../../../public/style/table.css"
import PageBreadcrumbs from "@/app/_component/Breadcrumbs"

interface PageProps {
  params: Promise<{ slug: string }>
}

async function PageDetail({ params }: PageProps) {
  const { slug } = await params
  const data = await getProductDetail(slug)
  const product = data.data

  const categoryPath: { name: string; slug: string; depth: number }[] =
    data.breadCrumb || []

  const categoryBreadcrumb = categoryPath?.map((item) => ({
    title: item.name,
    url: `/products/${item.slug}`
  }))

  const fullBreadcrumb = [
    { title: "Home", url: "/" },
    ...categoryBreadcrumb,
    { title: product?.name || "Sản phẩm", url: "" }
  ]

  if (data?.statusCode === 404) {
    return <NotFound />
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        px: "0 !important"
      }}
    >
      <Box>
        <Box sx={{ mt: 8 }}>
          <Box
            sx={{
              width: "100%",
              height: "250px",
              overflow: "hidden",
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              src="/images/Icon/ảnh bg.jpg"
              width={0}
              height={0}
              sizes="100vw"
              alt="Logo website clean food"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            mt: 4
          }}
        >
          <PageBreadcrumbs breadCrumb={fullBreadcrumb} />
        </Box>
        <Box
          sx={{
            mt: 4
          }}
        >
          <Box>
            <Grid container spacing={8}>
              <Grid size={{ md: 5.5 }}>
                <Box
                  sx={{
                    border: "1px solid #E2E3E4",
                    borderRadius: "20px",
                    height: "410px",
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  <Image
                    src={`${
                      product.images[0].url ? product.images[0].url : ""
                    }`}
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
              <Grid size={{ md: 6.5 }}>
                <Typography
                  component={"h2"}
                  sx={{
                    fontSize: "36px",
                    fontWeight: "800",
                    lineHeight: "44px",
                    color: "primary.main",
                    mb: "10px"
                  }}
                >
                  {product.name}
                </Typography>
                <Box>
                  <Variants data={product} />
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
                      {`${product.manufacturer.name} (${product.manufacturer.address})`}
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
                    <Typography>Tiêu chuẩn / chứng nhận:</Typography>
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
                <Typography variant="h6">Mô tả sản phẩm</Typography>
              </AccordionSummary>
              <AccordionDetails>{product.desc}</AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography variant="h6">Thông tin dinh dưỡng</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table
                    sx={{
                      borderCollapse: "separate",
                      borderSpacing: "2px" // khoảng cách giữa các hàng
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell width="50%">Thông tin</TableCell>
                        <TableCell width="50%">Giá trị</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {product.ingredients.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell width="50%">{item.name}</TableCell>
                          <TableCell width="50%">{item.info}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
            <Expository productId={product.id} />
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
              {/* <CardProduct />
              <CardProduct />
              <CardProduct />
              <CardProduct /> */}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default PageDetail
