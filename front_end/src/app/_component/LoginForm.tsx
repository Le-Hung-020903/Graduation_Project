"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Checkbox from "@mui/material/Checkbox"
import Divider from "@mui/material/Divider"
import FormLabel from "@mui/material/FormLabel"
import FormControlLabel from "@mui/material/FormControlLabel"
import MuiLink from "@mui/material/Link"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { styled } from "@mui/material/styles"
import ForgotPassword from "@/app/(auth)/login/forgotPassword"
import Zoom from "@mui/material/Zoom"
import Button from "@mui/material/Button"
import MuiCard from "@mui/material/Card"
import Link from "next/link"
import "../../../public/style/style.css"
import Image from "next/image"
import { useDispatch } from "react-redux"
import { useForm, SubmitHandler } from "react-hook-form"
import {
  FIELD_REQUIRE_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from "@/app/utils/validators"
import FieldErrorAlert from "@/app/_component/FieldErrorAlert"
import Box from "@mui/material/Box"
import { AppDispatch } from "@/redux/store"
import { loginUserAPI } from "@/redux/middlewares/userMiddlewares"
import { toast } from "react-toastify"
import ButtonGoogle from "./ButtonGoogle"

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px"
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px"
  })
}))
const LoginForm = () => {
  const [open, setOpen] = useState<boolean>(false)
  type Inputs = {
    email: string
    password: string
  }
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { email, password } = data
    toast
      .promise(dispatch(loginUserAPI({ email, password })), {
        pending: "Đang đăng nhập..."
      })
      .then((res) => {
        if (!res.error) router.push("/")
      })
  }
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Zoom in={true} style={{ transitionDelay: "200ms" }}>
        <Card variant="outlined">
          <Box sx={{ width: "29%" }}>
            <Image
              src="/images/Icon/logo.png"
              width={0}
              height={0}
              sizes="100vw"
              alt="Logo website clean food"
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2
            }}
          >
            <Box>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                error={!!errors["email"]}
                fullWidth
                variant="outlined"
                {...register("email", {
                  required: FIELD_REQUIRE_MESSAGE,
                  pattern: {
                    value: EMAIL_RULE,
                    message: EMAIL_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={"email"} />
            </Box>
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <MuiLink
                  component="button"
                  type="button"
                  onClick={handleClickOpen}
                  variant="body2"
                  sx={{ alignSelf: "baseline" }}
                >
                  Forgot your password?
                </MuiLink>
              </Box>
              <TextField
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                error={!!errors["password"]}
                {...register("password", {
                  required: FIELD_REQUIRE_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={"password"} />
            </Box>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="interceptor-loading"
            >
              Sign in
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?
              <span>
                <Link
                  href="/register"
                  className="hover-no-underline"
                  style={{
                    color: "#128447",
                    marginLeft: "4px",
                    textUnderlineOffset: "3px",
                    cursor: "pointer",
                    transition: "text-decoration 0.3s ease"
                  }}
                >
                  Sign up
                </Link>
              </span>
            </Typography>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <ButtonGoogle />
          </Box>
        </Card>
      </Zoom>
    </form>
  )
}

export default LoginForm
