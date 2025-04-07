import {
    createNewUser,
    findUserByUsername, 
    getAccessToken, 
    comparePassword, 
    hashPassword 
} from '../services/userService.js';

export const registerUser = async (req, res) => {
    try {
        const {username, displayName, password } = req.body;

        const user = await findUserByUsername(username);
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const hash = await hashPassword(password);

        await createNewUser(username, displayName, hash);

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while registering the user" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await findUserByUsername(username); 
        if (!user) return res.status(404).json({ error: "Username doesn't exist"});
        
        const match = await comparePassword(password, user.passwordHash);
        if (!match) return res.status(401).json({ error: "Username or password is incorrect"});
    
        // login successful
        const accessToken = getAccessToken(user.username, user.id);
        res.status(200).json(accessToken); // pass the token to frontend
    } catch (error) {
        res.status(500).json({ error: "An error occurred while logging in the user" });
    }
};
