import {Flight} from '../models/flight.js'
import {Destination} from '../models/destination.js'

function index(req, res) {
  
  Flight.find({}).sort({departs: 'asc'}).exec(function(error, flights) {
    if (error) return res.render('movies/index', flights)
    res.render('flights/index', {flights})
  })
}

function newFlight(req, res) {
  res.render('flights/new')
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
	}
  if (req.body.departs === null) {
    const newFlight = new Flight();
  // Obtain the default date
    const dt = newFlight.departs;
  // Format the date for the value attribute of the input
    const departsDate = dt.toISOString().slice(0, 16);
  res.render('flights/new', {departsDate});
    req.body.departs = newFlight.departs
  }


  Flight.create(req.body, function(error, flight){
    if (error) {
      console.log('Error creating has occured:', error)
      return res.redirect('/flights/new)')
    }
    return res.redirect(`/flights/${flight._id}`)
  })
}

function show(req,res) {
  console.log(Flight.findById(req.params.id))
  Flight.findById(req.params.id)
  .populate("destinations")
  .exec(function(err, flight) {
    Destination.find({_id: {$nin: flight.destinations}}, function(err, destinationsNotinList){
        console.log("Following error has popped up:", err)
        res.render('flights/show',{
          flight,
          destinationsNotinList
        })
      })
  })
}

function addTicket(req,res){
  console.log('I am adding a ticket')
  Flight.findById(req.params.id,
    function(error,flight){
      flight.tickets.push(req.body)
      flight.save(function(error){
        res.redirect(`/flights/${flight._id}`)
      
    })
})
}

function deleteFlight(req,res){
  Flight.findByIdAndDelete(req.params.id, function(error, flight){
    res.redirect("/flights")
  })
}

function deleteTicket(req,res){
  console.log('I am deleting a ticket')
  console.log(req.params)
  Flight.findById(req.params.flightId, function(error, flight){
    console.log("flight tickets",req.params.ticketId)
    flight.tickets.remove({_id:  req.params.ticketId})
    flight.save(function(error, flight) {
      res.redirect(`/flights/${flight._id}`)
      console.log(error)
    })
  })
}

function addToFlight(req,res){
  console.log('adding destination to flight')
  console.log(req.params.id)
  Flight.findById(req.params.id, function(err,flight){
    flight.destinations.push(req.body.destinationId)
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function deleteDestination(req,res){
  console.log('deleting destination')
  Flight.findById(req.params.flightId, function(error, flight){
    console.log("flight tickets",req.params.destinationId)
    flight.destinations.remove({_id:  req.params.destinationId})
    flight.save(function(error, flight) {
      res.redirect(`/flights/${flight._id}`)
      console.log(error)
    })
  })
}

export {
  index,
  newFlight as new,
  create,
  show,
  addTicket,
  deleteFlight as delete,
  deleteTicket,
  addToFlight,
  deleteDestination
}