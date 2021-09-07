import { save, load } from 'redux-localstorage-simple'
import { Action, ThunkAction, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'

import reducer from './reducer'
import localStorage from 'redux-persist/lib/storage'
import { updateVersion } from './global/actions'
import { useMemo } from 'react'

const PERSISTED_KEYS: string[] = ['user', 'transactions', 'lists']

const persistConfig: any = {
  key: 'root',
  whitelist: PERSISTED_KEYS,
  storage: localStorage,
  stateReconciler: false,
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: persistedReducer,
  middleware: [...getDefaultMiddleware({
        thunk: true,
        immutableCheck: true,
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }), save({ states: PERSISTED_KEYS })],
  preloadedState: load({ states: PERSISTED_KEYS }),
})

store.dispatch(updateVersion())

// export function useStore(preloadedState) {
//   const store = useMemo(() => getOrCreateStore(preloadedState), [preloadedState])
//   return store
// }

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>

export default store

export const persistor = persistStore(store)
