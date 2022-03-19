const mongoose = require('mongoose');





const dbConnection = async () => {
    try {

        await mongoose.connect(process.env.BD_CONN);
        // const Cat = mongoose.model('Cat', { name: String });
        // const kitty = new Cat({ name: 'Zildjian' });
        // kitty.save().then(() => console.log('meow'));
        console.log('todo ok!!!')

    } catch (error) {
        console.error(error);
        throw new Error('perrito')
    }
}

module.exports = {
    dbConnection
}