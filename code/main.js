import kaboom from "kaboom"  


kaboom(
  {
    // Hintergrund der Welt: blau
    background: [166, 209, 247]
  }
);

// Wichtige Konstanten
const MOVE_SPEED = 400;
const FALL_GAME_OVER = 10 * 64;
const MOVE_SPEED_ENEMY = 200;

//Sprites laden
loadSprite("grass", "sprites/grass.png");
loadSprite("bean", "sprites/bean.png");
loadSprite("ghosty", "sprites/ghosty.png");
loadSprite("coin", "sprites/coin.png");
loadSprite("portal", "sprites/portal.png");

//Szene erstellen: game
scene("game", ({score, level}) =>
  {
    const levels =
    [      
      [
        "                            C            ",
        "                             C           ",
        "      C       C               C          ",
        "      =      ==             ===          ",
        "                                        O",
        "    = =  =X     =    ===    =  X   = X  =",
        "=======  ========  =======  ============", 
      ],

       [
         "                C                     ",
         "              ====          C         ",
         "=                      =  ====        ",
         "==       ==                           ",
         "===  ==   X    ===        X  ==    X =",
         "=== ==================================="
      ],
    ];

    // Alle Objekte im Spiel konfigurieren
    const levelConfig = {
      width: 64,
      height: 64,
      "=": () => [
        sprite("grass"),
        area(),
        solid(),
      ],
      "X": () => [
        sprite("ghosty"),
        area(),
        body(),
        "enemy",
        {
          direction: -1,
          lastPositionX: 0
        }
      ],
      "C": () => [
        sprite("coin"),
        "coin",
        area()
      ],
      "O": () => 
      [
        sprite("portal"),
        area(),
        "portal"
      ],
    }

    //Level laden
    addLevel(levels[level], levelConfig);

    // Spieler hinzufügen
    const player = add(
      [
        sprite("bean"),
        pos(0,0),
        area(),
        body(),
        "player",
        scale(0.96)
      ]
    );

    const scoreLabel = add(
      [
        pos(0,0),
        text("Score: " + score, {size: 40}),
        fixed()
      ]
    )

    add(
      [
        pos(0,50),
        fixed(),
        text("Level: " + level, {size: 40})
      ]
    );

    const increaseScore = (points) => {
      score = score + points;
      scoreLabel.text = "Score: " + score
    }

    const gameOver = () => {
      player.destroy();
      go("gameOver");
    }

    // Spieler bewegen
    keyDown("right", () => 
      {
        player.move(MOVE_SPEED, 0)
      }
    );

    // Spieler bewegen
    keyDown("left", () => 
      {
        player.move(-MOVE_SPEED, 0)
      }
    );

    keyDown("space", () => 
      {
        if(player.grounded()) {
          player.jump();
        }
      }
    );

    // Kamera auf die Spielfigur ausrichten
    action( () => 
      {
        camPos(player.pos);
      }
    )

    action("player", () => {
        if(player.pos.y > FALL_GAME_OVER) {
          gameOver();
        }
      }
    );

    action("enemy", (enemy) => 
      {
        if (enemy.lastPositionX === enemy.pos.x) {
          enemy.direction = enemy.direction * -1
        }
        enemy.lastPositionX = enemy.pos.x
        enemy.move(enemy.direction * MOVE_SPEED_ENEMY, 0);
      }
    )

    player.collides("enemy", (enemy) => 
      {
        if (player.grounded()) 
        {
          gameOver();
        } else {
          enemy.destroy();
          increaseScore(5);
        }
      }
    );

    player.collides("coin", (coin) => 
      {
        coin.destroy();
        increaseScore(1);
      }
    );

    player.collides("portal", () =>
      {
        go("game", {score: score + 5, level: level + 1})
      }    
    );

  }
);

scene("gameOver", () => 
  {
    add(
      [
        pos(0,0),
        rect(width(), height()),
        color(0,0,0)
      ]
    ),
    add(
      [
        pos(width()/2, height()/2),
        origin("center"),
        text("GAME OVER")
      ]
    ) 

    keyDown("space", () => 
      {
        go("game", {score: 0, level: 0});
      }  
    )
  }
);

// Das Spiel starten
go("game", {score: 0, level: 0});