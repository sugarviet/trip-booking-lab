import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

import tripsReducer from '../features/trips/trips.slice'
import { watchTrips } from '../features/trips/trips.saga'

function* rootSaga() {
  yield all([watchTrips()])
}

// Mỗi test có store và Saga middleware riêng.
export function createAppStore() {
  const sagaMiddleware = createSagaMiddleware()

  const store = configureStore({
    reducer: {
      app: (state = { name: 'Trip Booking Lab' }) => state,
      trips: tripsReducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  })

  const sagaTask = sagaMiddleware.run(rootSaga)
  return { store, sagaTask }
}

export const { store } = createAppStore()
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
