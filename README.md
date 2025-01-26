#  Electronic Medical Records (EMR) System

![GitHub repo size](https://img.shields.io/github/repo-size/CareInnovate/EMR-System)
![GitHub stars](https://img.shields.io/github/stars/CareInnovate/EMR-System?style=social)
![GitHub license](https://img.shields.io/github/license/CareInnovate/EMR-System)

## 📌 Overview
This is a full-stack **Electronic Medical Records (EMR) system** I built using **Next.js, Prisma, and PostgreSQL** to help healthcare providers manage patient records more efficiently. The system is designed to be **role-based**, meaning different users—**doctors, patients, receptionists, and admins**—each have their own dashboard with relevant features.

## 🚀 Features

✅ **Patient Management** – Stores patient information, including medical history, diagnoses, and past consultations.

✅ **Appointment Scheduling** – Patients can book appointments based on available slots, while doctors manage their schedules.

✅ **Medical History Tracking** – Displays a timeline of diagnoses and treatments for quick reference.

✅ **Authentication & Security** – Uses **NextAuth** with phone-based login and auto-generated passwords for patients.

🔲 **Billing & Invoicing** – Handles payments and invoices for hospital services.

🔲 **Inventory Management** – Still working on tracking medication and supplies to ensure proper stock levels.

🔲 **Lab Results Integration** – Planning to allow doctors to upload lab test results directly to patient records.

🔲 **Messaging System** – Considering adding a built-in chat for doctors and patients.


## 🛠 Installation
To get started, clone the repository and install dependencies:

```bash
git clone https://github.com/CareInnovate/EMR-System.git
cd EMR-System
npm install  # or yarn install
```

## 📄 Usage
#### Set Up Environment Variables
1. **Create an `.env` file** in the project root:
    ```sh
    touch .env
    ```

2. **Add the following variables:**
    ```ini
      DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
      DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
      NODE_ENV="development"  # Change to "production" when deploying
      SECURE="false"  # Set to "true" for HTTPS
      NEXTAUTH_URL="http://localhost:3000"
      NEXTAUTH_SECRET="your-secret-key"
      NEXT_PUBLIC_BASE_URL="http://localhost:3000"
      BASE_URL="http://localhost:3000"
    ```

3. **Replace placeholders with actual values.**
4. **Restart the server:**
    ```sh
    npm run dev
    ```

For production, ensure the `.env` file is correctly set on your hosting platform. 🚀
Run the project with:

```bash
npm build
npm start  # or yarn start
```

Then open `http://localhost:3000` in your browser.

## 🤝 Contributing
Contributions are welcome!  
1. Fork the repository  
2. Create a new branch (`git checkout -b feature-branch`)  
3. Commit your changes (`git commit -m "Added new feature"`)  
4. Push to the branch (`git push origin feature-branch`)  
5. Open a Pull Request  


