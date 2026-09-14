import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

function* rootSaga() {
  // Register feature watchers here when implementing the Redux-Saga ticket.
  yield all([])
}
const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: { app: (state = { name: 'Trip Booking Lab' }) => state },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
})
sagaMiddleware.run(rootSaga)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
