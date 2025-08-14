import User from "../models/user.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
// import { welcomeUserTemplate } from "../utils/emailTemplates.js";
// import { sendEmail } from "./email.services.js";
import responseHandler from "../utils/responseHandler.js";
import { welcomeUserTemplate } from "../utils/emailTemplates.js";
import { sendEmail } from "../utils/mail.js";
import { decode } from "punycode";
import mailService from "./email.services.js";
import { error } from "console";
const { errorResponse, notFoundResponse } = responseHandler;

const userService = {
  register: async (userData, next) => {
    // check if email already exists
    const emailExists = await User.findOne({ email: userData.email });
    if (emailExists) {
      return next(errorResponse("Email already exists", 400));
    }
    // if fresh new userData-email, then we proceed to creating our user
    // handle verificationCode to be sent to user email
    const verificationCode = crypto.randomInt(100000, 999999).toString(); //six characters randomly generated
    const verificationCodeExpiry = new Date(Date.now() + 3600000); //1hr expiry
    // handle password encryption
    const salt = await bcrypt.genSalt(10); //degree of encryption
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    // // if you want to see user pass you don't need this function below
    // const salt = await bcrypt.genSalt(10); //degree of encryption
    // const hashedPassword = await bcrypt.hash(userData.password, salt);

    // saving userdata and pass to db
    // proceed to creating our user
    const user = await User.create({
      ...userData,
      password: hashedPassword,
      verificationToken: verificationCode,
      verificationTokenExpiry: verificationCodeExpiry,
    });

    // const details = 2025(user.fullname, user.password);
    // await sendEmail({
    //   to: "rbox007@yandex.com",
    //   subject: "2025/26",
    //   message: "user.email", "user.password"
    // })
    // // proceed to sending email to user
    // const htmlBody = welcomeUserTemplate(user.fullname, user.verificationToken);
    // await sendEmail({
    //   to: user.email,
    //   subject: "Verify your account",
    //   html: htmlBody,
    // });
    // if user could not be registered, then we send a server error
    if (!user) {
      return next(errorResponse("User registration failed"));
    }
    return user; // send user to our controller
  },
  //login user
  login: async (userData, next) => {
    //find user with email from the form
    const user = await User.findOne({ email: userData.email }).select(
      "+password"
    ); //select includes the field we want to have access to, in this case the password
    if (!user) {
      return next(errorResponse("Account not found", 401));
    }
    //handle password
    const isPasswordCorrect = await bcrypt.compare(
      userData.password,
      user.password
    ); //userData.password is from the form, while user.password is the password saved about the user in the database.
    if (!isPasswordCorrect) {
      return next(errorResponse("Incorrect email or password, 402"));
    }
    return user;
  },
  authenticatedUser: async (userId, next) => {
    //get userId from our jwt decoded token
    const user = await User.findById(userId);
    if (!user) {
      return next(notFoundResponse("User not found"));
    }
    return user;
  },
  // logoutUser: async (req, res, next) => {
  //   // reset the cookie maxAge value
  //   res.cookie("userRefreshToken", "", {
  //     maxAge: 0,
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === "production",
  //     path: "/",
  //   });
  //   return true;
  // },
  // get a new accessToken when current one expires
  refreshAccessToken: async (refreshToken, next) => {
    if (!refreshToken) {
      return next(errorResponse("Refresh token is required", 401));
    }
    // verify the refresh token
    const decode = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
    if (!decode) {
      return next(errorResponse("Invalid refresh token", 401));
    }
    const user = await User.findById(decode.id);
    if (!user) {
      return next(notFoundResponse("User account not found"));
    }
    return user;
  },
  verifyUserAccount: async (data, next) => {
    // destructure data
    const { userId, verificationToken } = data;
    // find our user, and get the verificationToken/Expiry saved to the user
    const user = await User.findById(userId).select(
      "+verificationToken +verificationTokenExpiry"
    );
    if (!user) {
      return next(notFoundResponse("Account not found"));
    }
    // check if user is already verified
    if (user.isVerified) {
      return next(errorResponse("Account is already verified", 400));
    }
    // check if verificationToken saved in the database is same as the one recieved from the form
    if (user.verificationToken !== verificationToken) {
      return next(errorResponse("Invalid verification token", 400));
    }
    // check for token expiry
    if (user.verificationTokenExpiry < new Date()) {
      user.verificationToken = undefined;
      user.verificationTokenExpiry = undefined;
      await user.save();
      return next(
        errorResponse(
          "Verification token has expired, please get a new one",
          400
        )
      );
    }
    // verify user if token has not expired
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();
    return user;
  },
  resendVerificationToken: async (userId, next) => {
    const user = await User.findById(userId).select(
      "+verificationToken +verificationTokenExpiry"
    );
    if (!user) {
      return next(notFoundResponse("Account not found"));
    }
    if (user.isVerified) {
      return next(notFoundResponse("Account already verified"));
    }
    const verificationCode = crypto.randomInt(100000, 999999).toString();
    const verificationCodeExpiry = new Date(Date.now() + 3600000); //1hr
    user.verificationToken = verificationCode;
    user.verificationTokenExpiry = verificationCodeExpiry;
    await user.save();
    process.nextTick(() => {
      mailService.sendVerificationCode(user).catch(async (error) => {
        user.verificationCode = undefined;
        user.verificationTokenExpiry = undefined;
        await user.save();
        console.error("Failed to send verification token", error);
      });
    });
    return user;
  },
  forgotPassword: async (userData, next) => {
    const user = await User.findOne({ email: userData.email });
    if (!user) {
      return next(notFoundResponse("Account not found"));
    }
    // generate reset code
    const resetCode = crypto.randomInt(100000, 999999).toString();
    const resetCodeExpiry = new Date(Date.now() + 900000); //15minutes
    user.passwordResetToken = resetCode;
    user.passwordResetTokenExpiry = resetCodeExpiry;
    await user.save();
    process.nextTick(() => {
      mailService.sendPasswordResetEmail(user).catch(async (error) => {
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpiry = undefined;
        await user.save();
        console.error("Failed to send password", error);
      });
    });
    return user;
  },
  resetPassword: async (userData, next) => {
    const { email, password, confirmPassword, passwordResetToken } = userData;
    if (password !== confirmPassword) {
      return next(errorResponse("Passwords do not match", 400));
    }
    const user = await User.findOne({ email }).select(
      "+password +passwordResetToken +passwordResetTokenExpiry"
    );
    if (!user) {
      return next(notFoundResponse("Account not found with that email"));
    }
    if (
      !user.passwordResetToken ||
      user.passwordResetToken !== passwordResetToken
    ) {
      return next(errorResponse("Password reset token not found", 400));
    }
    const isPasswordSame = await bcrypt.compare(password, user.password);
    if (isPasswordSame) {
      return next(
        errorResponse("New password must be different from old password", 400)
      );
    }
    if (user.passwordResetTokenExpiry < new Date()) {
      user.passwordResetToken = undefined;
      user.passwordResetTokenExpiry = undefined;
      await user.save();
      return next(errorResponse("Password reset token has expired", 400));
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiry = undefined;
    await user.save();
    return user;
  },
  logout: async (req, res, next) => {
    req.cookie("userRefreshToken", "", {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/api/v1/auth/refresh-token",
    });
  },
};

export default userService;
