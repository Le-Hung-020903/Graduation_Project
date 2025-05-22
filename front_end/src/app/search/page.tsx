import React from "react"
import Container from "@mui/material/Container"
import Header from "../_component/Header"
import NavigationBar from "../_component/NavigationBar"
import SearchProduct from "../_component/SearchProduct"
import { Metadata } from "next"
import { cookies } from "next/headers"
import { searchProductDetailAPI } from "../api/apiwithserver"

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({
  searchParams
}: Props): Promise<Metadata> {
  const { q } = await searchParams
  return {
    title: `Kết quả tìm kiếm cho ${q}`
    // openGraph: {
    //   images: ["/some-specific-page-image.jpg", ...previousImages]
    // }
  }
}

const PageSearch = async ({ searchParams }: Props) => {
  const { q } = await searchParams
  const query = typeof q === "string" ? q : Array.isArray(q) ? q[0] : ""
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value ?? ""

  const breadCrumb = [
    { title: "Trang chủ", url: "/" },
    { title: `Kết quả tìm kiếm cho ${q}`, url: "/search" }
  ]
  const searchProduct = await searchProductDetailAPI(query, accessToken)

  return (
    <Container maxWidth="lg">
      <Header />
      <NavigationBar />
      <SearchProduct breadCrumb={breadCrumb} query={q} data={searchProduct} />
    </Container>
  )
}

export default PageSearch
