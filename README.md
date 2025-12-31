# Designer iWear Warranty Registration - Deployment Package

## 📦 What's In This Folder

This folder contains EVERYTHING you need to deploy your warranty registration page.

### Files Included:

1. **index.html** - Your warranty registration landing page (branded for Designer iWear)
2. **server.js** - Backend server that connects to Mailchimp
3. **package.json** - Lists all the code dependencies needed
4. **vercel.json** - Configuration file for Vercel deployment
5. **.env.example** - Template for your secret credentials (Mailchimp)

---

## 🚀 Quick Start

### Step 1: Upload to GitHub
1. Go to https://github.com/new
2. Name: `designer-iwear-warranty`
3. Make it Public or Private
4. Click "Create repository"
5. Upload ALL 5 files from this folder

### Step 2: Deploy to Vercel
1. Go to https://vercel.com/new
2. Connect your GitHub account
3. Select `designer-iwear-warranty` repository
4. Click "Deploy"

### Step 3: Add Mailchimp Credentials
1. Set up Mailchimp (see MAILCHIMP_SETUP_GUIDE.md)
2. In Vercel: Settings → Environment Variables
3. Add these 3 variables:
   - `MAILCHIMP_API_KEY`
   - `MAILCHIMP_AUDIENCE_ID`
   - `MAILCHIMP_SERVER_PREFIX`
4. Redeploy

### Step 4: Connect Your Domain
1. In Vercel: Settings → Domains
2. Add: `warranty.designeriwear.net`
3. Update DNS at your domain registrar

---

## ✅ That's It!

Your warranty registration system will be live at:
- Vercel URL: `https://designer-iwear-warranty.vercel.app`
- Custom Domain: `https://warranty.designeriwear.net` (after DNS setup)

---

## 📚 Need Detailed Instructions?

See the full guides:
- **VERCEL_DEPLOYMENT_GUIDE.md** - Complete deployment instructions
- **MAILCHIMP_SETUP_GUIDE.md** - How to set up Mailchimp

---

## 🆘 Troubleshooting

**Form doesn't submit?**
- Check environment variables are set in Vercel
- Make sure you redeployed after adding them

**Page won't load?**
- Verify all 5 files are uploaded to GitHub
- Check Vercel deployment logs for errors

**No confirmation email?**
- Check Mailchimp automation is turned ON
- Verify the tag "warranty-registration" is correct

---

## 📞 Support

Designer iWear Support:
- Email: orders@designer-iwear.com
- Phone: 1.877.961.2010

---

**You're ready to deploy! 🎉**
