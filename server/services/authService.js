import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { sign } = jwt;
const secretString = "secret";

export const getAccessToken = (username, id) => {
    return sign(
        {username: username, id: id},
        secretString
    );
};

export const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};