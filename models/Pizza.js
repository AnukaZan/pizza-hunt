const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

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
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size:{
        type: String,
        default: 'Large'
    },
    toppings: [],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false //we don't need id to be returned
}
);

//Virtuals allow us to add more information to a database response 
PizzaSchema.virtual('commentCount').get(function(){

    //use .reduce() to tally up total of every comment with its replies
    //.reduce(accumulator, currentValue)
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

//create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;