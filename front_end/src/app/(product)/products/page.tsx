import type { Metadata } from "next"
import React from "react"
import { getProductList } from "@/app/api/apiwithserver"
import { IProductListItem } from "@/app/_interfaces/product"
import { IPaganation } from "@/app/_interfaces/pagination"
import ProductPageContent from "@/app/_component/ProductPageContent"

export const metadata: Metadata = {
  title: "List of products",
  description: "List of products"
}

async function PageProducts() {
  const data = await getProductList(1, 6)
  const pagination: IPaganation = data?.pagination
  const productList: IProductListItem[] = data?.data || []
  const breadCrumb = [
    { title: "Home", url: "/" },
    { title: "Products", url: "/products" }
  ]

  return (
    <ProductPageContent
      productList={productList}
      pagination={pagination}
      breadCrumb={breadCrumb}
    />
  )
}

export default PageProducts
