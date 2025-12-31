// server.js - Backend API endpoint for warranty registration with Mailchimp
// This should be deployed on your server (Node.js/Express example)

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// ========================================
// MAILCHIMP CONFIGURATION
// ========================================
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX; // e.g., 'us1'

// ========================================
// WARRANTY REGISTRATION ENDPOINT
// ========================================
app.post('/api/register-warranty', async (req, res) => {
    try {
        const { firstName, lastName, email, orderId } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !orderId) {
            return res.status(400).json({ 
                success: false, 
                error: 'All fields are required' 
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                error: 'Invalid email address' 
            });
        }

        // Validate Amazon Order ID format
        const orderIdPattern = /^\d{3}-\d{7}-\d{7}$/;
        if (!orderIdPattern.test(orderId)) {
            return res.status(400).json({ 
                success: false, 
                error: 'Invalid Amazon Order ID format' 
            });
        }

        // Prepare Mailchimp data
        const mailchimpData = {
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
                // You'll need to create these custom fields in Mailchimp:
                ORDERID: orderId,
                REGDATE: new Date().toISOString().split('T')[0]
            },
            tags: ['warranty-registration', '2-year-warranty']
        };

        // Add to Mailchimp audience
        const mailchimpUrl = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`;
        
        const mailchimpResponse = await fetch(mailchimpUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MAILCHIMP_API_KEY}`
            },
            body: JSON.stringify(mailchimpData)
        });

        const mailchimpResult = await mailchimpResponse.json();

        // Handle Mailchimp response
        if (mailchimpResponse.status === 400 && mailchimpResult.title === 'Member Exists') {
            // User already exists - update their information instead
            const emailHash = require('crypto')
                .createHash('md5')
                .update(email.toLowerCase())
                .digest('hex');

            const updateUrl = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members/${emailHash}`;
            
            const updateResponse = await fetch(updateUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${MAILCHIMP_API_KEY}`
                },
                body: JSON.stringify(mailchimpData)
            });

            if (!updateResponse.ok) {
                throw new Error('Failed to update existing member');
            }
        } else if (!mailchimpResponse.ok) {
            console.error('Mailchimp error:', mailchimpResult);
            throw new Error('Failed to register with Mailchimp');
        }

        // ========================================
        // SEND CONFIRMATION EMAIL
        // ========================================
        // Option 1: Use Mailchimp automation
        // Set up an automation in Mailchimp that triggers when the 'warranty-registration' tag is added

        // Option 2: Send custom email via your email service
        // await sendConfirmationEmail({
        //     to: email,
        //     firstName: firstName,
        //     orderId: orderId
        // });

        // Success response
        res.json({
            success: true,
            message: 'Warranty registered successfully',
            data: {
                email: email,
                registrationDate: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            error: 'Registration failed. Please try again or contact support.'
        });
    }
});

// ========================================
// OPTIONAL: EMAIL CONFIRMATION FUNCTION
// ========================================
async function sendConfirmationEmail({ to, firstName, orderId }) {
    // Example using SendGrid, Mailgun, or similar
    // This is optional if you're using Mailchimp automation
    
    const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #E63946; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
                .button { display: inline-block; background: #E63946; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
                .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Warranty Activated!</h1>
                </div>
                <div class="content">
                    <p>Hi ${firstName},</p>
                    <p>Great news! Your 2-year warranty has been successfully registered.</p>
                    <p><strong>Order ID:</strong> ${orderId}<br>
                    <strong>Registration Date:</strong> ${new Date().toLocaleDateString()}</p>
                    <p>Your Designer iWear sunglasses are now covered for 2 full years from the date of purchase.</p>
                    <p><strong>What's covered:</strong></p>
                    <ul>
                        <li>Manufacturing defects</li>
                        <li>Material defects</li>
                        <li>Workmanship issues</li>
                    </ul>
                    <p>If you need to make a warranty claim, simply contact us with your order details.</p>
                    <a href="mailto:orders@designer-iwear.com" class="button">Contact Support</a>
                </div>
                <div class="footer">
                    <p>Designer iWear | orders@designer-iwear.com | 1.877.961.2010</p>
                </div>
            </div>
        </body>
        </html>
    `;

    // Implement your email sending logic here
    // Example with SendGrid:
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    await sgMail.send({
        to: to,
        from: 'orders@designer-iwear.com',
        subject: 'Your 2-Year Warranty is Active!',
        html: emailHtml
    });
    */
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
