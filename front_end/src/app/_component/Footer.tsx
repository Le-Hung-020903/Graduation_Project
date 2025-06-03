import * as React from "react"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Link from "next/link"
import Image from "next/image"
import { Stack, Typography } from "@mui/material"
import EmailIcon from "@mui/icons-material/Email"
import HomeIcon from "@mui/icons-material/Home"
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import XIcon from "@mui/icons-material/X"

const Footer = () => {
  return (
    <Box
      mb={4}
      pt={5}
      pb={6}
      sx={{
        mt: "170px",
        bgcolor: "#0a2d1a",
        color: "white",
        borderBottomLeftRadius: "15px",
        borderBottomRightRadius: "15px",
        "& a": {
          textDecoration: "none",
          color: "white"
        }
      }}
    >
      <Box>
        <Grid
          container
          spacing={3}
          ml={0}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={6} md={4}>
            <Box>
              <Box
                sx={{
                  mb: 3
                }}
              >
                <Link
                  href={"/"}
                  style={{
                    cursor: "pointer"
                  }}
                >
                  <Box>
                    <Image
                      src="/images/Icon/Logo.png"
                      width={100}
                      height={32}
                      alt="Logo website clean food"
                    />
                  </Box>
                </Link>
              </Box>
              <Box>
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <HomeIcon />
                  <Typography
                    sx={{
                      textWrap: "nowrap"
                    }}
                  >
                    Ngõ 31, Nguyễn An Ninh, Hoàng Mai, Hà Nội
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={1}
                  sx={{
                    mt: 2
                  }}
                >
                  <EmailIcon />
                  <Typography>lehung020903@gmail.com</Typography>
                </Stack>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} mt={1.5}>
            <Box>
              <Box
                sx={{
                  mb: 3
                }}
              >
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    color: "#A3C9B4",
                    fontWeight: "700"
                  }}
                >
                  Thời gian mở cửa
                </Typography>
              </Box>
              <Box>
                <Typography>Thứ hai - thứ 6: 8am - 4pm</Typography>
                <Typography
                  sx={{
                    mt: 2
                  }}
                >
                  Thứ 7: 9am - 5pm
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} mb={0.8}>
            <Box>
              <Box
                sx={{
                  mb: 3
                }}
              >
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    color: "#A3C9B4",
                    fontWeight: "700"
                  }}
                >
                  Thông tin liên quan
                </Typography>
              </Box>
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={4}
                sx={{
                  "& .MuiSvgIcon-root": {
                    cursor: "pointer"
                  }
                }}
              >
                <Box>
                  <FacebookIcon />
                </Box>
                <Box>
                  <InstagramIcon />
                </Box>
                <Box>
                  <XIcon />
                </Box>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box>
              <Box
                sx={{
                  mt: 1
                }}
              >
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    color: "#A3C9B4",
                    fontWeight: "700"
                  }}
                >
                  Đặt hàng và trả lại
                </Typography>
              </Box>
              <Box
                sx={{
                  mt: 3
                }}
              >
                <Link href={"/"}>
                  <Typography>Giúp đỡ và lời khuyên</Typography>
                </Link>
                <Link href={"/"}>
                  <Typography
                    sx={{
                      mt: 2
                    }}
                  >
                    Vận chuyển và trả lại
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box>
              <Box
                sx={{
                  mt: 6
                }}
              >
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    color: "#A3C9B4",
                    fontWeight: "700"
                  }}
                >
                  Tài khoản của tôi
                </Typography>
              </Box>
              <Box
                sx={{
                  mt: 3
                }}
              >
                <Link href={"/"}>
                  <Typography>Login</Typography>
                </Link>
                <Link href={"/"}>
                  <Typography
                    sx={{
                      mt: 2
                    }}
                  >
                    Đăng ký tài khoản
                  </Typography>
                </Link>
                <Link href={"/"}>
                  <Typography
                    sx={{
                      mt: 2
                    }}
                  >
                    Danh sách yêu thích
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box>
              <Box mt={5}>
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    color: "#A3C9B4",
                    fontWeight: "700"
                  }}
                >
                  Bản tin
                </Typography>
              </Box>
              <Box>
                <Link href={"/"}>
                  <Typography
                    sx={{
                      mt: 3
                    }}
                  >
                    Cách chọn hoa quả sao cho tươi...
                  </Typography>
                </Link>
                <Link href={"/"}>
                  <Typography
                    sx={{
                      mt: 2
                    }}
                  >
                    Làm sao để ăn uống khoa học
                  </Typography>
                </Link>
                <Link href={"/"}>
                  <Typography
                    sx={{
                      mt: 2
                    }}
                  >
                    Hãy sống 1 cách khoẻ mạnh cho bản thân
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box
        px={3}
        mt={5}
        pt={5}
        sx={{
          borderTop: "1px solid #ccc"
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <Typography
              sx={{
                mr: "3px"
              }}
            >
              Mọi thắc mắc xin liên hệ:
            </Typography>
            <Typography>
              <Link href="mailto:lehung020903@gmail.com">
                lehung020903@gmail.com
              </Link>
            </Typography>
            <Typography
              sx={{
                ml: "3px"
              }}
            >
              | Hotline: 0383 545 843
            </Typography>
          </Stack>
          <Typography>© 2025 Minh Anh. All rights reserved.</Typography>
        </Stack>
      </Box>
    </Box>
  )
}

export default Footer
