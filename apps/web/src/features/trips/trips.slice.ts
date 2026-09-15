import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Trip } from "./types";
import type { MockMode } from "./trips.service";


type TripState = {
    data: Trip[],
    loading: boolean,
    error: string | null
}

const initialData: TripState = {
    data: [],
    loading: false,
    error: null
}

const tripSlice = createSlice({
    name: 'trips',
    initialState: initialData,
    reducers: {
        fetchTripsRequested(state, _action: PayloadAction<{mode: MockMode}>){
            state.loading = true
            state.error = null
        },
        fetchTripsSucceeded(state, action: PayloadAction<Trip[]>){
            state.data = action.payload;
            state.loading = false;
        },
        fetchTripFailed(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.loading = false;
        }
    }
})

export const {
    fetchTripFailed,
    fetchTripsRequested,
    fetchTripsSucceeded
} = tripSlice.actions;

export default tripSlice.reducer;