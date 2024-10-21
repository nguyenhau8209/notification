import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import express, { json } from "express";
import dotenv from "dotenv";
dotenv.config();
process.env.GOOGLE_APPLICATION_CREDENTIALS;
import cors from "cors";
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);
console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);
app.use(
  cors({
    method: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

initializeApp({
  credential: applicationDefault(),
  projectId: "notifiapp",
});

app.post("/send", function (req, res) {
  const receivedToken = req.body.fcmToken;
  const message = {
    notification: {
      title: "Notifi",
      body: "This is a Test Notification",
    },
    token:
      "d20o-uceS8OMok7b8o7Uon:APA91bFqm7VML26b7BXyQmn0gohyEjey8t-mxsTOxaP33P08x30B1mRf-BaMjM8jGZguhWACjBs_bkSa5BOZyVbnXyMt3y8yt19MK5hPoMHXatkaPHOgGHnf_G2ot2YTuUYezQLh6E5p",
  };

  getMessaging()
    .send(message)
    .then((response) => {
      res.status(200).json({
        message: "Successfully send message",
        token: receivedToken,
      });
      console.log("Successfully sent message: ", response);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
      console.log("Error sending message: ", error);
    });
});
app.listen(3000, function () {
  console.log("App listen in port 3000");
});
