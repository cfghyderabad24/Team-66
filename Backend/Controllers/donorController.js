const donorModel = require('../Models/donorModel');


const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



const payment = async (req,res) => {

    const frontend_url = '';

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
        success_url:`${frontend_url}/verify?success=true&paymentId=${newOrder._id}`,
        cancel_url:`${frontend_url}/verify?success=false&paymentId=${newOrder._id}`,
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

module.exports = {
    payment: payment,
    verifyPayment : verifyPayment,
}


