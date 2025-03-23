import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId,io } from "../lib/socket.js";

export const getUsersForSidebar=async(req,res) =>{
    try {
        const loggedInUserId= req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password")  //finds all the user but do not find the logged in user
        
        res.status(200).json(filteredUsers)
        } catch (error) {
        console.error("Error in getUserForSidebar: ",error.message);
        res.status(500).json({error:"Internal Server error"});
    }
};


export const getMessages = async (req, res) => {
    try {
      const { id: userToChatId } = req.params; // ID of the user to chat with
      const senderId = req.user._id; // ID of the logged-in user (sender)
  
      // Validate input
      if (!userToChatId || !senderId) {
        return res.status(400).json({ error: "Invalid user IDs provided." });
      }
  
      // Fetch messages between the logged-in user and the other user
      const messages = await Message.find({
        $or: [
          { senderId: senderId, receiverId: userToChatId }, // Messages sent by the logged-in user
          { senderId: userToChatId, receiverId: senderId }, // Messages received by the logged-in user
        ],
      })
     
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error in getMessages controller: ", error.message);
      res.status(500).json({ error: "Internal Server error" });
    }
  };

// export const sendMessage=async(req,res)=>{
//     try {
//         const{text,image}=req.body;
//         const {id:receiverId}=req.params;
//         const senderId=req.user._id;

//         let imageUrl;
//         if(image){
//             const uploadResponse=await cloudinary.uploader.upload(image); //upload image to the cloudinary
//             imageUrl=uploadResponse.secure_url
//         }

//         const newMessage=new Message({
//             senderId,
//             receiverId,
//             text,
//             image:imageUrl,
//         });

//         await newMessage.save();

//         // to realtime functionality goes here =>socket.io

//         const receiverSocketId=getReceiverSocketId(receiverId);
//         if(receiverSocketId){
//           io.to(receiverSocketId).emit("newMessage",newMessage);
//         }

//         res.status(201).json(newMessage)
//     } catch (error) {

//         console.log("Error in sendMessage constroller ",error.message);
//         res.status(500).json({error:"Internal server Error"})
        
//     }
// }

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image); // Upload image to Cloudinary
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // Real-time functionality with Socket.IO
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log('Error in sendMessage controller:', error.message);
    res.status(500).json({ error: 'Internal server Error' });
  }
};