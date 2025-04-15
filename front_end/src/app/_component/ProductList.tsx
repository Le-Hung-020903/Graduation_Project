"use client"
import Box from "@mui/material/Box"
import React, { useState } from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import FilterProduct from "@/app/_component/FilterProduct"
import CardProduct from "@/app/_component/CardProduct"
import { IProductListItem } from "../_interfaces/product"
import { IPaganation } from "../_interfaces/pagination"
import CircularProgress from "@mui/material/CircularProgress"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import { getProductList } from "../api/apiwithserver"

interface ProductListProps {
  Data: IProductListItem[]
  Pagination: IPaganation
}
const ProductList = ({ Data, Pagination }: ProductListProps) => {
  const [productList, setProductList] = useState<IProductListItem[]>(Data)
  const [pagination, setPagination] = useState<IPaganation>(Pagination)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)

  const handleLoadMore = async () => {
    setLoading(true)
    const data = await getProductList(currentPage + 1, 6)
    if (data) {
      setProductList([...productList, ...data.data])
      setPagination(data.pagination)
    }
    setCurrentPage(currentPage + 1)
    setLoading(false)
  }
  return (
    <Grid item md={8.5}>
      <Grid item xs={2} sx={{ ml: "auto" }}>
        <FilterProduct />
      </Grid>
      <Box sx={{ mt: 10 }}>
        <Grid container spacing={3}>
          {productList.length > 0 ? (
            productList.map(
              (product) =>
                product && (
                  <Grid item key={product.id} xs={12} sm={6} md={4} lg={4}>
                    <CardProduct product={product} />
                  </Grid>
                )
            )
          ) : (
            <Grid item xs={12}>
              <Typography align="center" sx={{ py: 4 }}>
                Không có sản phẩm nào
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>

      {/* Nếu còn trang sau, hiển thị nút "Xem thêm" */}
      {currentPage < pagination.totalPages && (
        <Stack alignItems={"center"} mt={4}>
          {loading ? (
            <CircularProgress color="success" size={"3rem"} />
          ) : (
            <Button variant="outlined" onClick={handleLoadMore}>
              Xem thêm
            </Button>
          )}
        </Stack>
      )}
    </Grid>
  )
}

export default ProductList
