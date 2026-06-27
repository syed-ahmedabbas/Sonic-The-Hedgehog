import k from "../assets/kaplayCtx.js";
import { makeSonic } from "../entities/sonic.js";

export default function mainMenu() {
  k.setGravity(0);
  if (!k.getData("best-score")) k.setData("best-score", 0);

  const bgPieceWidth = 1920;
  const bgPieces = [
    k.add([k.sprite("chemical-bg"), k.pos(0, 0), k.scale(2), k.opacity(0.8)]),
    k.add([k.sprite("chemical-bg"), k.pos(bgPieceWidth, 0), k.scale(2), k.opacity(0.8)]),
  ];

  const platformWidth = 1280;
  const platforms = [
    k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(4)]),
    k.add([k.sprite("platforms"), k.pos(platformWidth, 450), k.scale(4)]),
  ];

  k.add([
    k.text("Sonic RUSH", { font: "mania", size: 100 }),
    k.pos(k.center().x, 150),
    k.anchor("center"),
  ]);

  // Menu List Configuration
  const menuOptions = ["PLAY", "CHARACTER SELECTION", "EXIT"];
  let currentSelection = 0; 
  const visualItems = [];

  menuOptions.forEach((option, index) => {
    const item = k.add([
      k.text(option, { font: "mania", size: 60 }), 
      k.pos(k.center().x, 380 + index * 110),      
      k.anchor("center"),
      k.color(index === currentSelection ? k.rgb(255, 215, 0) : k.rgb(255, 255, 255)), 
    ]);
    visualItems.push(item);
  });

  function updateMenuVisuals() {
    visualItems.forEach((item, index) => {
      if (index === currentSelection) {
        item.color = k.rgb(255, 215, 0); 
        item.scale = k.vec2(1.1);        
      } else {
        item.color = k.rgb(255, 255, 255); 
        item.scale = k.vec2(1.0);
      }
    });
  }

  k.onKeyPress("up", () => {
    if (currentSelection > 0) {
      currentSelection--;
      k.play("ring", { volume: 0.3 });
      updateMenuVisuals();
    }
  });

  k.onKeyPress("down", () => {
    if (currentSelection < menuOptions.length - 1) {
      currentSelection++;
      k.play("ring", { volume: 0.3 });
      updateMenuVisuals();
    }
  });

  k.onKeyPress(["enter", "space"], () => {
    k.play("destroy", { volume: 0.4 });
    if (currentSelection === 0) {
      k.go("game"); 
    } 
    else if (currentSelection === 1) {
      k.go("characterSelect"); 
    } 
    else if (currentSelection === 2) {
      k.add([k.rect(k.width(), k.height()), k.color(0, 0, 0)]);
      k.add([
        k.text("THANKS FOR PLAYING!", { font: "mania", size: 48 }),
        k.pos(k.center()),
        k.anchor("center")
      ]);
    }
  });

  makeSonic(k.vec2(200, 745));

  k.onUpdate(() => {
    if (bgPieces[1].pos.x < 0) {
      bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
      bgPieces.push(bgPieces.shift());
    }
    bgPieces[0].move(-100, 0);
    bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);

    if (platforms[1].pos.x < 0) {
      platforms[0].moveTo(platforms[1].pos.x + platformWidth * 4, 450);
      platforms.push(platforms.shift());
    }
    platforms[0].move(-300, 0); 
    platforms[1].moveTo(platforms[0].pos.x + platformWidth * 4, 450);
  });
}