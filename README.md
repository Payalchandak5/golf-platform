# Golf Platform ⛳

A modern full-stack subscription-based web application built using Next.js, Tailwind CSS, Supabase, and Stripe. The platform includes secure authentication, subscription plans, protected dashboards, and responsive UI deployment.

---

## 🚀 Features

- 🔐 User Authentication (Signup/Login)
- 👤 Protected Dashboard
- 💳 Stripe Subscription Integration
- ☁️ Supabase Database Integration
- 🎨 Modern Responsive UI using Tailwind CSS
- ⚡ Fast Performance with Next.js
- 🌍 Live Deployment on Vercel

---

## 🛠️ Tech Stack

- Frontend: Next.js, React
- Styling: Tailwind CSS
- Backend & Database: Supabase
- Payments: Stripe
- Deployment: Vercel

---

## 📂 Project Structure

```bash
app/
 ├── login/
 ├── signup/
 ├── dashboard/
 ├── subscribe/
 ├── api/
 │    ├── checkout/
 │    └── webhook/
lib/
 └── supabaseClient.ts
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/your-username/golf-platform.git
```

Go to the project folder:

```bash
cd golf-platform
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

## 🔑 Environment Variables

Create a `.env.local` file and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
```

---

## 💳 Payment Integration

This project uses Stripe Checkout for subscription-based payments.

Users can:
- Choose subscription plans
- Complete secure payments
- Access protected dashboard features

---

## ☁️ Deployment

The project is deployed using Vercel.

Steps:
1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy

---

## 📸 Screens Included

- Login Page
- Signup Page
- Subscription Page
- User Dashboard

---

## 🎯 Learning Outcomes

Through this project, I learned:
- Full-stack web development
- Authentication & Authorization
- API Integration
- Payment Gateway Integration
- Cloud Deployment
- Debugging production errors

## 📜 License

This project is for educational and learning purposes.
