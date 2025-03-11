export const formattedAmount = (amount: number): string => {
  if (amount < 0) return "Không có giá"
  return amount.toLocaleString("vi-VN")
}
