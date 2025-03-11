"use client"
import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import Divider from "@mui/material/Divider"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import MuiCard from "@mui/material/Card"
import { styled } from "@mui/material/styles"
import Link from "next/link"
import "../../../public/style/style.css"
import Zoom from "@mui/material/Zoom"
import FieldErrorAlert from "./FieldErrorAlert"
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRE_MESSAGE,
  NAME_RULE,
  NAME_RULE_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
  PHONE_RULE,
  PHONE_RULE_MESSAGE
} from "../utils/validators"
import { registerUserAPI } from "../api/apiwithclient"
import ButtonGoogle from "./ButtonGoogle"

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
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

export default function RegisterForm() {
  const router = useRouter()
  type Inputs = {
    fullname: string
    email: string
    phone: string
    password: string
  }
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { email, password, fullname, phone } = data
    toast
      .promise(registerUserAPI({ email, password, name: fullname, phone }), {
        pending: "Đang đăng ký..."
      })
      .then((res) => {
        if (res.success) {
          toast.success("Đăng ký tài khoản thành công!")
          router.push("/login")
        }
      })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Zoom in={true} style={{ transitionDelay: "200ms" }}>
        {/* <SignUpContainer direction="column" justifyContent="space-between"> */}
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="name">Full name</FormLabel>
              <TextField
                autoComplete="name"
                required
                fullWidth
                id="name"
                placeholder="Jon Snow"
                {...register("fullname", {
                  required: FIELD_REQUIRE_MESSAGE,
                  pattern: {
                    value: NAME_RULE,
                    message: NAME_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={"fullname"} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Phone</FormLabel>
              <TextField
                required
                fullWidth
                id="phone"
                placeholder="+84..."
                autoComplete="email"
                variant="outlined"
                {...register("phone", {
                  required: FIELD_REQUIRE_MESSAGE,
                  pattern: {
                    value: PHONE_RULE,
                    message: PHONE_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={"phone"} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                autoComplete="email"
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
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                {...register("password", {
                  required: FIELD_REQUIRE_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={"password"} />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive updates via email."
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="interceptor-loading"
            >
              Sign up
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <ButtonGoogle />

            <Typography sx={{ textAlign: "center" }}>
              Already have an account?
              <Link
                href={"/login"}
                className="hover-no-underline"
                style={{
                  color: "#128447",
                  marginLeft: "4px",
                  textUnderlineOffset: "3px",
                  cursor: "pointer",
                  transition: "text-decoration 0.3s ease"
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
        {/* </SignUpContainer> */}
      </Zoom>
    </form>
  )
}
