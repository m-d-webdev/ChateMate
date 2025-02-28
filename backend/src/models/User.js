import mng from 'mongoose'
import bcrypt from 'bcryptjs'


const UserShema = new mng.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true,
            unique: true
        },
        pic: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

UserShema.pre("save", async function (next) {
    try {
        if (!this.isModified('password')) return next();
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
        return next();
    } catch (error) {
        console.log(error);
    }
})


export default mng.model("users", UserShema);