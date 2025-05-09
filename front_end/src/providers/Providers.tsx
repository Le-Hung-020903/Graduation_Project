"use client"
import store from "@/redux/store"
import React, { ReactNode } from "react"
import { Provider } from "react-redux"

// Cấu hình Redux- Persist
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
const persistor = persistStore(store)

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
