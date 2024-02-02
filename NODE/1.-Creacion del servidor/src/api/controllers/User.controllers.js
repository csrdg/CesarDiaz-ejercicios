const randomCode = require("../../utils/randomCode");
const { deleteImgCloudinary } = require("./../../middleware/files.middleware");
const User = require("./../models/User.model");

const nodemailer = require("nodemailer");
const validator = require("validator");
const bcrypt = require("bcrypt");
const sendEmail = require("../../utils/sendEmail");
const {
  getTestEmailSend,
  setTestEmailSend,
} = require("../../states/state.data");

const dotenv = require("dotenv");
dotenv.config();

const registerLargo = async (req, res, next) => {
  let catchImg = req.file?.path;

  try {
    await User.syncIndexes();

    let confirmationCode = randomCode();

    const { email, name } = req.body;

    const userExist = await User.findOne(
      { email: req.body.email },
      { name: req.body.name }
    );
    if (!userExist) {
      const newUser = new User({ ...req.body, confirmationCode });
      if (req.file) {
        newUser.image = req.file.path;
      } else {
        newUser.image = "https://pic.onlinewebfonts.com/svg/img_181369.png";
      }
      try {
        const userSave = await newUser.save();
        if (userSave) {
          const emailEnv = process.env.EMAIL;
          const password = process.env.PASSWORD;

          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: emailEnv,
              pass: password,
            },
            tls: {
              // AÑADIR ESTA PARTE PARA QUE FUCNCIONES
              rejectUnauthorized: false,
            },
          });

          const mailOptions = {
            from: emailEnv,
            to: email,
            subject: "Confirmation code",
            text: `Tu codigo de confirmación es ${confirmationCode}, gracias por confiar en nosotros ${name}`,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              return res.status(404).json({
                user: userSave,
                confirmationCode: "error, resernd code",
              });
            }
            console.log("Email sent: " + info.response);
            return res.status(200).json({
              user: userSave,
              confirmationCode,
            });
          });
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      if (req.file) deleteImgCloudinary(catchImg);
      return res.status(409).json("this user already exist");
    }
  } catch (error) {
    if (req.file) deleteImgCloudinary(catchImg);
    return next(error);
  }
};

//!--------------------------------------componetizado-------------------------------------------

const registerCorto = async (req, res, next) => {
  let catchImg = req.file?.path;

  try {
    await User.syncIndexes();

    let confirmationCode = randomCode();

    const { email, name } = req.body;

    const userExist = await User.findOne(
      { email: req.body.email },
      { name: req.body.name }
    );
    if (!userExist) {
      const newUser = new User({ ...req.body, confirmationCode });
      if (req.file) {
        newUser.image = req.file.path;
      } else {
        newUser.image = "https://pic.onlinewebfonts.com/svg/img_181369.png";
      }
      try {
        const userSave = await newUser.save();
        if (userSave) {
          sendEmail(email, name, confirmationCode);
          setTimeout(() => {
            if (getTestEmailSend()) {
              setTestEmailSend(false);
              return res.status(200).json({
                user: userSave,
                confirmationCode,
              });
            } else {
              setTestEmailSend(false);
              return res.status(404).json({
                user: userSave,
                confirmationCode: "error, resend code",
              });
            }
          }, 1100);
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      if (req.file) deleteImgCloudinary(catchImg);
      return res.status(409).json("this user already exist");
    }
  } catch (error) {
    if (req.file) deleteImgCloudinary(catchImg);
    return next(error);
  }
};

//!--------------------------------------withRedirect-------------------------------------------

const registerWithRedirect = async (req, res, next) => {
  let catchImg = req.file?.path;

  try {
    await User.syncIndexes();

    let confirmationCode = randomCode();

    const userExist = await User.findOne(
      { email: req.body.email },
      { name: req.body.name }
    );
    if (!userExist) {
      const newUser = new User({ ...req.body, confirmationCode });
      if (req.file) {
        newUser.image = req.file.path;
      } else {
        newUser.image = "https://pic.onlinewebfonts.com/svg/img_181369.png";
      }
      try {
        const userSave = await newUser.save();
        const PORT = process.env.PORT;
        if (userSave) {
          return res.redirect(
            307,
            `http://localhost:${PORT}/api/v1/users/register/sendMail/${userSave._id}`
          );
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      if (req.file) deleteImgCloudinary(catchImg);
      return res.status(409).json("this user already exist");
    }
  } catch (error) {
    if (req.file) deleteImgCloudinary(catchImg);
    return next(error);
  }
};

//!--------------------------------------controlador al que se redirecciona-------------------------------------------

const sendCode = async (req, res, next) => {
  try {
    const { id } = req.param;
    const userDB = await User.findById(id);

    const emailEnv = process.env.EMAIL;
    const password = process.env.PASSWORD;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailEnv,
        pass: password,
      },
      tls: {
        // AÑADIR ESTA PARTE PARA QUE FUCNCIONES
        rejectUnauthorized: false,
      },
    });
    console.log(userDB);

    const mailOptions = {
      from: emailEnv,
      to: userDB.email,
      subject: "Confirmation code",
      text: `Tu codigo de confirmación es ${confirmationCode}, gracias por confiar en nosotros ${name}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(404).json({
          user: userDB,
          confirmationCode: "error, resernd code",
        });
      }
      console.log("Email sent: " + info.response);
      return res.status(200).json({
        user: userDB,
        confirmationCode: userDB.confirmationCode,
      });
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  registerLargo,
  registerCorto,
  sendCode,
  registerWithRedirect,
};
