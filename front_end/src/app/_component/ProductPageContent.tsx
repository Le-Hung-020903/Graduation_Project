import React from "react"
import Image from "next/image"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import ProductList from "@/app/_component/ProductList"
import Categories from "@/app/_component/Categories"
import PageBreadcrumbs from "@/app/_component/Breadcrumbs"
import { IPaganation } from "../_interfaces/pagination"
import { IProductListItem } from "../_interfaces/product"

interface ProductPageContentProps {
  productList: IProductListItem[]
  pagination: IPaganation
  breadCrumb: Array<{ title: string; url: string }>
}

const ProductPageContent = ({
  productList,
  pagination,
  breadCrumb
}: ProductPageContentProps) => {
  return (
    <Box
      sx={{
        mt: 8
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "300px",
          overflow: "hidden",
          borderRadius: "15px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Image
          src="/images/Icon/anh-bg2.jpg"
          width={0}
          height={0}
          sizes="100vw"
          alt="Logo website clean food"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
      <Box
        sx={{
          my: 6
        }}
      >
        <PageBreadcrumbs breadCrumb={breadCrumb} />
      </Box>
      <Box
        sx={{
          mt: 4
        }}
      >
        <Grid container spacing={4}>
          <Grid item md={3.5}>
            <Categories />
          </Grid>
          <ProductList Data={productList} Pagination={pagination} />
        </Grid>
      </Box>
    </Box>
  )
}

export default ProductPageContent
