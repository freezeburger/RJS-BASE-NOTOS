import { FlightDTO } from "@/core/dto/flight.dto"
import { NotificationDTO } from "@/core/dto/Notification.dto"
import { OrderDTO } from "@/core/dto/Order.dto"
import { ProductDTO } from "@/core/dto/product.dto"
import { Action, configureStore } from "@reduxjs/toolkit"


interface ApplicationState {
    products:ProductDTO[],
    flights:FlightDTO[],
    orders:OrderDTO[],
    notifications:NotificationDTO[]
    // 
    lastNotification: NotificationDTO | null
}

const InitialSate:ApplicationState = {
    flights:[],
    notifications:[],
    orders:[],
    products:[],
    lastNotification:null
}

/**
 * Middleware
 */
const performAsyncTaskAsMiddelware = (store:any) => (next:any) => (action:Action) => {
    console.log('Middleware',action);
    next(action)
}

/**
 * Reducer
 */
const convertActionInSynchronousState = ( 
    state:ApplicationState = InitialSate,
    action:Action
) => {
    console.log('Reducer', action);
    return {...state};
}
     
export const store = configureStore({
    preloadedState:InitialSate,
    reducer:convertActionInSynchronousState,
    middleware: (gDM) => gDM().concat(performAsyncTaskAsMiddelware as any)
})


