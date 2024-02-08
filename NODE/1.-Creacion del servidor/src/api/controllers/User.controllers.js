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

const { generateToken } = require("../../utils/token");
const setError = require("../../helpers/handle.error");
const randomPassword = require("../../utils/randomPassword");
const enumOk = require("../../utils/enumOk");

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
    const { id, name } = req.params;
    const userDB = await User.findById(id);

    let confirmationCode = randomCode();

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

//!--------------------------------------RESEND CODE-------------------------------------------

const resendCode = async (req, res, next) => {
  try {
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
      tls: {
        // AÑADIR ESTA PARTE PARA QUE FUCNCIONES
        rejectUnauthorized: false,
      },
    });

    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      const mailOptions = {
        from: email,
        to: req.body.email,
        subject: "Confirmation code",
        text: `Tu código es ${userExist.confirmationCode}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(404).json({
            resend: false,
          });
        } else {
          console.log("Email sent: " + info.response);
          return res.status(200).json({
            resend: true,
          });
        }
      });
    } else {
      return res.status(404).json("User not found");
    }
  } catch (error) {
    return next(setError(500, error.message || "Error general send code"));
  }
};

//!--------------------------------------VERIFICATION CODE-------------------------------------------

const checkNewUser = async (req, res, next) => {
  try {
    const { email, confirmationCode } = req.body;

    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(404).json("User not found");
    } else {
      if (confirmationCode === userExists.confirmationCode) {
        try {
          await userExists.updateOne({ check: true });

          // test de que el check a sido actualizado
          const updateUser = await User.findOne({ email });
          return res
            .status(200)
            .json({ testCheckOk: updateUser.check == true ? true : false });
        } catch (error) {
          return res.status(404).json(error.message);
        }
      } else {
        try {
          await User.findByIdAndDelete(userExists._id);

          deleteImgCloudinary(userExists.image);

          //Test de la correcta eliminacion de usuario al no verificar su código. Esto es una medida de seguridad ante bots por ejemplo.
          return res.status(200).json({
            userExists,
            check: false,
            delete: (await User.findById(userExists._id))
              ? "Error delete user"
              : "Ok delete user",
          });
        } catch (error) {
          return res
            .status(404)
            .json(error.message || "Error general delete user");
        }
      }
    }
  } catch (error) {
    return next(setError(500, error.message || "General error check code"));
  }
};

//!--------------------------------------LOGIN-------------------------------------------

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userDB = await User.findOne({ email });

    if (userDB) {
      if (bcrypt.compareSync(password, userDB.password)) {
        const token = generateToken(userDB._id, email);
        return res.status(200).json({
          user: userDB,
          token,
        });
      } else {
        return res.status(404).json("password don't match");
      }
    } else {
      return res.status(404).json("User no register");
    }
  } catch (error) {
    return next(error);
  }
};

//!--------------------------------------AUTO LOGIN-------------------------------------------

const autoLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userDB = await User.findOne({ email });

    if (userDB) {
      if (password == userDB.password) {
        const token = generateToken(userDB._id, email);
        return res.status(200).json({
          user: userDB,
          token,
        });
      } else {
        return res.status(404).json("Password don't match");
      }
    } else {
      res.status(404).json("User no register");
    }
  } catch (error) {
    return next(error);
  }
};

//!--------------------------------------CHANGE PASSWORD PRE-LOGIN-------------------------------------------

const changePassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log(req.body);
    const userDB = await User.findOne({ email });
    if (userDB) {
      const PORT = process.env.PORT;
      return res.redirect(
        307,
        `http://localhost:${PORT}/api/v1/users/sendPassword/${userDB._id}`
      );
    } else {
      return res.status(404).json("User no register");
    }
  } catch (error) {
    return next(error);
  }
};

const sendPassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDB = await User.findById(id);
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
      tls: {
        // AÑADIR ESTA PARTE PARA QUE FUCNCIONES
        rejectUnauthorized: false,
      },
    });
    let passwordSecure = randomPassword();
    console.log(passwordSecure);
    const mailOptions = {
      from: email,
      to: userDB.email,
      subject: "------",
      text: `User: ${userDB.name}. Your new login code is ${passwordSecure}. Hemos enviado esto porque tenemos una solicitud de cambio de contraseña, si no has sido tú, ponte en contacto con nosotros, gracias.`,
    };
    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);
        return res.status(404).json("don't send email and don't update user");
      } else {
        console.log("Email sent: " + info.response);
        const newPasswordBcrypt = bcrypt.hashSync(passwordSecure, 10);

        try {
          await User.findByIdAndUpdate(id, { password: newPasswordBcrypt });

          // test de que la contraseña ha sido actualizada
          const userUpdatePassword = await User.findById(id);
          if (bcrypt.compareSync(passwordSecure, userUpdatePassword.password)) {
            return res.status(200).json({
              updateUser: true,
              sendPassword: true,
            });
          } else {
            return res.status(404).json({
              updateUser: false,
              sendPassword: true,
            });
          }
        } catch (error) {
          return res.status(404).json(error.message);
        }
      }
    });
  } catch (error) {
    return next(error);
  }
};

