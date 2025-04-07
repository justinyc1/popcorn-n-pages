import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import db from "../models/index.js";

const { sign } = jsonwebtoken;
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

export const getAccessToken = (username, id) => {
    return sign(
        {username: username, id: id},
        "secret"
    );
};

export const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};