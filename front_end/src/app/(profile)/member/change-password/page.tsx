"use client"
import React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useRouter } from "next/navigation"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import { useForm, SubmitHandler } from "react-hook-form"
import { PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from "@/app/utils/validators"
import FieldErrorAlert from "@/app/_component/FieldErrorAlert"
import { toast } from "react-toastify"
import { changePasswordUserAPI } from "@/app/api/apiwithclient"
const PageChangePassword = () => {
  const router = useRouter()
  type Inputs = {
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    toast
      .promise(changePasswordUserAPI(data), {
        pending: "Đang đổi mật khẩu"
      })
      .then((res) => {
        if (res.success) {
          toast.success(res.message)
          router.push("/login")
        }
      })
      .catch((res) => {
        toast.error(res.message)
      })
  }

  const handleGoBack = () => {
    router.back() // Quay lại trang trước đó
  }

  return (
    <Box sx={{ p: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          onClick={handleGoBack}
          sx={{
            mb: 3, // margin bottom
            textTransform: "none", // không viết hoa chữ
            "&:hover": {
              backgroundColor: "#f5f5f5" // màu nền khi hover
            }
          }}
        >
          Quay lại
        </Button>
        <Box
          sx={{
            mt: 5
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Nhập mật khẩu hiện tại
          </Typography>
          <Box>
            <TextField
              id="standard-basic"
              label={`Nhập mật khẩu hiện tại của bạn`}
              variant="standard"
              type="password"
              sx={{
                mt: 3,
                width: "100%"
              }}
              {...register("currentPassword", {
                required: "Mật khẩu hiện tại không được bỏ trống",
                pattern: {
                  value: PASSWORD_RULE,
                  message: PASSWORD_RULE_MESSAGE
                }
              })}
            />
            <FieldErrorAlert errors={errors} fieldName={"currentPassword"} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 8 }}>
            Tạo mật khẩu mới
          </Typography>
          <Box>
            <TextField
              id="standard-basic"
              label={`Nhập mật khẩu mới của bạn`}
              variant="standard"
              type="password"
              sx={{
                mt: 2,
                width: "100%"
              }}
              {...register("newPassword", {
                required: "Mật khẩu mới không được bỏ trống",
                pattern: {
                  value: PASSWORD_RULE,
                  message: PASSWORD_RULE_MESSAGE
                },
                validate: (value) =>
                  value !== watch("currentPassword") ||
                  "Mật khẩu hiện tại không được khớp với mật khẩu mới"
              })}
            />
            <FieldErrorAlert errors={errors} fieldName={"newPassword"} />
          </Box>
          <Box>
            <TextField
              id="standard-basic"
              label={`Xác nhận lại mật khẩu`}
              variant="standard"
              type="password"
              sx={{
                mt: 3,
                width: "100%"
              }}
              {...register("confirmPassword", {
                required: "Mật khẩu xác nhận không được bỏ trống",
                pattern: {
                  value: PASSWORD_RULE,
                  message: PASSWORD_RULE_MESSAGE
                },
                validate: (value) =>
                  value === watch("newPassword") ||
                  "Mật khẩu mới phải trùng với mật khẩu xác nhận"
              })}
            />
            <FieldErrorAlert errors={errors} fieldName={"confirmPassword"} />
          </Box>
        </Box>
        <Button type="submit" variant="contained" sx={{ width: "100%", mt: 6 }}>
          Xác nhận
        </Button>
      </form>
    </Box>
  )
}

export default PageChangePassword
