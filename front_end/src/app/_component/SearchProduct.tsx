import React from "react"
import Box from "@mui/material/Box"
import PageBreadcrumbs from "./Breadcrumbs"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { IProductListItem } from "../_interfaces/product"
import CardProduct from "./CardProduct"

type SearchProductProps = {
  breadCrumb: Array<{ title: string; url: string }>
  query: string | string[] | undefined
  data: {
    message: string
    success: boolean
    data?: IProductListItem[]
  }
}

const SearchProduct = ({ breadCrumb, query, data }: SearchProductProps) => {
  return (
    <Box
      sx={{
        mt: 8
      }}
    >
      <PageBreadcrumbs breadCrumb={breadCrumb} />
      <Typography
        variant="h6"
        sx={{
          mt: 3
        }}
      >
        TRANG TÌM KIẾM
      </Typography>
      <Divider
        sx={{
          borderColor: "primary.main"
          // Hoặc sử dụng mã màu trực tiếp: borderColor: '#ff0000'
        }}
      />
      <Typography
        variant="body2"
        sx={{
          mt: 3
        }}
      >
        {`Đã tìm thấy ${data.success ? data.data?.length : 0} kết quả phù hợp`}
      </Typography>
      {!data.success && (
        <Box
          sx={{
            mt: 10,
            textAlign: "center"
          }}
        >
          <Typography variant="h4">{`${data.message} với từ khoá ${query}`}</Typography>
        </Box>
      )}
      <Box
        sx={{
          mt: 6
        }}
      >
        <Grid container spacing={4}>
          {data.data?.map((item) => (
            <Grid item md={3} key={item.id}>
              <CardProduct product={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default SearchProduct
