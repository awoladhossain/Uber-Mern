import mongoose from "mongoose";

function connectToDb() {
    mongoose
        .connect(process.env.DB_CONNECTION_STRING)
        .then(() => {
            console.log("Connected to database");
        })
        .catch((err) => {
            console.log(err);
        });
}
export default connectToDb;
