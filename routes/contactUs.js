const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')


router.get('/',(req,res)=>{
    res.render('contactus/index',{
        errorMessage: ''
    })
})

router.post('/',(req,res)=>{
    
    
    const transporter = nodemailer.createTransport({
        
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "ad2ea67f038344",
              pass: "8962aa01ac68ff"
            }
          });
    
    const mailOptions = {
        from: req.body.email,
        to: 'dbmsg22@gmail.com',
        subject: `Message from ${req.body.name}: ${req.body.subject}`,
        text: req.body.message
    }
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log(console.error)
            res.send('something went wrong')
        } else{
            res.render('contactus/index',{
                errorMessage: 'Message Sent!'
            })
            
        }
    })
})






module.exports = router