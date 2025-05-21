/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react"
import { debounce } from "lodash"

/**
 * Hook debounce đơn giản cho hàm xử lý input.
 * @param fnToDebounce Hàm callback sẽ được debounce
 * @param delay Thời gian debounce (ms), mặc định là 500
 */
export const useDebounceFn = (
  fnToDebounce: (...args: any[]) => void,
  delay: number = 500
): ((...args: any[]) => void) => {
  // Trả lỗi luôn nếu delay nhận vào không phải number
  if (isNaN(delay)) {
    throw new Error("Delay value should be a number.")
  }

  // Tương tự cũng trả lỗi luôn nếu fnToDebounce không phải là 1 function
  if (!fnToDebounce || typeof fnToDebounce !== "function") {
    throw new Error("Debounce must have a function")
  }

  // Bọc cái thực thi debounce từ lodash vào useCallback để tránh re-render nhiều lần,
  // mà chỉ re-render khi fnToDebounce hoặc delay thay đổi (như bài hướng dẫn ở trên)
  return useCallback(debounce(fnToDebounce, delay), [fnToDebounce, delay])
}
