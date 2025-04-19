"use client"
import Grid from "@mui/material/Grid"
import React, { useEffect, useState } from "react"
import { getFavoriteProductsAPI } from "../api/apiwithclient"
import { IProductListItem } from "../_interfaces/product"
import CardProduct from "./CardProduct"
import Box from "@mui/material/Box"

const FavoriteProduct = () => {
  const [listProduct, setListProduct] = useState<IProductListItem[]>([])

  useEffect(() => {
    const fetchFavoriteProductList = async () => {
      const res = await getFavoriteProductsAPI()
      const favoriteProducts = res.data.map((item: IProductListItem) => ({
        ...item,
        isFavorite: true
      }))
      setListProduct(favoriteProducts)
    }

    fetchFavoriteProductList()
  }, [])

  return (
    <Box>
      <Grid container spacing={3.5}>
        {listProduct.length > 0
          ? listProduct.map(
              (product) =>
                product && (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    key={product.id}
                    sx={{ display: "flex" }}
                  >
                    <CardProduct product={product} />
                  </Grid>
                )
            )
          : null}
      </Grid>
    </Box>
  )
}

export default FavoriteProduct
