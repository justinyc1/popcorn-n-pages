import db from "../models/index.js";

const { User } = db;

export const createNewUser = async (username, displayName, passwordHash) => {
    await User.create({
        username: username, // username must be unique in db
        displayName: displayName,
        passwordHash: passwordHash
    })
};

export const findUserByUsername = async (username) => {
    return await User.findOne({ where: { username } });
};