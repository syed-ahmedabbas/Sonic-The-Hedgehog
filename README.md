# Sonic the Hedgehog Runner Game

An endless runner game based on Sonic the Hedgehog, built using **KAPLAY** (formerly Kaboom.js) and bundled with **Vite**.

---

## 🎮 Overview

This game implements a classic 2D side-scrolling runner game set in a Sonic-themed world. Sonic runs automatically, and the player can jump to avoid oncoming Motobug robot enemies. The game features:
- Retro graphics and sprite sheet animations.
- Dynamic scrolling background and platform pieces.
- High-fidelity sound effects and background music.
- Interactive main menu.

---

## 📂 Project Structure

Here is a breakdown of the project directories and files:

```text
Sonic-The-Hedgehog/
├── public/                 # Static assets served directly
│   ├── fonts/              # Custom retro typography (mania.ttf)
│   ├── graphics/           # Sprite sheets (Sonic, Motobugs, rings, background, etc.)
│   └── sounds/             # Sound effects (jump, hurt, rings, destroy) & background music
├── src/                    # Source code
│   ├── assets/             # Game context and loaders
│   │   ├── kaplayCtx.js    # KAPLAY canvas configuration & keyboard controls
│   │   └── main.js         # Asset preloading, scene registry, and game entry point
│   ├── entities/           # Game character/enemy setups
│   │   ├── sonic.js        # Sonic entity logic, animations, and controls
│   │   └── motobug.js      # Motobug enemy entity configuration
│   └── scenes/             # Game states
│       ├── mainMenu.js     # Main menu layout and looping animation
│       ├── game.js         # Core gameplay logic, scrolling, and enemy spawner
│       └── gameover.js     # Game over screen (placeholder for implementation)
├── index.html              # HTML Entry Point
├── package.json            # Dependencies and npm script runner
└── README.md               # Project documentation
```

---

## 🚀 Setup & Execution Guide

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### 1. Install Dependencies
Run the following command in the project root folder to install Vite and KAPLAY:
```bash
npm install
```

### 2. Run the Development Server
Launch the local dev server:
```bash
npm run dev
```
Open the provided local URL (typically `http://localhost:5173/` or `http://localhost:5174/`) in your browser to play the game.

### 3. Build for Production
To bundle and optimize the project for deployment:
```bash
npm run build
```
This generates the optimized build in the `dist/` directory.

---

## 🛠️ Bugs and Fixes Applied

During analysis, we resolved the following issues to make the game load and play properly:

1. **Path Separation Bug (`index.html`)**:
   - *Problem*: The script tag import used an invalid mixed backslash `/src\assets/main.js`.
   - *Fix*: Corrected the path separator to use standard web forward slashes: `/src/assets/main.js`.

2. **Audio Decoding Typos (`src/assets/main.js`)**:
   - *Problem*: The `hurt` sound effect loader was looking for `sounds/Hur.wav`, which did not exist. Because KAPLAY holds the game launch until all preloaded assets resolve, this caused an `EncodingError: Unable to decode audio data` and blocked the game from booting, resulting in a blank screen.
   - *Fix*: Updated the asset loader path to point to the actual file name: `sounds/Hurt.wav`.

---

## 🔮 Future Roadmap

To make the game fully complete, the following features can be added next:
- **Collision Detection**: Implement logic for Sonic to destroy Motobugs if jumping/spinning, or take damage if hit while running on the ground.
- **Ring System**: Spawn ring collectibles along the platforms that Sonic can collect (using `Ring.wav`).
- **Score and UI**: Add a UI overlay displaying the current ring count and distance score.
- **Game Over Screen**: Complete `src/scenes/gameover.js` to display the game over state, final score, high score, and a restart prompt.
