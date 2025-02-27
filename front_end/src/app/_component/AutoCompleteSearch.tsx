"use client"
import React from "react"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import SearchIcon from "@mui/icons-material/Search"
import InputAdornment from "@mui/material/InputAdornment"
import Box from "@mui/material/Box"

const AutoCompleteSearch = () => {
  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 }
  ]
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
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tìm kiếm sản phẩm ..."
            InputProps={{
              style: {
                height: "44px"
              },
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: "black" }} />
                </InputAdornment>
              )
            }}
            InputLabelProps={{
              style: {
                fontSize: "14px", // Điều chỉnh font-size của label
                lineHeight: "15px" // Đảm bảo label căn giữa theo chiều dọc
              }
            }}
          />
        )}
      />
    </Box>
  )
}

export default AutoCompleteSearch
