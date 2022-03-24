import kaboom from "kaboom"


kaboom(
  {
    // Hintergrund der Welt: blau
    background: [166, 209, 247]
  }
);

// Wichtige Konstanten

//Sprites laden
loadSprite("grass", "sprites/grass.png");
loadSprite("portal", "sprites/portal.png");

//Szene erstellen: game
scene("game", ({ level }) => {
  const levels =
    [
      [
        "                                         ",
        "                                         ",
        "                                         ",
        "                                      O  ",
        "                                         ",
        "                                         ",
        "             ===                         ",
      ],

      [
        "                                         ",
        "                                         ",
        "                                         ",
        "                                         ",
        "                                         ",
        "                                         ",
        "                                         ",
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
      "player",
    ]
  );

  player.collides("portal", () => {
    go("game", { level: level + 1 })
  }
  );

}
);


// Das Spiel starten
go("game", { level: 0 });