"use client"
import React, {
  useEffect,
  useOptimistic,
  useState,
  startTransition
} from "react"
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
import DoneIcon from "@mui/icons-material/Done"
import { IFormDataReview, IReviews } from "../_interfaces/reviews"
import { createReviewAPI, getReviewsAPI } from "../api/apiwithclient"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import CircularProgress from "@mui/material/CircularProgress"
import dayjs from "dayjs"
import { IPaganation } from "../_interfaces/pagination"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "@/redux/slice/userSlice"
import { toast } from "react-toastify"
interface ProductProps {
  productId: number
}

const Expository = ({ productId }: ProductProps) => {
  const user = useSelector(selectCurrentUser)
  const [loading, setLoading] = useState<boolean>(false)
  const [listComment, setListComment] = useState<IReviews[]>([])
  console.log("🚀 ~ Expository ~ listComment:", listComment)
  const [optimatic, setOptimatic] = useOptimistic<IReviews[]>(listComment)
  const [pagination, setPagination] = useState<IPaganation>({
    total: 0,
    page: 1,
    limit: 3,
    totalPages: 1
  })
  const [value, setValue] = useState<number | null>(3)
  const [content, setContent] = useState<string>("")
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const data: IFormDataReview = {
    content: content,
    rating: value ? value : 0,
    parent_id: null,
    product_id: productId
  }

  const submitComment = async () => {
    if (!user) {
      toast.warning("Yêu cần bạn đăng nhập để được nhận xét kỹ hơn !!!")
      return
    }
    const fakeId = Date.now()
    startTransition(async () => {
      const fakeComment: IReviews = {
        id: fakeId,
        content: content,
        rating: value ?? 0,
        created_at: new Date().toISOString(),
        image_url: null,
        user: {
          id: user?.id ? user?.id : 0,
          name: user?.name ? user?.name : "Người dùng",
          avatar: user.avatar ?? ""
        },
        hasPurchased: false,
        pending: true
      }

      // 👇 Thêm comment giả vào UI ngay
      setOptimatic((pre) => [fakeComment, ...pre])
      try {
        const res = await createReviewAPI(data)

        // 👇 Thay thế comment giả bằng comment thật từ server (kèm pending = false)
        setListComment((pre) => {
          const updatedComment = pre.filter((item) => item.id !== fakeId)
          return [{ ...res.data, pending: false }, ...updatedComment]
        })

        // Reset form
        setContent("")
        setValue(3)
      } catch {
        // 👇 Xóa comment giả nếu gọi API thất bại
        setOptimatic((pre) => pre.filter((item) => item.id !== fakeComment.id))
      }
    })
  }

  useEffect(() => {
    const fetchComment = async () => {
      setLoading(true)
      const res = await getReviewsAPI(productId, pagination.page, 3)
      // Cách 1: Thay thế hoàn toàn (tốt khi load lần đầu hoặc chuyển trang)
      if (pagination.page === 1) {
        setListComment(res.data)
      } else {
        // Cách 2: Chỉ thêm bình luận mới (cho chức năng phân trang)
        setListComment((pre) => {
          // Lọc ra những bình luận chưa có trong danh sách
          const newComments = res.data.filter(
            (newComment: IReviews) =>
              !pre.some((existing) => existing.id === newComment.id)
          )
          return [...pre, ...newComments]
        })
      }
      setPagination(res.pagination)
      setLoading(false)
    }
    fetchComment()
  }, [productId, pagination.page])

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3-content"
        id="panel3-header"
      >
        <Typography variant="h6">Đánh giá</Typography>
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
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
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
                onClick={submitComment}
              >
                <Button
                  className="interceptor-loading"
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
          {optimatic.length === 0 ? (
            <Typography
              sx={{
                ml: 6.5,
                mt: 4
              }}
            >
              Hãy thêm ý kiến của mọi người về sản phẩm này nha
            </Typography>
          ) : (
            optimatic.map((item) => {
              return (
                <Box
                  key={item.id}
                  sx={{
                    mt: 4,
                    opacity: item.pending ? 0.5 : 1,
                    transition: "opacity 0.3s ease"
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    {/* Khối avatar */}
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
                        src={
                          item.user.avatar ?? "/images/Icon/user-comment.png"
                        }
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt="Logo website clean food"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }}
                      />
                    </Box>

                    {/* Khối nội dung - sắp xếp theo column */}
                    <Stack direction="column" sx={{ flex: 1 }}>
                      {/* Dòng 1: Tên + ngày + số sao */}
                      <Stack
                        direction="row"
                        alignItems="center"
                        flexWrap="wrap"
                      >
                        <Stack
                          direction="row"
                          spacing={0.5}
                          alignItems="center"
                        >
                          <Typography
                            sx={{
                              textTransform: "capitalize"
                            }}
                          >
                            {item.user.name},
                          </Typography>
                          <Typography sx={{ color: "#A7A7A7" }}>
                            {dayjs(item.created_at).format(
                              "DD [Th] MM [năm] YYYY"
                            )}
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
                          direction="row"
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: "14px"
                            }
                          }}
                        >
                          {Array.from({ length: 5 }).map((_, index) => {
                            return (
                              <StarIcon
                                key={index}
                                sx={{
                                  color:
                                    index < item.rating
                                      ? "rgb(250, 175, 0)"
                                      : "#000"
                                }}
                              />
                            )
                          })}
                        </Stack>
                      </Stack>

                      {/* Dòng 2: Thông tin đã mua */}
                      {item.hasPurchased && (
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Box
                            sx={{
                              border: "2px solid",
                              borderColor: "success.main",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 20,
                              height: 20
                            }}
                          >
                            <DoneIcon
                              sx={{ fontSize: "15px", color: "primary.main" }}
                            />
                          </Box>
                          <Typography
                            component="span"
                            fontSize={15}
                            color="primary.main"
                            sx={{
                              fontWeight: "bold"
                            }}
                          >
                            Đã mua tại cửa hàng Minh Anh
                          </Typography>
                        </Stack>
                      )}

                      {/* Dòng 3: Nội dung đánh giá */}
                      <Stack
                        direction={"row"}
                        alignContent={"center"}
                        spacing={3}
                      >
                        <Typography
                          sx={{
                            fontWeight: 400,
                            mt: 2.5,
                            textTransform: "capitalize"
                          }}
                        >
                          {item.content}
                        </Typography>
                        {item.pending && (
                          <Typography sx={{ mt: 2.5, opacity: "0.5" }}>
                            đang viết...
                          </Typography>
                        )}
                      </Stack>
                    </Stack>
                  </Stack>
                </Box>
              )
            })
          )}
          {pagination.page < pagination.totalPages && (
            <Stack
              direction={"row"}
              justifyContent={"center"}
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setPagination((pre) => ({
                  ...pre,
                  page: pre.page + 1
                }))
              }}
            >
              {loading ? (
                <CircularProgress color="success" />
              ) : (
                <AddCircleOutlineIcon
                  sx={{
                    fontSize: "30px"
                  }}
                />
              )}
            </Stack>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default Expository
