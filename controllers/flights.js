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
    // const newFlight = new Flight()
    req.body.departs = newFlight.departs
  }
  // const flight = new Flight(req.body)
  // flight.save(function(err) {
  //   if(err) return res.redirect('flights/new')
  // res.redirect('flights/index')
  // })

  Flight.create(req.body, function(error, flight){
    if (error) {
      console.log('Error creating has occured:', error)
      return res.redirect('/flights/new)')
    }
    return res.redirect('/flights')
  })
}

export {
  index,
  newFlight as new,
  create,
}