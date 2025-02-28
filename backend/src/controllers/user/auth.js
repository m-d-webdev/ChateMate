import users from '../../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await users.findOne({ email }, { password: 1 });
        if (!user) return res.status(401).send("Failed to auth user");

        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect) return res.status(401).send("Failed to auth user");

        const token = jwt.sign({ _id: user._id }, process.env.JWTCODE)
        return res.status(200).json({ token })

    } catch (error) {
        return res.status(401).send("Failed to auth user")
    }
}


export const NewUser = async (req, res) => {
    try {

        const { fullName, email, password, userName } = req.body;
        const _newUser = await users.create({ fullName, email, password, userName });
        let token = jwt.sign({ _id: _newUser._id }, process.env.JWTCODE)
        return res.status(200).json({ token });

    } catch (error) {
        console.log(error);

        return res.status(500).send("failed to registed this user")
    }
}

export const CheckEmailExist = async (req, res) => {
    try {

        const { email } = req.query;
        const isExist = await users.findOne({ email }, {});

        if (isExist) return res.status(200).json({ message: "email exists", isExist: true });

        return res.status(200).json({ message: "email not  exists", isExist: false });


    } catch (error) {

        return res.status(500).send("failed to registed this user")
    }
}

export const checkUserNameExsits = async (req, res) => {
    try {

        const { userName } = req.query;
        const isExist = await users.findOne({ userName }, {});

        if (isExist) return res.status(200).json({ message: "UserName exists", isExist: true });

        return res.status(200).json({ message: "UserName not  exists", isExist: false });


    } catch (error) {

        return res.status(500).send("failed to registed this user")
    }
}

