# 🎮 Supercode: A Color Guessing Game

**Supercode** is a modern web-based game inspired by the classic *Mastermind* logic puzzle. Your goal is to guess the secret 4-color code within 10 attempts. After each guess, you'll receive feedback in the form of black and white dots—helping you logically deduce the correct combination.

---

## 🧩 How to Play

1. Click **"Spiel starten"** to start the game.
2. Select one color in each of the 4 dropdowns.
3. Submit your guess using the **"Submit Guess"** button.
4. Feedback will appear:
   - ⚫ Black Dot: Correct color in the correct position.
   - ⚪ White Dot: Correct color, wrong position.
5. Guess the full code within 10 rounds to win!

---

## ✨ Features

- 🎨 Interactive color selection interface
- ⏱️ Real-time game timer
- 🏁 10-round limit for added challenge
- 🟢 Black and white feedback logic
- 🏆 **Highscore tracking** with `localStorage`
- 📱 Responsive and lightweight UI

---

## 📦 Project Structure

/supercode
├── index.html # Main HTML layout
├── style.css # Styling and layout
└── script.js # Game logic and interaction


## 🛠️ Technologies Used

- **HTML5** – Page structure and elements  
- **CSS3** – Styling and layout  
- **JavaScript (ES6)** – Game logic, timer, highscore system


## 🚀 Running the Game Locally

1. Clone this repository:
   git clone https://github.com/your-username/supercode.git

Navigate into the project folder:
cd supercode
Open index.html in your browser.

No installation or build tools required—just open and play!

📈 Highscore System
Tracks the fastest successful game time.

Stored in localStorage and displayed at the top of the screen.

Automatically updates when a new best time is achieved.

