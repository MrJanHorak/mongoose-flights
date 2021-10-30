import {Flight} from '../models/flight.js'

function index(req, res) {
  Flight.find({}, function(error, flights) {
    if (error) return res.render('movies/index', flights)
    res.render('flights/index', {flights})
  })
}

function newFlight(req, res) {
  res.render('flights/new')
}

function create(req, res) {
  if (requestIdleCallback.body.departs === null) {
    const test = new Flight()
    req.body.departs = test.departs
  }
  const flight = new Flight(req.body)
  flight.save(function(err) {
    if(err) return res.redirect('/flights/new')
    res.redirect('flights/index', {flights})
  })
}

export {
  index,
  newFlight as new,
  create,
}