import { expect, it } from "vitest";
import reducer, 
{
    fetchTripFailed, 
    fetchTripsRequested,
    fetchTripsSucceeded
} from './trips.slice';
import { tripsFixture } from "./trips.fixture";

it('lưu danh sách và tắt loading khi thành công', () => {
    const loadingState = reducer(undefined, fetchTripsRequested({mode: 'success'}));

    const result = reducer(loadingState, fetchTripsSucceeded(tripsFixture))

    expect(result.data).toEqual(tripsFixture)
    expect(result.loading).toBe(false)
})
it('lưu danh sách thất bại', () => {
    const loadingState = reducer(undefined, fetchTripsRequested({mode: 'error'}))

    const result = reducer(loadingState, fetchTripFailed('Error !!!'))

    expect(result.error).toEqual("Error !!!")
    expect(result.loading).toBe(false)
})