import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { sign } = jwt;

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