//!--------------------------------------CHANGE PASSWORD POST-LOGIN-------------------------------------------
// se necesitará req.user que se crea en un middleware, ese necesitará la parte de verificación de token que faltaba en el util token.

const modifyPassword = async (req, res, next) => {
  console.log("req.user", req.user);

  try {
    const { password, newPassword } = req.body;
    const { _id } = req.user;

    if (bcrypt.compareSync(password, req.user.password)) {
      const newPasswordHashed = bcrypt.hashSync(newPassword, 10);

      //actualización de contraseña en MongoDB
      try {
        await User.findByIdAndUpdate(_id, { password: newPasswordHashed });

        //test en tiempo real
        const userUpdate = await User.findById(_id);
        if (bcrypt.compareSync(newPassword, userUpdate.password)) {
          return res.status(200).json({
            updateUser: true,
          });
        } else {
          return res.status(404).json({
            updateUser: false,
          });
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      return res.status(404).json("Password don't match");
    }
  } catch (error) {
    return next(error);
  }
};

//!-------------------------------------- UPDATE -------------------------------------------

const update = async (req, res, next) => {
  let catchImg = req.file?.patch;

  try {
    await User.syncIndexes();

    // se crea una nueva instancia del modelo despues de actualizar los elementos unique(indexes) del modelo

    const patchUser = new User(req.body);

    // si hay imagen, se captura y se mete en la instancia
    req.file && (patchUser.image = catchImg);

    // se especifican las claves que no permitiré cambia al usuario y me quedo con lo que tengo
    patchUser._id = req.user._id;
    patchUser.password = req.user.password;
    patchUser.rol = req.user.rol;
    patchUser.confirmationCode = req.user.confirmationCode;
    patchUser.email = req.user.email;
    patchUser.check = req.user.check;
    // para las claves enum se tiene que crear una función que recorra su array y muestre las opciones permitidas.
    // Es un util. Se usa en una condicional que revisa si lo que me da el usuario en el body coincide con los
    // valores permitidos en el array. Si está, cambio el genero, sino, me quedo con lo que tenia

    if (req.body?.gender) {
      const resultEnum = enumOk("enumGender", req.body?.gender);
      patchUser.gender = resultEnum.check ? req.body?.gender : req.user.gender;
    }

    try {
      // se actualizan las claves. Se encuentra el userById y se da la info para el Update
      await User.findByIdAndUpdate(req.user._id, patchUser);

      // Si hay imagen se tiene que borrar la anterior
      if (req.file) deleteImgCloudinary(req.user.image);

      // Se testea en RunTime

      const updateUser = await User.findById(req.user._id);

      // se usa Object.keys para sacar a las claves del objeto del req.body, para saber qué claves ha pedido actualizar
      const updateKeys = Object.keys(req.body);

      // se crea un array vacio para guardar los test
      const testUpdate = [];

      // se recorre este array para saber si las claves se han actualizado
      updateKeys.forEach((item) => {
        // con los [] accedemos al valor dentro de la clave
        if (updateUser[item] === req.body[item]) {
          // si lo que me dan es diferente de lo que tenia, le digo al user que ese item se ha actualizado,
          // si lo que me dan es igual a lo que tenia, le digo al user que esa info es igual a la que había.
          if (updateUser[item] != req.user[item]) {
            testUpdate.push({
              [item]: true,
            });
          } else {
            testUpdate.push({
              [item]: "same old info",
            });
          }
        } else {
          testUpdate.push({
            [item]: false,
          });
        }
      });

      // Para la imagen se hace diferente porque va por req.file, no por req.body como las anteiores claves.
      // solo se puede valorar si hay o no imagen

      if (req.file) {
        updateUser.image === catchImg
          ? testUpdate.push({ image: true })
          : testUpdate.push({ image: false });
      }

      return res.status(200).json({
        updateUser,
        testUpdate,
      });
      // si llega a haber error en la actualización se tiene que borrar la imagen subida.
    } catch (error) {
      if (req.file) deleteImgCloudinary(catchImg);
      return res.status(404).json(error.message);
    }
  } catch (error) {
    if (req.file) deleteImgCloudinary(catchImg);
    return next(error);
  }
};

//!-------------------------------------- DELETE -------------------------------------------

const deleteUser = async (req, res, next) => {
  try {
    const { _id, image } = req.user;
    await User.findByIdAndDelete(_id);
    if (await User.findById(_id)) {
      return res.status(404).json("User not deleted");
    } else {
      deleteImgCloudinary(image);
      return res.status(200).json("User deleted");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  registerLargo,
  registerCorto,
  sendCode,
  registerWithRedirect,
  resendCode,
  checkNewUser,
  login,
  autoLogin,
  changePassword,
  sendPassword,
  modifyPassword,
  update,
  deleteUser,
};
