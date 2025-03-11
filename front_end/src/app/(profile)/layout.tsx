import * as React from "react"
import type { Metadata } from "next"
import Header from "@/app/_component/Header"
import Grid from "@mui/material/Grid2"
import Box from "@mui/material/Box"
import MenuProfile from "../_component/MenuProfile"
import NavigationBar from "../_component/NavigationBar"
import Container from "@mui/material/Container"

export const metadata: Metadata = {
  title: "Profile Website Clean Food",
  description: "Clean food is always the first choice"
}
export default function ProfileLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Container maxWidth="lg">
      <Header />
      <NavigationBar />
      <Grid
        container
        spacing={2}
        sx={{
          mt: 5
        }}
      >
        <Grid
          size={{
            md: 3
          }}
        >
          <MenuProfile />
        </Grid>
        <Grid
          size={{
            md: 9
          }}
        >
          <Box>{children}</Box>
        </Grid>
      </Grid>
    </Container>
  )
}
