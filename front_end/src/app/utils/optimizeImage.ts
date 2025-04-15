export const optimizeCloudinaryImage = (
  url: string,
  width = 200,
  height = 200
) => {
  if (url.includes("res.cloudinary.com")) {
    return url.replace(
      "/upload/",
      `/upload/w_${width},h_${height},c_fill,q_100,f_webp,e_sharpen/`
    )
  }
  return url
}
