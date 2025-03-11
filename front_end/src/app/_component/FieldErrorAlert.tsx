"use client"
import Alert from "@mui/material/Alert"
import React from "react"

interface FieldErrorAlertProps {
  errors: {
    [key: string]: {
      message?: string
    }
  } | null
  fieldName: string
}

const FieldErrorAlert: React.FC<FieldErrorAlertProps> = ({
  errors,
  fieldName
}) => {
  if (!errors || !errors[fieldName]) return null

  return (
    <Alert
      severity="error"
      sx={{ mt: "0.7em", ".MuiAlert-message": { overflow: "hidden" } }}
    >
      {errors[fieldName]?.message}
    </Alert>
  )
}

export default FieldErrorAlert
