import {Flight} from '../models/flight.js'

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
    return res.redirect('/flights')
  })
}

function show(req,res) {
  Flight.findById(req.params.id,
  function(error, flight){
    console.log("Following error has popped up:", error)
    res.render('flights/show',{
      flight
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
  Flight.tickets.findByIdAndDelete(req.params.id, function(error, flight){
    res.redirect(`/flights/${flight._id}`)
  })
}

export {
  index,
  newFlight as new,
  create,
  show,
  addTicket,
  deleteFlight as delete,
  deleteTicket
}