"use client"
import React from "react"
import Slider from "@mui/material/Slider"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import { Button, Typography } from "@mui/material"

const RangeSlider = () => {
  function valuetext(value: number) {
    return `${value}°C`
  }
  const [value, setValue] = React.useState<number[]>([1, 500])

  const handleChange = (event: Event, newValue: number[]) => {
    setValue(newValue)
  }
  return (
    <Box
      sx={{
        mt: 2
      }}
    >
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={1}
        max={500}
      />
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent="space-between"
        sx={{
          mt: 3,
          width: "100%"
        }}
      >
        <Box>
          <Typography>
            Giá từ: {value[0]} - Giá đến: {value[1]}
          </Typography>
        </Box>
        <Box>
          <Button variant="outlined">Lọc</Button>
        </Box>
      </Stack>
    </Box>
  )
}

export default RangeSlider
