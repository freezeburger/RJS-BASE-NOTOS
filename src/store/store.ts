import { FlightDTO } from "@/core/dto/flight.dto"
import { NotificationDTO } from "@/core/dto/Notification.dto"
import { OrderDTO } from "@/core/dto/Order.dto"
import { ProductDTO } from "@/core/dto/product.dto"
import { configureStore, Middleware, MiddlewareAPI, Dispatch, Action } from "@reduxjs/toolkit"

/** ---- State de l'application ---- */
interface ApplicationState {
  products: ProductDTO[]
  flights: FlightDTO[]
  orders: OrderDTO[]
  notifications: NotificationDTO[]
  lastNotification: NotificationDTO | null
}

const InitialSate: ApplicationState = {
  flights: [],
  notifications: [],
  orders: [],
  products: [],
  lastNotification: null
}

/** ---- Types dérivés ---- */
type RootState = ApplicationState
type AppDispatch = Dispatch<Action>

/** ---- Middleware (corrigé uniquement sur le typage) ---- */
const performAsyncTaskAsMiddelware: Middleware<{}, RootState, AppDispatch> =
  (store: MiddlewareAPI<AppDispatch, RootState>) =>
  (next) =>
  (action) => {
    console.log('Middleware', action)
    return next(action)
  }

/** ---- Reducer ---- */
const convertActionInSynchronousState = (
  state: ApplicationState = InitialSate,
  action: Action
): ApplicationState => {
  console.log('Reducer', action)
  return { ...state }
}

/** ---- Store ---- */
export const store = configureStore({
  preloadedState: InitialSate,
  reducer: convertActionInSynchronousState,
  middleware: (gDM) => gDM().concat(performAsyncTaskAsMiddelware)
})

/** ---- Types utilitaires ---- */
export type Store = typeof store
export type AppGetState = Store['getState']
export type AppStoreDispatch = Store['dispatch']
