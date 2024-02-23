const Chat = require("../models/Chat.model");
const Flyer = require("../models/Flyer.model");
const Message = require("../models/Message.model");
const TimeAccount = require("../models/TimeAccount.model");
const User = require("../models/User.model");

const createMessage = async (req, res, next) => {
  try {
    const { owner, type, content } = req.body;
    const { idRecipient } = req.params;

    const findUser = await User.findById(idRecipient);
    const findFlyer = await Flyer.findById(idRecipient);
    const findTimeAccoount = await TimeAccount.findById(idRecipient);
    //si no encuentra nada devuelve un null

    if (findUser) {
      const newMessage = new Message(req.body);
      // crea nuevo message con lo que viene del body

      const savedMessage = await newMessage.save();
      // guarda ese mensaje recien creado

      //se tendrán que evaluar las dos posibilidades de message.type
      if (type == "private") {
        // los mensajes privados se iran al chat. hay que ver si ya existia un chat o se empezará uno.
        // Intenta encontrar uno existente o crea uno nuevo. trycatch

        try {
          // puede que el user logged hubiera empezado un chat o que lo hubiera hecho el otro user
          const chatExistOne = await Chat.findOne({
            userOne: req.user._id, // user logged
            userTwo: findUser._id, // another user
          });
          const chatExistTwo = await Chat.findOne({
            userOne: findUser._id,
            userTwo: req.user._id,
          });
          console.log(chatExistOne);
          console.log(chatExistTwo);

          if (chatExistOne != null || chatExistTwo != null) {
            // si alguno de los dos no es null, existe y actualizamos dicho chat con el nuevo mensaje, asi que trycatch

            if (chatExistOne) {
              try {
                await chatExistOne.updateOne({
                  $push: { messages: newMessage._id }, // se popula messages en Chat
                });
                return res.status(200).json({
                  chat: await Chat.findById(chatExistOne._id),
                  comment: newMessage,
                });
              } catch (error) {
                // error de actualización y por tanto trycatch
                try {
                  // intenta encontrar y eliminar el mensaje
                  await Message.findByIdAndDelete(savedMessage._id);
                  return res
                    .status(404)
                    .json("Error update chat. Message deleted");
                } catch (error) {
                  // falla miserablemente
                  return res.status(404).json({
                    idCommentNotDeleted: newMessage._id,
                    error: "Error update chat. Error deleting message",
                  });
                }
              }
            } else if (chatExistTwo) {
              // se especifica el otro caso
              try {
                await chatExistTwo.updateOne({
                  $push: { messages: newMessage._id }, // se ¿popula? messages en Chat
                });
                return res.status(200).json({
                  chat: await Chat.findById(chatExistOne._id),
                  comment: newMessage, //podría llamar a esto message en lugar de comment? ya que será parte de un chat???
                });
              } catch (error) {
                // error de actualización y por tanto trycatch
                try {
                  // intenta encontrar y eliminar el mensaje
                  await Message.findByIdAndDelete(savedMessage._id);
                  return res
                    .status(404)
                    .json("Error update chat. Message deleted");
                } catch (error) {
                  // falla miserablemente
                  return res
                    .status(404)
                    .json("Error update chat. Error deleting message");
                }
              }
            }
          } else {
            // si los dos son null y no existe chat. Se crea un nuevo chat
            const newChat = new Chat({
              userOne: req.user._id, // en este caso el user logged pasa a ser el owner del message???
              userTwo: findUser._id,
              messages: [savedMessage._id],
            });

            try {
              await newChat.save();
              return res.status(200).json({
                chat: newChat,
                comment: newMessage,
              });
            } catch (error) {
              // se anida trycatch en el error para capturar dos posible errores.
              // no chat y no message || no chat y si message
              try {
                await Message.findByIdAndDelete(savedMessage._id);
                return res
                  .status(404)
                  .json("No se ha creado Chat. Mensaje borrado");
              } catch (error) {
                return res
                  .status(404)
                  .json("No se ha creado chat. No se ha borrado el mensaje");
              }
            }
          }
          // LA RAZON POR LA QUE SE CONFIGURAN PRIMERO LOS CATCH ES PORQUE SINO UNO SE PUTO PIERDE Y YA NO SABE DE QUE TRY ES ESTE CATCH
        } catch (error) {
          return res.status(404).json(error.message);
        }
      } else if (type == "public") {
        //pendiente de terminar
      } else {
        // si no entra en private ni public no es nada. ELIMINAR
        await Message.findByIdAndDelete(savedMessage._id);
        return res.status(404).json(error.message);
      }
    } else if (findFlyer) {
    } else if (findTimeAccoount) {
    } else {
      // si no es ninguna de las anteriores, no es un id que pertenezca a nada que tenemos
      return res.status(404).json("Invalid ID");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = { createMessage };

//! ----------------------------------------- POR SI TODO SE JODE EN BANCO DE TIEMPO -----------

// } else if (type == "public") {
//   // --------------------------------mensaje publico se convierte en review --------------------------
//   try {
//     await User.findByIdAndUpdate(req.user._id, {
//       $push: {
//         reviwedForYou: newMessage._id, //----------------> Añadir reviewedForYou en User.model con ref "Message"
//       },
//     });
//     try {
//       await User.findByIdAndUpdate(idRecipient, {
//         $push: {
//           reviewedByOthers: newMessage._id, //----------------> Añadir reviewedByOthers en User.model con ref "Message"
//         },
//       });

//       return res.status(200).json({
//         userReviewer: await User.findById(req.user._id).populate([
//           {
//             path: "reviews",
//             model: Review,
//             populate: "reviews UserOne UserTwo",
//           },
//         ]),
//         userReviewed: await User.findById(idRecipient),
//         review: newMessage._id,
//       });
//     } catch (error) {
//       return res.status(404).json({
//         error: "Catch error updating reviewed by others",
//         message: error.message,
//       });
//     }
//   } catch (error) {
//     return res.status(404).json({
//       error: "Catch error updating reviewed for you",
//       message: error.message,
//     });
//   }
// } else {
//   await Message.findByIdAndDelete(savedMessage._id);
//   return res.status(404).json(error.message);
// }
// }
// } catch (error) {
// return res.status(404).json({ error: "zopenca", message: error.message });
// }
// };

// module.exports = { createMessage };
