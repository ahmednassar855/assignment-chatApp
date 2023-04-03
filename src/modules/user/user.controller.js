import { userModel } from "../../../databases/models/user.model.js";
import { sendEmailForResetPassword } from "../../email/user.email.js";
import { catchAsyncHandler } from './../../utils/catchAsyncError.js';
import  jwt  from 'jsonwebtoken';
import bcrypt  from 'bcrypt';


export const updateUserByUserId = catchAsyncHandler(async (req, res) => {
    const { age, name , phone , photo} = req.body;
    let updatedUser = await userModel.findByIdAndUpdate({ _id: req.userData._id }, { age, name , phone , photo}, { new: true })
    res.json({ message: "updated user data sucessfully", updatedUser })
})

export const passwordToReset = catchAsyncHandler(async (req, res) => {
    const { password , confirm_password} = req.body;
    let { token } = req.params;
    jwt.verify(token, process.env.JWT_KEY_EMAIL_CONFIRMATION, async function (err, decoded) {
        if (!err) {
            if (password !== confirm_password) return res.json({ message: "passwords are not matching" })
            const hash = bcrypt.hashSync(password, Number(process.env.ROUND));
            let updatedPasswordUser = await userModel.findOneAndUpdate({ email: decoded.email }, { password:hash }, { new: true  , projection : { _id :0 , password :0}})
            res.json({ message: "success verified", updatedPasswordUser })
        } else {
            res.json({ message: "Not Verified" })
        }
    })
})

export const forgetPassword = catchAsyncHandler(async (req, res) => {
    const { email } = req.body;
    let checkEmailIsExist = await userModel.findOne({ email });
    if (!checkEmailIsExist) return res.json({ message: "This email does not exist!!!" })
    sendEmailForResetPassword({ email })
    res.json({ message: "Forget password , send email for verification" })
})
