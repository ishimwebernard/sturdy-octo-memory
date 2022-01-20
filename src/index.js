var Express = require('express')
var  dotenv = require('dotenv')
var bodyParser = require('body-parser')
var cors =  require('cors')
var nodemailer = require("nodemailer")
dotenv.config()
const app = Express()

const formatEmail = ({name, email, message}) => {

            const retval = `
                Dear Songa, \n
                ${name} has sent a message!\n
                Sender Email: ${email}\n
    \n
                Message:\n
                ${message}
            `;
            return retval;
    
}


app.use(bodyParser())
app.use(cors());
app.post('/', async(req, res)=>{
    console.log(req.body)
    try{
        const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "songawebsitebot@gmail.com",
            pass: "@Songa#Logistics2022"
        }
    });
    await transporter.sendMail({
        from: process.env.PARENT_EMAIL,
        to: `jeanbosco.songa@songalogistics.com`,
        html: `
        <html>
        <h4>${req.body.name} has sent a message from ${req.body.email}</h3>
        <p>
        ${req.body.message}</p>
        </html>
        `,
        subject: "A new message from Songa Web"
    });
    console.log("Success")
return {message: 'Email sent succesfully'}   
}catch(error){
const _error = `Failed sending the email to , Please try again ...`;
console.log(error)
return {error: _error};
}
})
app.listen(process.env.PORT || 8000, ()=>{
    console.log("Server Started")
})
export default app;
