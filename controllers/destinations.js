import { Destination } from '../models/destination.js'

function newDestination(req, res) {
  Destination.find({}, function (error, destinations) {
    res.render('destinations/new', {
      destinations,
      error: req.body.error ? rec.body.error : error
    })
  })
}

function create(req, res) {
  Destination.findOne({airport: req.body.airport}, function(error, destination) {
    if (destination === null) {
      Destination.create(req.body, function (error, destination){
        res.redirect('/destinations/new')
      })
    } else {
      res.redirect('/destinations/new?error=true')
    }
  })
}

export {
  newDestination as new,
  create
}