import captainModel from "../models/captain.model.js";

const createCaptain = async ({
    firstname,
    lastname,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType,
}) => {
    
    if (
        !firstname ||
        !email ||
        !password ||
        !color ||
        !plate ||
        !capacity ||
        !vehicleType
    ) {
        throw new Error("All fields are required");
    }
    const captain = await captainModel.create({
        fullname: {
            firstname: firstname,
            lastname: lastname,
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType,
        },
    });
    return captain;
};
export default createCaptain;
