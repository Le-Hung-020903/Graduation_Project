"use client"
import React, { useState } from "react"
import Button from "@mui/material/Button"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import Accordion from "@mui/material/Accordion"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Rating from "@mui/material/Rating"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import Image from "next/image"
import StarIcon from "@mui/icons-material/Star"
import Divider from "@mui/material/Divider"

const Expository = () => {
  const [value, setValue] = useState<number | null>(3)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3-content"
        id="panel3-header"
      >
        <Typography component="span">Đánh giá</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Stack direction={"row"} spacing={1}>
            <Box
              sx={{
                height: "50px",
                width: "50px",
                borderRadius: "50%",
                overflow: "hidden",
                backgroundColor: "#F0F0F0",
                border: "1px solid #F0F0F0"
              }}
            >
              <Image
                src="https://i.pravatar.cc/50?img=1"
                width={0}
                height={0}
                sizes="100vw"
                alt="Logo website clean food"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
            <Box sx={{ width: "100%" }}>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue)
                }}
              />
              <Box>
                <textarea
                  placeholder={"Hãy chia sẻ cảm nhận của bạn về sản phẩm..."}
                  style={{
                    resize: "none",
                    width: "100%",
                    height: "90px",
                    padding: "10px",
                    border: `1px solid ${isFocused ? "#128447" : "#CBC9C7"}`,
                    outline: "none"
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </Box>
              <Box
                sx={{ mt: "16px", display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ borderRadius: "35px" }}
                >
                  Đăng nhận xét
                </Button>
              </Box>
            </Box>
          </Stack>
          <Box>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Box
                sx={{
                  height: "45px",
                  width: "45px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  backgroundColor: "#F0F0F0",
                  border: "1px solid #F0F0F0"
                }}
              >
                <Image
                  src="https://i.pravatar.cc/45?img=2"
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt="Logo website clean food"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
              <Box>
                <Stack direction={"row"} alignItems={"center"}>
                  <Stack direction={"row"} spacing={0.5}>
                    <Typography>Hoai an,</Typography>
                    <Typography sx={{ color: "#A7A7A7" }}>
                      02 Th 08 năm 2024
                    </Typography>
                  </Stack>
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                    sx={{
                      height: "15px",
                      width: "1px",
                      backgroundColor: "black",
                      mx: "5px"
                    }}
                  />
                  <Stack
                    direction={"row"}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: "14px"
                      }
                    }}
                  >
                    <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon />
                    <StarIcon />
                    <StarIcon />
                  </Stack>
                </Stack>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "400",
                      color: "primary.main"
                    }}
                  >
                    Sản phẩm có chất lượng tuyệt vời!
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default Expository
