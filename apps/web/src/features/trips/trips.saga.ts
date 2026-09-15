import { call, put, takeLatest } from "redux-saga/effects";
import { fetchTrips } from "./trips.service";
import {
    fetchTripFailed,
    fetchTripsRequested, 
    fetchTripsSucceeded
} from './trips.slice';
import type {Trip} from './types';

function* fetchTripsWorker(action: ReturnType<typeof fetchTripsRequested>){
    try {
        const trips: Trip[] = yield call(fetchTrips, action.payload.mode);
        yield put(fetchTripsSucceeded(trips))
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Không thể tải chuyến xe'

        yield put(fetchTripFailed(message))
    }
}

export function* watchTrips(){
    yield takeLatest(fetchTripsRequested.type, fetchTripsWorker)
}