import { Router } from "express";
import { tripsFixture } from "./trips.fixture.js";

export const tripsRouter = Router();

tripsRouter.get('/',  (_req, res) => {
    res.status(200).json({
        data: tripsFixture
    })
})

tripsRouter.get('/:id', (req, res) => {
    const id = req.params.id;

    const detailTrip = tripsFixture.find(trip => trip.id === id);

    if(!detailTrip) {
        res.status(404).json({
            message: "Không tìm thấy chuyến xe"
        })
        return;
    }

    res.status(200).json({
        data: detailTrip
    })
})