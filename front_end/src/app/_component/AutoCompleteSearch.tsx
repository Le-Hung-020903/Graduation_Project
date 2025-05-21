"use client"
import React, { ChangeEvent, useEffect, useState } from "react"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import { useDebounceFn } from "../utils/useDebounce"
import CircularProgress from "@mui/material/CircularProgress"
import { useRouter } from "next/navigation"
import { searchProductsAPI } from "../api/apiwithclient"
import Image from "next/image"
import Stack from "@mui/material/Stack"
import { formattedAmount } from "../utils/formatMoney"

const AutoCompleteSearch = () => {
  const router = useRouter()
  interface ISearchProduct {
    id: number
    name: string
    slug: string
    price: number
    image: string
  }

  // open: điều khiển trạng thái mở/đóng của Autocomplete.
  // boards: dữ liệu từ API (kết quả gợi ý).
  // loading: hiển thị loading trong khi gọi API.
  const [loading, setLoading] = useState<boolean>(false)
  const [product, setProduct] = useState<ISearchProduct[] | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")

  // Khi Autocomplete đóng lại → xoá hết danh sách boards → tránh giữ dữ liệu cũ.
  useEffect(() => {
    if (!open) {
      setProduct(null)
    }
  }, [open])

  const handleInputSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!value) return

    try {
      setLoading(true)
      const res = await searchProductsAPI(value)
      setProduct(res.data || [])
    } catch (error) {
      console.error("Lỗi khi tìm kiếm sản phẩm:", error)
    } finally {
      setLoading(false)
    }
  }

  // Giúp tránh spam API khi gõ liên tục.
  const debouceSearchBoard = useDebounceFn(handleInputSearchChange, 1000)

  const handleSelectedBoard = (
    event: React.SyntheticEvent,
    selectedBoard: ISearchProduct | null
  ) => {
    if (selectedBoard) {
      router.push(`/${selectedBoard.slug}`)
    }
  }

  // Nhấn nút enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault() //  Chặn Autocomplete tự xử lý Enter
      router.push(`/search?q=${encodeURIComponent(inputValue.trim())}`)
    }
  }

  return (
    <Box>
      <Autocomplete
        sx={{
          width: 400,
          height: 44,
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px"
          }
        }}
        id="free-solo-2-demo"
        noOptionsText={
          !product ? "Không tìm thấy sản phẩm!" : "Không tìm thấy sản phẩm!"
        }
        // Cụm này để handle việc đóng mở phần kết quả tìm kiếm
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        // getOptionLabel: để thằng Autocomplete nó lấy title của board và hiển thị ra
        getOptionLabel={(product) => product.name}
        renderOption={(props, option) => {
          const { key, ...rest } = props
          return (
            <li key={key} {...rest}>
              <Stack
                alignItems="center"
                direction={"row"}
                spacing={3}
                width="100%"
              >
                <Image
                  src={option.image}
                  alt={option.name}
                  width={55}
                  height={55}
                  style={{ objectFit: "cover", borderRadius: "4px" }}
                />
                <Box flex="1">
                  <Box
                    style={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      textTransform: "capitalize"
                    }}
                  >
                    {option.name}
                  </Box>
                  <Box style={{ color: "red", fontSize: "13px" }}>
                    {formattedAmount(option.price)}
                  </Box>
                </Box>
              </Stack>
            </li>
          )
        }}
        // Options của Autocomplete nó cần đầu vào là 1 Array, mà boards của chúng ta ban
        // đầu cần cho null để làm cái noOptionsText ở trên nên đoạn này cần thêm cái || [] vào
        options={product || []}
        // Fix một cái warning của MUI, vì Autocomplete mặc định khi chúng ta chọn giá trị nó sẽ xảy ra sự so sánh
        // object bên dưới, và mặc dù có 2 json objects trông như nhau trong JavaScript nhưng khi compare sẽ ra false.
        // Vậy nên cần compare chuẩn với value dạng Primitive, ví dụ ở đây là dùng String _id thay vì compare toàn bộ cả cái json object board.
        // Link chi tiết: https://stackoverflow.com/a/65347275/8324172
        isOptionEqualToValue={(option, value) => option.id === value.id}
        // Loading thì đơn giản rồi nhé
        loading={loading}
        // onInputChange sẽ chạy khi gõ nội dung vào thẻ input, cần làm debounce để tránh việc bị spam gọi API
        onInputChange={(event, value) => {
          setInputValue(value)
          debouceSearchBoard(event, value)
        }}
        // onChange của cả cái Autocomplete sẽ chạy khi chúng ta select một cái kết quả (ở đây là board)
        onChange={handleSelectedBoard}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tìm kiếm sản phẩm..."
            size="small"
            onKeyDown={handleKeyDown}
            InputProps={{
              ...params.InputProps,
              style: {
                height: "44px"
              },
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress
                      sx={{ color: "primary.main" }}
                      size={30}
                    />
                  ) : // <SearchIcon sx={{ color: "black" }} />
                  null}
                  {params.InputProps.endAdornment}
                </>
              )
            }}
          />
        )}
      />
    </Box>
  )
}

export default AutoCompleteSearch
