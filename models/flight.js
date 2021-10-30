import mongoose from 'mongoose'

//optional  shortcut to the mongoose.Scheme class
const Schema = mongoose.Schema 

const flightSchema = new Schema({
  airline: {
    type:String,
    enum: ['American', 'Southwest', 'United']
  },
  airport: {
    type:String,
    enum: ['AUS','DFW','DEN','LAX','SAN'],
    default: 'DEN'
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999
  },
  departs:Date
  },{
    timestamps: true,
    default: function() {
      const date = new Date()
      const yearFromNow = date.getFullYear()+1
      date.setFullYear(addOne)
      return date
    },
  })

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}
