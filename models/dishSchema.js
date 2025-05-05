import mongoose from 'mongoose';

const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    ingredients: {
        type: [String],
        required: true
    },

    preparationSteps: {
        type: [String],
        required: true
    },

    cookingTime: {
        type: Number,
        required: true
    },

    origin: {
        type: String,
        required: true
    },

    spiceLevel: {
        type: String,
        enum: ['Mild', 'Medium', 'Hot'],
        required: true
    }
})

const Dish = mongoose.model('Dish', dishSchema);
module.exports = Dish;