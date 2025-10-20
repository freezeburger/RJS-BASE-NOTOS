import { FlightDTO } from "@/core/dto/flight.dto"
import { NotificationDTO } from "@/core/dto/Notification.dto"
import { OrderDTO } from "@/core/dto/Order.dto"
import { ProductDTO } from "@/core/dto/product.dto"
import ProductService from "@/core/services/Product.service"
import { configureStore, Middleware, MiddlewareAPI, Dispatch, Action } from "@reduxjs/toolkit"

/** ---- State de l'application ---- */
interface ApplicationState {
    products: ProductDTO[]
    flights: FlightDTO[]
    orders: OrderDTO[]
    notifications: NotificationDTO[]
    lastNotification: NotificationDTO | null,
    feedback: string;
}

const InitialSate: ApplicationState = {
    flights: [],
    notifications: [],
    orders: [],
    products: [],
    lastNotification: null,
    feedback: ''
}

export enum AppAction {
    PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST',
    PRODUCT_LIST_UPDATE = 'PRODUCT_LIST_UPDATE',

    PRODUCT_DELETION_REQUEST = 'PRODUCT_DELETION_REQUEST',
    PRODUCT_DELETION_RESULT = 'PRODUCT_DELETION_RESULT'
}

/** ---- Types dérivés ---- */
type RootState = ApplicationState
type AppDispatch = Dispatch<Action<keyof typeof AppAction>>

/** ---- Middleware ---- */
// @ts-ignore
const performAsyncTaskAsMiddelware: Middleware<{}, RootState, AppDispatch> =
    (store: MiddlewareAPI<AppDispatch, RootState>) =>
        (next) =>
            async (action: Action<keyof typeof AppAction>) => {
                console.log('Middleware', action)
                next(action)
                if (action.type === AppAction.PRODUCT_LIST_REQUEST) {
                    const products = await ProductService.read();
                    store.dispatch({ type: AppAction.PRODUCT_LIST_UPDATE, payload: products })
                }
                return
            }

/** ---- Reducer ---- */
const convertActionInSynchronousState = (
    state: ApplicationState = InitialSate,
    action: Action<keyof typeof AppAction> & { payload: any }
): ApplicationState => {
    console.log('Reducer', action)

    switch (action.type) {
        case AppAction.PRODUCT_LIST_REQUEST:
            return { ...state, feedback: 'Product List is Loading' }

        case AppAction.PRODUCT_LIST_UPDATE:
            return { ...state, feedback: 'Product List Up to Date', products: action.payload }

        case AppAction.PRODUCT_DELETION_REQUEST:
            return { ...state, feedback: 'Product Has been deleted', products: state.products.filter(p => p.id !== action.payload.id) }

        default:
            return { ...state }
    }

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
