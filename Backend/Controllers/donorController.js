const donorModel = require('../Models/donorModel');

const bodyParser = require('body-parser');
const { createCanvas, loadImage, registerFont } = require('canvas');
const PDFDocument = require('pdfkit');
const path = require('path');
const Stripe = require('stripe');
registerFont(path.join(__dirname, 'arial.ttf'), { family: 'Arial' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



const payment = async (req,res) => {

    const frontend_url = 'http://localhost:5173';

    try{
        const newDonor = new donorModel({
            name:req.body.name,
            email:req.body.email,
            amount:req.body.amount,
            password:req.body.password,
        })

        await newDonor.save();

        const line_items = [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: `Donation from ${req.body.name}`,
                },
                unit_amount: req.body.amount * 100, // Convert amount to cents
            },
            quantity: 1,
        }];

    const session = await stripe.checkout.sessions.create({
        line_items:line_items,
        mode:'payment',
        success_url:`${frontend_url}/verify?success=true&paymentId=${newDonor._id}`,
        cancel_url:`${frontend_url}/verify?success=false&paymentId=${newDonor._id}`,
    })
    

    res.json({success:true,session_url:session.url});
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}



const verifyPayment = async (req,res) => {
    const {paymentId,success} = req.body;
    try{
        if(success=="true"){
            res.json({success:true,message:"Paid"})
        }
        else{
            await donorModel.findByIdAndDelete(paymentId);
            res.json({success:false,message:"Payment Failed"})
        }
    }
    catch(error){
        console.log(error);
    }
}





const certificate = async (req, res) => {
    const name = "Veeresh";

    try {
        const canvas = createCanvas(800, 600); // Adjust size as per your template
        const ctx = canvas.getContext('2d');
        const template = await loadImage(path.join(__dirname, 'certificate.png'));

        // Load the template onto the canvas
        ctx.drawImage(template, 0, 0, canvas.width, canvas.height);

        // Set the font
        ctx.font = '40px Arial';

        // Set text color
        ctx.fillStyle = '#A28535';

        // Define text positions
        const namePosition = { x: 300, y: 300 }; // Adjust based on your template

        // Draw the text onto the canvas
        ctx.fillText(name, namePosition.x, namePosition.y);

        // Convert the canvas to a PNG buffer
        const buffer = canvas.toBuffer('image/png');

        // Create a PDF document
        const doc = new PDFDocument({ size: [canvas.width, canvas.height] });

        // Embed the PNG image into the PDF
        doc.image(buffer, 0, 0, { width: canvas.width, height: canvas.height });

        // Create a buffer to store the PDF data
        const pdfBuffer = [];

        // Capture the data chunks as the PDF is generated
        doc.on('data', chunk => pdfBuffer.push(chunk));
        
        // End the PDF document and send the response
        doc.on('end', () => {
            const finalBuffer = Buffer.concat(pdfBuffer);

            // Set headers and send the PDF as a response
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="certificate.pdf"');
            res.send(finalBuffer);
        });

        doc.end();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating certificate.');
    }
};






module.exports = {
    payment: payment,
    verifyPayment : verifyPayment,
    certificate : certificate
}
