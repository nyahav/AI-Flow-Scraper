# JaMoveo – Jam at the Speed of Sound! 🎵🚀

Welcome to **JaMoveo**, the ultimate interactive band rehearsal web app! Take your jam sessions to the next level with real-time lyrics and chord displays, seamless collaboration, and an intuitive interface designed for musicians.


## 🚀 How to Use the App
To get started quickly, you can use the following test accounts:

Admin Credentials:
Username: checkingadmin
Password: checkingadmin

User Credentials:
Username: superuserdo
Password: superuserdont

## Step-by-Step Guide

1️⃣ Log In
Open the app in two separate browsers or devices.
Log in with the Admin credentials on one device and the User credentials on the other.

2️⃣ Enter the Waiting Room
After logging in, the User should click "Let's Go" to enter the waiting room.
The Admin will then join to start the session.

3️⃣ Start a Session
The Admin should click "Create Session" (located at the top of the screen).
The User will receive a notification that the session has started.

4️⃣ Select a Song
The Admin can search for songs using the Tab4U search feature.
Once a song is selected, both the Admin and User will be automatically redirected to the Live Session page.

5️⃣ Jam Together! 🎸🎶
On the Live Session page, both users will see real-time lyrics and chords displayed.
Enjoy a seamless, synchronized jam session!

🆕 Creating a New Account
If you want to create your own user account, follow these steps:

Click the "Get Started" button in the top-right corner or navigate to:
👉 /sign-up

To create an Admin account, use the special registration path:
👉 /sign-up-admin
After signing up through this path, you will automatically be granted Admin privileges.

---

## 🌟 Features

✅ **User Authentication & Registration** – Sign up, log in, and select your instrument.  
✅ **Admin-Controlled Sessions** – Keep rehearsals organized with admin controls.  
✅ **Real-Time Updates** – View song lyrics and chords live, synchronized for all members.  
✅ **Instrument-Specific Display** – Chords and lyrics adjust based on your instrument.  
✅ **Automatic Scrolling** – Hands-free reading experience during performances.  
✅ **High-Contrast Interface** – Designed for smoky, dimly lit rehearsal rooms.  
✅ **Live Socket Implementation** – Stay in sync with real-time session updates.  

---

## ⚙️ Tech Stack

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Badges</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>🎨 Design</td>
            <td>
                <a href="https://tailwindcss.com/">
                    <img src="https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
                </a>
            </td>
        </tr>
        <tr>
            <td>📋 Languages & Tools</td>
            <td>
                <a href="https://www.typescriptlang.org/">
                    <img src="https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
                </a>
                <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
                    <img src="https://img.shields.io/badge/JavaScript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
                </a>
            </td>
        </tr>
        <tr>
            <td>📚 Libraries</td>
            <td>
                <a href="https://reactjs.org/">
                    <img src="https://img.shields.io/badge/React-%2320232A.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React">
                </a>
                <a href="https://lucide.dev/">
                    <img src="https://img.shields.io/badge/Lucide%20React-%23000000.svg?style=for-the-badge&logo=lucide-react&logoColor=white" alt="Lucide React">
                </a>
                <a href="https://zod.dev/">
                    <img src="https://img.shields.io/badge/Zod-%23000000.svg?style=for-the-badge&logo=zod&logoColor=white" alt="Zod">
                </a>
            </td>
        </tr>
        <tr>
            <td>🚀 Frameworks</td>
            <td>
                <a href="https://nextjs.org/">
                    <img src="https://img.shields.io/badge/Next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
                </a>
            </td>
        </tr>
        <tr>
            <td>🔌 State Management & Auth</td>
            <td>
                <a href="https://github.com/pmndrs/zustand">
                    <img src="https://img.shields.io/badge/Zustand-%23000000.svg?style=for-the-badge&logo=zustand&logoColor=white" alt="Zustand">
                </a>
                <a href="https://clerk.dev/">
                    <img src="https://img.shields.io/badge/Clerk-%23000000.svg?style=for-the-badge&logo=clerk&logoColor=white" alt="Clerk">
                </a>
            </td>
        </tr>
        <tr>
            <td>⚡ Real-Time Communication</td>
            <td>
                <a href="https://socket.io/">
                    <img src="https://img.shields.io/badge/Socket.io-%23000000.svg?style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.io">
                </a>
            </td>
        </tr>
        <tr>
            <td>🎛 UI Components</td>
            <td>
                <a href="https://www.radix-ui.com/">
                    <img src="https://img.shields.io/badge/Radix%20UI-%23000000.svg?style=for-the-badge&logo=radix-ui&logoColor=white" alt="Radix UI">
                </a>
            </td>
        </tr>
    </tbody>
</table>
---
## 🛠️ Getting Started

Follow these steps to set up **JaMoveo** on your local machine:

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/nyahav/JaMoveo.git
   cd JaMoveo
   ```
2. **Install Dependencies**  
   ```bash
   npm install
   ```
3. **Set Up the Database**  
   Configure your database connection as needed.
4. **Configure Environment Variables**  
   Create a `.env` file and set up required variables.
5. **Run the Development Server**  
   ```bash
   npm run dev
   ```

---


## 📸 Screenshots
*Coming soon!*

---
## 🚀 Feature Enhancements & New Features
🎤 Live Chat for Players
Add an in-session chat feature so band members can communicate in real time while playing.
Allow text-based messaging for coordination (e.g., "Let's play the chorus twice!").
Consider voice chat for a more immersive experience.

🎭 Admin Controls & Player Management
See Connected Players Before the Session Starts:
Display a list of online users (including their selected instrument).
Allow the admin to manage players (e.g., kick, mute, or highlight a musician).
Session Permissions:
Let admins assign roles (e.g., lead singer, drummer, guitarist).
Restrict who can control song selection or settings.

🔎 Enhanced Song Selection & Playlists
Save Favorite Songs: Let users create a personal or shared song list for easy access.
Pre-define Setlists: Admins can prepare setlists before a session starts.
AI-Powered Song Suggestions: Recommend songs based on previous choices.

📊 Real-Time Player Stats & Insights
Show chord progression analytics (e.g., "80% of the session was spent in C major").
Track player engagement (e.g., "You played 5 songs this session!").
Provide a history log of past sessions.

🔄 More Real-Time Enhancements
Live Song Key/Tempo Adjustments: Allow transposing keys on the fly.
Custom Scroll Speed for Lyrics: Users can adjust how fast lyrics/chords scroll.
Metronome Integration: Keep everyone in sync with an optional built-in metronome.

🛠️ Improved UI & UX
Dark Mode Toggle: Add a switch for users who prefer a dark theme.
Instrument-Specific Themes: Different interface color schemes based on instrument type.
Gesture Controls for Mobile: Swipe up/down for scrolling, double-tap to pause lyrics.

🌎 Cloud & Cross-Platform Sync
Save user preferences in the cloud (e.g., last played song, preferred scrolling speed).
Let users sync across multiple devices seamlessly.

📹 Live Video Integration (Advanced)
If you want to go all-in, add a video feed option so players can see each other while jamming!

---
## 👨‍💻 Creator
Project developed by **[Yahav Nir](https://github.com/YOUR-GITHUB)**. Feel free to reach out for collaboration or feedback! 🎸🔥

---

Enjoy jamming with **JaMoveo**! 🚀🎶
