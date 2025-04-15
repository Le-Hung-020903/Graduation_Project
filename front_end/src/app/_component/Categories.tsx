import { Box, Typography } from "@mui/material"
import React from "react"
import {
  getCategoriesParentsAPI,
  getManufacturersAPI
} from "../api/apiwithserver"
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import CircleIcon from "@mui/icons-material/Circle"
import Divider from "@mui/material/Divider"
import RangeSlider from "./RangeSlider"
import Link from "next/link"
const Categories = async () => {
  const categories = await getCategoriesParentsAPI()
  const manufacturers = await getManufacturersAPI()

  return (
    <Box
      sx={{
        border: "1px solid #E2E3E4",
        borderRadius: "20px",
        p: 2
      }}
    >
      <Box
        sx={{
          mb: 2
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "primary.main",
            fontWeight: "bold",
            ml: 2
          }}
        >
          Danh mục
        </Typography>
        <List>
          {categories.data.map((item) => {
            return (
              <ListItem
                key={item.id}
                sx={{
                  cursor: "pointer"
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "30px",
                    color: "#F4C340"
                  }}
                >
                  <CircleIcon
                    sx={{
                      fontSize: "8px"
                    }}
                  />
                </ListItemIcon>
                <Link
                  href={`/products/${item.slug}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit"
                  }}
                >
                  <ListItemText primary={item.name} />
                </Link>
              </ListItem>
            )
          })}
        </List>
      </Box>
      <Divider />
      <Box
        sx={{
          mt: 3
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "primary.main",
            fontWeight: "bold",
            ml: 2
          }}
        >
          Giá
        </Typography>
        <RangeSlider />
      </Box>
      <Divider
        sx={{
          my: 4
        }}
      />
      <Box>
        <Typography
          variant="h5"
          sx={{
            color: "primary.main",
            fontWeight: "bold",
            ml: 2
          }}
        >
          Nhà sản xuất
        </Typography>
        {manufacturers.data.map((item) => {
          return (
            <ListItem
              key={item.id}
              sx={{
                cursor: "pointer"
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: "30px",
                  color: "#F4C340"
                }}
              >
                <CircleIcon
                  sx={{
                    fontSize: "8px"
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          )
        })}
      </Box>
    </Box>
  )
}

export default Categories
