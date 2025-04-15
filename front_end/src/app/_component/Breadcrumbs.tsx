import React from "react"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Typography from "@mui/material/Typography"
import Link from "next/link"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"

interface BreadcrumbsProps {
  breadCrumb: Array<{ title: string; url: string }>
}

const PageBreadcrumbs = ({ breadCrumb }: BreadcrumbsProps) => {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{
        "& .MuiBreadcrumbs-li:hover:not(:has(.MuiTypography-root))": {
          textDecoration: "underline",
          textDecorationColor: "gray",
          textUnderlineOffset: "4px"
        }
      }}
    >
      {breadCrumb?.map((item, index) => {
        const isLast = index === breadCrumb.length - 1

        if (isLast || !item.url) {
          return (
            <Typography key={index} sx={{ color: "black" }}>
              {item.title}
            </Typography>
          )
        }
        return (
          <Link
            href={item.url}
            key={index}
            style={{
              color: "gray",
              textDecoration: "none"
            }}
          >
            {item.title}
          </Link>
        )
      })}
    </Breadcrumbs>
  )
}

export default PageBreadcrumbs
