import { createTransport } from "nodemailer";

const TEST_MAIL = "karl68@ethereal.email";
const PASS = "J3R1hYdGJ744Hja2K3";

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: TEST_MAIL,
    pass: PASS,
  },
});

const mailOptions = {
  from: "Servidor Node.js",
  to: TEST_MAIL,
  subject: "Mail de prueba desde Node.js",
  html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>',
};

try {
  const info = await transporter.sendMail(mailOptions);
  console.log(info);
} catch (err) {
  console.log(err);
}
