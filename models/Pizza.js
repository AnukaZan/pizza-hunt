const { Schema, model } = require('mongoose');

//data we want stored when users create a new pizza
const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size:{
        type: String,
        default: 'Large'
    },
    toppings: []
});

//create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;