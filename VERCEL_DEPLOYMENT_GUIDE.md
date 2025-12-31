# Deploy Designer iWear Warranty Page to Vercel

## 📋 Before You Start

Make sure you have:
- ✅ Vercel account created (https://vercel.com)
- ✅ Mailchimp API Key, Audience ID, and Server Prefix (see MAILCHIMP_SETUP_GUIDE.md)
- ✅ All your project files downloaded

---

## 🚀 Deployment Steps

### **STEP 1: Prepare Your Files**

1. **Create a new folder on your computer**
   - Name it: `designer-iwear-warranty`

2. **Copy these files into the folder:**
   - `warranty-registration-branded.html`
   - `server.js`
   - `package.json`
   - `.env.example`

3. **Rename the HTML file**
   - Rename `warranty-registration-branded.html` to `index.html`
   - This makes it load automatically when people visit your page

4. **Create a vercel.json file**
   - Create a new text file called `vercel.json`
   - Copy and paste this content:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    },
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server.js"
    },
    {
      "src": "/(.*)",
      "dest": "index.html"
    }
  ]
}
```

---

### **STEP 2: Install Vercel CLI (Optional but Easier)**

**Option A: Using Command Line (Recommended)**

1. **Open Terminal/Command Prompt**
   - **Windows:** Press `Windows Key + R`, type `cmd`, press Enter
   - **Mac:** Press `Cmd + Space`, type `terminal`, press Enter

2. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```
   
   *Note: If you get an error, you may need to install Node.js first from https://nodejs.org*

3. **Navigate to your project folder**
   ```bash
   cd path/to/designer-iwear-warranty
   ```
   
   *Example on Windows:*
   ```bash
   cd C:\Users\YourName\Desktop\designer-iwear-warranty
   ```

4. **Log in to Vercel**
   ```bash
   vercel login
   ```
   - Follow the prompts to verify your email

5. **Deploy!**
   ```bash
   vercel
   ```
   - Press Enter for all the default options
   - It will give you a URL like: `https://designer-iwear-warranty.vercel.app`

---

**Option B: Using Vercel Website (No Command Line)**

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click "Add New..." → "Project"

2. **Import Your Project**
   - Click "Continue with GitHub" (easiest) or
   - Use "Import Git Repository" if you know Git, or
   - Just drag and drop your folder (might not work with backend)

3. **If using GitHub (Recommended):**
   - Create a GitHub account if you don't have one
   - Create a new repository
   - Upload your files to GitHub
   - Import the repository in Vercel

4. **Configure Your Project**
   - Vercel will auto-detect the settings
   - Click "Deploy"

---

### **STEP 3: Add Environment Variables**

After deploying, you need to add your Mailchimp credentials:

1. **Go to Your Project Settings**
   - In Vercel dashboard, click on your project
   - Click "Settings" tab
   - Click "Environment Variables" in the sidebar

2. **Add These Variables:**

   **Variable 1:**
   - Name: `MAILCHIMP_API_KEY`
   - Value: *[Your Mailchimp API Key]*
   - Environment: Production, Preview, Development (select all)
   - Click "Save"

   **Variable 2:**
   - Name: `MAILCHIMP_AUDIENCE_ID`
   - Value: *[Your Audience ID]*
   - Environment: Production, Preview, Development (select all)
   - Click "Save"

   **Variable 3:**
   - Name: `MAILCHIMP_SERVER_PREFIX`
   - Value: *[Your server prefix, like "us1"]*
   - Environment: Production, Preview, Development (select all)
   - Click "Save"

3. **Redeploy**
   - Go to "Deployments" tab
   - Click the three dots (...) on the latest deployment
   - Click "Redeploy"
   - This ensures your environment variables are active

---

### **STEP 4: Connect Your Domain (Optional)**

If you want to use your own domain instead of `yourproject.vercel.app`:

1. **Go to Project Settings**
   - Click "Domains" tab

2. **Add Your Domain**
   - Click "Add"
   - Enter your domain (e.g., `warranty.designeriwear.com`)
   - Follow the DNS instructions provided

3. **Update DNS Settings**
   - Log into your domain provider (GoDaddy, Namecheap, etc.)
   - Add the DNS records Vercel provides
   - Wait 24-48 hours for DNS to propagate

---

### **STEP 5: Test Your Site**

1. **Visit Your URL**
   - Go to your Vercel URL (or custom domain)
   - You should see the warranty registration page

2. **Test the Form**
   - Fill out the form with test data
   - Order ID format: `123-4567890-1234567`
   - Submit the form

3. **Check Mailchimp**
   - Go to your Mailchimp Audience
   - Look for the new contact
   - Verify the custom fields populated correctly

4. **Check Email**
   - If you set up automation, check if you received the confirmation email

---

## 🎯 Your Live URLs

After deployment, you'll have:

**Vercel URL:**
- `https://[your-project-name].vercel.app`

**With Custom Domain:**
- `https://warranty.yoursite.com` (or whatever you choose)

---

## 🔄 Updating Your QR Codes

Your QR codes currently point to: `designeriwear.net/pages/register`

**Option 1: Redirect (Easiest)**
- Set up a 301 redirect from old URL → new Vercel URL
- Contact your current hosting provider to do this

**Option 2: Replace QR Codes**
- Generate new QR codes pointing to your new Vercel URL
- Print new cards for future orders

**Option 3: Keep Same Domain**
- Point `designeriwear.net/pages/register` to your Vercel deployment
- This requires updating your DNS settings

---

## ✅ Deployment Checklist

- [ ] Files prepared in folder
- [ ] vercel.json created
- [ ] Deployed to Vercel
- [ ] Environment variables added
- [ ] Redeployed after adding variables
- [ ] Tested form submission
- [ ] Verified Mailchimp integration
- [ ] Confirmed email automation works
- [ ] Updated QR codes or set up redirect
- [ ] Tested on mobile devices

---

## 🆘 Troubleshooting

### **Form Submits but No Email**
- Check Mailchimp automation is turned ON
- Verify the tag "warranty-registration" is being added
- Check spam folder

### **"Registration Failed" Error**
- Check environment variables are set correctly in Vercel
- Verify you redeployed after adding variables
- Check Mailchimp API key is valid

### **Page Won't Load**
- Make sure `index.html` is in the root folder
- Check vercel.json is configured correctly
- Look at deployment logs in Vercel dashboard

### **Order ID Validation Fails**
- Format must be: `123-4567890-1234567` (3 digits, dash, 7 digits, dash, 7 digits)

---

## 📞 Need Help?

**Vercel Support:**
- Documentation: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions

**Designer iWear Support:**
- Email: orders@designer-iwear.com
- Phone: 1.877.961.2010

---

## 🎉 You're Done!

Your warranty registration system is now live and automatically:
1. ✅ Collecting customer information
2. ✅ Adding contacts to Mailchimp
3. ✅ Sending confirmation emails
4. ✅ Tracking warranty registrations

**What's Next?**
- Monitor your Mailchimp audience growth
- Review customer data regularly
- Consider adding analytics (Google Analytics)
- Set up email marketing campaigns for registered customers
