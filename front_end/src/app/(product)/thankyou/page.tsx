import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import HomeIcon from "@mui/icons-material/Home"
import Stack from "@mui/material/Stack"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cảm ơn bạn đã đặt hàng",
  description: "Cảm ơn bạn đã mua sắm tại cửa hàng chúng tôi."
}

const PageThankyou = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          py: 8,
          px: 2
        }}
      >
        {/* Phần icon và tiêu đề */}
        <Box
          sx={{
            // bgcolor: "success.light",
            borderRadius: 3,
            p: 3,
            border: "2px solid",
            borderColor: "success.main"
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <CheckCircleIcon
              sx={{
                fontSize: 70,
                color: "success.main",
                animation: "scale 0.5s ease-in-out",
                "@keyframes scale": {
                  "0%": { transform: "scale(0)" },
                  "80%": { transform: "scale(1.2)" },
                  "100%": { transform: "scale(1)" }
                }
              }}
            />
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                color: "success.dark"
              }}
            >
              ĐẶT HÀNG THÀNH CÔNG!
            </Typography>
          </Stack>
        </Box>

        <Typography
          variant="h6"
          component="p"
          gutterBottom
          sx={{
            color: "text.secondary",
            my: 5
          }}
        >
          Đơn hàng của bạn đã được tiếp nhận thành công.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            mb: 1.5
          }}
        >
          Chúng tôi đã gửi email xác nhận với chi tiết đơn hàng đến bạn.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            mb: 4
          }}
        >
          Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ bộ phận hỗ trợ.
        </Typography>

        <Button
          variant="outlined"
          color="primary"
          size="large"
          startIcon={<HomeIcon />}
          component={Link}
          href="/"
          sx={{
            px: 5,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontSize: "1.1rem"
          }}
        >
          VỀ TRANG CHỦ
        </Button>
      </Box>
    </Container>
  )
}

export default PageThankyou
