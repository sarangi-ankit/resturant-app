import mongoose from 'mongoose';


const menuSchema = new mongoose.Schema({
    image: {
        type:String
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: String,
        required:true
    },
     category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        // required: true
    },
},
    {
        timestamps: true
    }
);

const Menu = mongoose.models.Menu || mongoose.model('Menu', menuSchema);

export default Menu;