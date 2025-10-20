import { store } from "@/store";
import { useEffect, useState } from "react";

export const useStore = () => {
  const [ data , setData] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => setData(store.getState()));
    return unsubscribe;
  }, []);

  return { data, dispatch: store.dispatch.bind(store) }; 
} 