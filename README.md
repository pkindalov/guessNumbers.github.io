# 🧩 Guess the Numbers - Modern Edition

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
![Version](https://img.shields.io/badge/version-1.0.0-emerald)
![Tech](https://img.shields.io/badge/tech-Vanilla%20JS%20%7C%20Tailwind%20CSS-indigo)

A sleek, mathematically challenging puzzle game where logic meets arithmetic. Fill the grid, balance the equations, and master the numbers.

![Game Preview](images/congratulations.gif) *(Example of the winning state)*

---

## 🎮 Overview

**Guess the Numbers** is a grid-based arithmetic puzzle. Your goal is to fill the 3x3 input grid with unique numbers that satisfy six simultaneous equations (three horizontal and three vertical). 

Each puzzle is procedurally generated, ensuring a fresh challenge every time you click "Start Game."

## 🚀 Key Features

-   **Dynamic Difficulty**: Choose between Easy, Medium, and Hard modes.
-   **Real-time Validation**: Lines highlight automatically when they satisfy the math.
-   **Progress Tracking**: Localized statistics track your wins across all difficulty levels.
-   **Responsive Design**: Optimized for both desktop and mobile play.
-   **Dark Mode**: A beautiful, eye-friendly dark theme that persists with your system preferences.
-   **Save & Resume**: Your game state is automatically saved, so you can pick up right where you left off.

## 📏 Game Rules

1.  **Fill the Inputs**: You must provide numbers for all cells marked with a purple border.
2.  **Unique Numbers**: Every number you enter must be unique within the 9-cell input grid.
3.  **Range Constraints**:
    *   **Easy**: Numbers from **1 to 10**.
    *   **Medium**: Numbers from **1 to 20**.
    *   **Hard**: Numbers from **1 to 50**.
4.  **Solve the Equations**: All 6 equations must be mathematically correct to win.

### 📐 The Math Logic

The grid follows specific arithmetic patterns:

| Type | Equation |
| :--- | :--- |
| **Row 1** | `(A / B) + C = Total` |
| **Row 2** | `A + B - C = Total` |
| **Row 3** | `(A * B) / C = Total` |
| **Col 1** | `(A / B) * C = Total` |
| **Col 2** | `(A * B) / C = Total` |
| **Col 3** | `A + (B * C) = Total` |

## 🛠️ Technical Setup

This project is built with modern web standards and requires no heavy build tools to run.

### Prerequisites
-   A modern web browser.
-   [Node.js](https://nodejs.org/) (only required for running tests).

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/pkindalov/guessNumbers.github.io.git
    ```
2.  Open `index.html` in your browser.

### Running Tests
We use **Jest** to ensure mathematical integrity and logic stability.
```bash
npm install
npm test
```

## 🏗️ Architecture

-   **`scripts/gameLogic.js`**: The mathematical engine. Handles grid generation and line validation.
-   **`scripts/guessNumberss.js`**: The UI controller. Manages DOM interactions, event listeners, and game state.
-   **`scripts/storage.js`**: Persistence layer for local storage (stats and saved games).
-   **`styles/guessNumbers.css`**: Custom animations and refined UI transitions.

## 📜 License

This project is licensed under the [ISC License](LICENSE).

---

*Developed with ❤️ by the Guess the Numbers Team.*
