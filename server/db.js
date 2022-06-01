const mongoose = require("mongoose")
module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    try {
        mongoose.connect(process.env.DB, connectionParams)
        console.log("Connected with database")
    } catch (error) {
        console.log(error);
        console.log("Cannot connect with database!")
    }
}
//szczegoły zalogowanego
//usunięcie konta