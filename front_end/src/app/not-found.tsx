import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Image from "next/image"
import Link from "next/link"
import Header from "./_component/Header"
import NavigationBar from "./_component/NavigationBar"
export default function NotFound() {
  return (
    <>
      <Container maxWidth="lg">
        <Header />
        <NavigationBar />
      </Container>
      <Box
        sx={{
          mt: 2,
          backgroundImage: "url('/images/Icon/404Bg.jpeg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%",
          height: "550px",
          display: "flex",
          flexDirection: "column",

          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Box
          sx={{
            width: "400px",
            height: "450px"
          }}
        >
          <Image
            src="/images/Icon/404.png"
            width={0}
            height={0}
            sizes="100vw"
            alt="Logo website clean food"
            style={{ width: "100%", height: "auto", marginTop: "130px" }}
          />
        </Box>
        <Box
          sx={{
            textAlign: "center"
          }}
        >
          <Typography
            component={"h3"}
            sx={{
              fontFamily: "Signika Negative",
              fontWeight: "700",
              fontSize: "70px",
              color: "primary.main"
            }}
          >
            Opps, that links is broken.
          </Typography>
          <Typography
            sx={{
              mt: 3,
              mb: 6,
              fontSize: "20px",
              color: "#656565",
              "& a": {
                color: "black",
                textUnderlineOffset: "5px"
              }
            }}
          >
            Page doesn’t exist or some other error occured. Go to our
            <br />
            <Link href={"/"}>Home page</Link> or go back to
            <Link href={"/"} style={{ marginLeft: "3px" }}>
              Previous page
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  )
}
