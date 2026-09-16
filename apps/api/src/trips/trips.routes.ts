import { Router } from "express";
import { pool } from '../db.js'
import { tripsFixture } from "./trips.fixture.js";

export const tripsRouter = Router();

tripsRouter.get('/', async (_req, res, next) => {
    try {
      const result = await pool.query(`
        SELECT
          id,
          operator,
          origin,
          destination,
          departure_time AS "departureTime",
          price,
          available_seats AS "availableSeats"
        FROM trips
        ORDER BY departure_time, id
      `)
  
      res.status(200).json({ data: result.rows })
    } catch (error) {
      next(error)
    }
})

tripsRouter.get('/:id', async(req, res, next) => {
    const id = req.params.id;

    try {
        const result = await pool.query('SELECT id, operator, origin, destination, departure_time as "departureTime", price, available_seats as "availableSeats" from trips where id=$1', [id]);

        if(!result.rows[0]) {
            res.status(404).json({
                message: "Không tìm thấy chuyến xe"
            })
            return;
        }

        res.status(200).json({
            data: result.rows[0]
        })
    } catch (error) {
     next(error)   
    }
})