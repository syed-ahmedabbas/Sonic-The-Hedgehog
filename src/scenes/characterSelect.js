import k from "../assets/kaplayCtx.js";
import { gameState } from "../assets/kaplayCtx.js";

export default function characterSelect() {
  // ─── Character Data ───
  const characters = [
    { name: "SONIC",    portrait: "sonic_dp"    },
    { name: "SHADOW",   portrait: "shadow_dp"   },
    { name: "KNUCKLES", portrait: "knuckles_dp" },
  ];

  let currentChoice = 0;

  // ─── Layout Constants ───
  const boxWidth   = 280;
  const boxHeight  = 320;
  const spacing    = 400;                       // horizontal distance between centers
  const startX     = k.center().x - spacing;    // center of the leftmost box
  const boxY       = k.center().y - 60;         // vertical center of the portrait boxes
  const nameY      = boxY + boxHeight / 2 + 55; // name label sits below the box
  const borderThickness = 5;

  // ─── Colors ───
  const goldColor    = k.Color.fromArray([255, 215, 0]);
  const grayColor    = k.Color.fromArray([100, 100, 100]);
  const boxBgColor   = k.rgb(15, 15, 25);

  // ─── Title ───
  k.add([
    k.text("SELECT YOUR RUNNER", { font: "mania", size: 54 }),
    k.pos(k.center().x, 100),
    k.anchor("center"),
  ]);

  // ─── Build Character Cards ───
  const cards = [];   // stores { box, portrait, label } for each character

  characters.forEach((char, index) => {
    const cx = startX + index * spacing;

    // --- Portrait Container Box ---
    const box = k.add([
      k.rect(boxWidth, boxHeight, { radius: 8 }),
      k.color(boxBgColor),
      k.anchor("center"),
      k.pos(cx, boxY),
      k.outline(borderThickness, index === currentChoice ? goldColor : grayColor),
    ]);

    // --- Portrait Image (child of box, auto-centered) ---
    const portrait = box.add([
      k.sprite(char.portrait),
      k.anchor("center"),
      k.pos(0, 0),
      k.opacity(index === currentChoice ? 1.0 : 0.4),
    ]);

    // Scale the portrait to fit inside the box with some padding
    const padding = 20;
    const targetW = boxWidth  - padding * 2;
    const targetH = boxHeight - padding * 2;
    const spriteW = portrait.width;
    const spriteH = portrait.height;
    const scaleFactor = Math.min(targetW / spriteW, targetH / spriteH);
    portrait.scale = k.vec2(scaleFactor);

    // --- Character Name Label ---
    const label = k.add([
      k.text(char.name, { font: "mania", size: 48 }),
      k.pos(cx, nameY),
      k.anchor("center"),
      k.color(index === currentChoice ? goldColor : k.rgb(255, 255, 255)),
    ]);

    cards.push({ box, portrait, label });
  });

  // ─── Instruction Text ───
  k.add([
    k.text("< LEFT / RIGHT >   ENTER to confirm   ESC to go back", {
      font: "mania",
      size: 28,
    }),
    k.pos(k.center().x, k.height() - 80),
    k.anchor("center"),
    k.color(k.rgb(160, 160, 160)),
  ]);

  // ─── Selection State Update ───
  function updateSelectionUI() {
    cards.forEach((card, index) => {
      const isSelected = index === currentChoice;

      // Box border color
      card.box.outline.color = isSelected ? goldColor : grayColor;

      // Portrait opacity
      card.portrait.opacity = isSelected ? 1.0 : 0.4;

      // Label color & scale
      card.label.color = isSelected ? goldColor : k.rgb(255, 255, 255);
      card.label.scale = isSelected ? k.vec2(1.15) : k.vec2(1.0);
    });
  }

  // ─── Input Handlers ───
  k.onKeyPress("left", () => {
    if (currentChoice > 0) {
      currentChoice--;
      k.play("ring", { volume: 0.3 });
      updateSelectionUI();
    }
  });

  k.onKeyPress("right", () => {
    if (currentChoice < characters.length - 1) {
      currentChoice++;
      k.play("ring", { volume: 0.3 });
      updateSelectionUI();
    }
  });

  k.onKeyPress(["enter", "space"], () => {
    k.play("destroy", { volume: 0.4 });
    gameState.selectedCharacter = characters[currentChoice].name.toLowerCase();
    k.go("mainMenu");
  });

  k.onKeyPress("escape", () => k.go("mainMenu"));
}