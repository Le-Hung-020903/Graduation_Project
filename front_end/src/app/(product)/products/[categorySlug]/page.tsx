import React from "react"
import ProductPageContent from "@/app/_component/ProductPageContent"
import { getProductList } from "@/app/api/apiwithserver"
import { IProductListItem } from "@/app/_interfaces/product"
import { IPaganation } from "@/app/_interfaces/pagination"

interface PageProps {
  params: Promise<{ categorySlug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { categorySlug } = await params
  return {
    title: `${categorySlug} of products`,
    description: `${categorySlug} of products`
  }
}

const PageCategorySlug = async ({ params }: PageProps) => {
  const { categorySlug } = await params
  const data = await getProductList(1, 4, categorySlug)
  const pagination: IPaganation = data?.pagination
  const productList: IProductListItem[] = data?.data || []
  const categoryPath: { name: string; slug: string; depth: number }[] =
    data.breadCrumb

  const staticBreadcrumb = [
    { title: "Home", url: "/" },
    { title: "Products", url: "/products" }
  ]

  const categoryBreadcrumb = categoryPath.map((item) => ({
    title: item.name,
    url: `/products/${item.slug}`
  }))

  const fullBreadcrumb = [...staticBreadcrumb, ...categoryBreadcrumb]

  return (
    <ProductPageContent
      productList={productList}
      pagination={pagination}
      breadCrumb={fullBreadcrumb}
    />
  )
}

export default PageCategorySlug
