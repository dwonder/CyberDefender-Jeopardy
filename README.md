# Cyber Jeopardy

Cyber Jeopardy is an engaging, Jeopardy-style game designed to test and improve cybersecurity knowledge. Players step into the role of a Chief Information Security Officer (CISO) under pressure, answering questions across various categories to earn points and strengthen their organization's defenses against a simulated security breach.

## Features

- **Personalized Experience**: Enter your nickname to be displayed throughout the game.
- **Three Rounds of Gameplay**: The game progresses through three rounds of increasing difficulty, unlocking higher-value questions as you go.
- **Special Questions**:
  - **Risk/Reward**: Wager a portion of your current score on a high-stakes question.
  - **Double Jeopardy**: Special wager questions hidden on the board in Round 2.
- **Score History**: Your performance is saved locally, allowing you to track your top 10 scores across multiple playthroughs.
- **Interactive UI**: Enjoy a dynamic and visually appealing interface with animations, sound effects, and immediate feedback on your answers.
- **Hint System**: Spend a few points to get a hint on a particularly tricky question.
- **Difficulty Indicators**: Questions are clearly marked as 'easy', 'medium', or 'hard' to help you strategize.

## How to Play

1.  **Start the Mission**: Enter your CISO nickname to begin.
2.  **Read the Briefing**: Familiarize yourself with the game's objective, rules, and categories.
3.  **Select a Question**: On the game board, choose a category and a point value.
4.  **Answer Carefully**: Read the question and select one of the multiple-choice answers before the timer runs out.
5.  **Earn Points**: Correct answers add points to your score, while incorrect answers deduct points.
6.  **Progress Rounds**: Complete all questions in a round to advance to the next, more challenging round.
7.  **Complete the Mission**: Finish all three rounds to see your final score, your CISO title, and how you rank in the score history.

## Running the Project Locally

This project is a single-page application built with modern web technologies and requires no complex build setup.

1.  **Clone the repository** (or download the files).
2.  **Serve the files**: You need to serve the files from a local web server to handle ES module imports correctly.
    -   If you have Python installed, you can run `python -m http.server` in the project directory.
    -   If you use VS Code, you can install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.
3.  **Open in your browser**: Navigate to the local server address (e.g., `http://localhost:8000`) to play the game.

## Tech Stack

-   **Frontend**: React with TypeScript (served via ES Module import maps)
-   **Styling**: Tailwind CSS (via CDN)
-   **Fonts**: Google Fonts (Orbitron & Roboto)
