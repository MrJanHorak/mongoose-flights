import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'
const router = Router()

/* GET users listing. */
router.get('/', flightsCtrl.index)
router.get('/new', flightsCtrl.new)
router.get('/:id', flightsCtrl.show)
router.post('/', flightsCtrl.create)
router.post('/:id/tickets', flightsCtrl.addTicket)
router.delete('/:id', flightsCtrl.delete)
router.delete('/:flightId/tickets/:ticketId', flightsCtrl.deleteTicket)
router.delete('/:flightId/destinations/:destinationId', flightsCtrl.deleteDestination)
router.post('/:id/destinations', flightsCtrl.addToFlight)

export {
  router
}
