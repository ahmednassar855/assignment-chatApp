import { userModel } from "../../../databases/models/user.model.js";
import { catchAsyncHandler } from './../../utils/catchAsyncError.js';
import { sendEmail } from './../../email/user.email.js';
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'


export const signUp = catchAsyncHandler(async (req, res) => {
    const { name, email, age, phone, password, confirm_password  , profilePic} = req.body;
    let checkEmailIsExist = await userModel.findOne({ email });
    if (checkEmailIsExist) return res.json({ message: "This email is already reserved" })
    if (password !== confirm_password) return res.json({ message: "passwords are not matching" })
    const hash = bcrypt.hashSync(password, Number(process.env.ROUND));
    let newUser = new userModel({ name, email, age, phone, password: hash  , photo : profilePic})
    await newUser.save()
    res.json({ message: "Added user successfully", newUser })
    sendEmail({ email })
})

export const signIn = catchAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    let userIsExist = await userModel.findOne({ email });
    if (!userIsExist || !(await bcrypt.compare(password, userIsExist.password))) {
        return res.json({ message: "Incorrect email or password" })
    }
    userIsExist['password'] = undefined;   // delete password from userIsExist object
    if (userIsExist.confirmedEmail !== true) return res.json({ message: "Your email is not verified" })
    console.log(userIsExist.confirmedEmail);
    let token = jwt.sign({ userIsExist }, process.env.JWT_KEY)
    res.json({ message: "login successfully", token })
})

export const verifyUser = catchAsyncHandler(async (req, res) => {
    let { token } = req.params;
    jwt.verify(token, process.env.JWT_KEY_EMAIL_CONFIRMATION, async function (err, decoded) {
        if (!err) {
            let verifiedUser = await userModel.findOneAndUpdate({ email: decoded.email }, { confirmedEmail: true }, { new: true , projection : { _id :0 , password :0}})
            res.json({ message: "success verified", verifiedUser })
        } else {
            res.json({ message: "Not Verified" })
        }
    })
})
