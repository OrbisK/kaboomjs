import kaboom from "kaboom"


kaboom(
  {
    // Hintergrund der Welt: blau
    background: [166, 209, 247]
  }
);

//Sprites laden
loadSprite("grass", "sprites/grass.png");

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
        "======       ===                         ",
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
    ],
  }

  //Level laden
  addLevel(levels[level], levelConfig);

}
);


// Das Spiel starten
go("game", { level: 0 });