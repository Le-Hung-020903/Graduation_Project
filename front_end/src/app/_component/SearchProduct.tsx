import React from "react"
import Box from "@mui/material/Box"
import PageBreadcrumbs from "./Breadcrumbs"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"

type SearchProductProps = {
  breadCrumb: Array<{ title: string; url: string }>
  query: string | string[] | undefined
}

const SearchProduct = ({ breadCrumb, query }: SearchProductProps) => {
  console.log("query", query)

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
        Đã tìm thấy 4 kết quả phù hợp
      </Typography>
    </Box>
  )
}

export default SearchProduct
