import Container from "@mui/material/Container"
import { Metadata } from "next"
import NavigationBar from "@/app/_component/NavigationBar"
import Header from "@/app/_component/Header"
import QrCode from "@/app/_component/QrCode"
import Footer from "@/app/_component/Footer"

export const metadata: Metadata = {
  title: "Pay with QR Code",
  description: "Fast and convenient payment with QR code"
}

const PageQrCode = () => {
  return (
    <Container maxWidth="lg">
      <Header />
      <NavigationBar />
      <QrCode />
      <Footer />
    </Container>
  )
}

export default PageQrCode
