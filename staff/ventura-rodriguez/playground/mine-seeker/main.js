(() => {
  const changePlayerNameButton = document.getElementById("changePlayerName");
  const displayNameSpan = document.getElementById("displayPlayerName");
  const restartButton = document.getElementById("restartButton");
  const stateButton = document.getElementById("stateButton");
  const minesFound = document.getElementById("minesFound");
  const minesTotal = document.getElementById("minesTotal");
  const gamesWon = document.getElementById("gamesWon");
  const gamesLost = document.getElementById("gamesLost");
  const clickCounter = document.getElementById("clickCounter");
  const winsInARow = document.getElementById("winsInARow");
  const table = document.getElementById("table");

  ////////////////////////////////////////////////////////////////////////////////////////////////

  let started = false;
  let lostGames = 0;
  let totalMines = 0;
  let foundMines = 0;
  // null = ground // 1 = Number1 // 2 = Number3... // bomb = '*' // flag = '_' // blank = '.'
  const matrix = Array.from({ length: 12 }, () => Array(12).fill(null));
  let counterClicks = 0;

  ////////////////////////////////////////////////////////////////////////////////////////////////

  changePlayerNameButton.onclick = () => {
    const playerName = prompt("Elige tu nombre de usuario: ");
    displayNameSpan.innerText = playerName;
  };

  stateButton.onclick = () => {
    // montar el tablero dibujado en mi html
    // colocar las bombas en el sitio adecuado

    if (started === false) {
      // Inicializar la partida
      started = true;
      stateButton.innerText = "Abandonar partida";
      foundMines = 0;
      totalMines = 16;
      locateBombs(matrix);
      locateNumbersAndBlanks(matrix);
    } else {
      // Terminar la partida
      started = false;
      stateButton.innerText = "Empezar partida";
      totalMines = 0;
      foundMines = 0;
      lostGames++;
      counterClicks = 0;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // DOM zone
    minesFound.innerText = foundMines;
    minesTotal.innerText = totalMines;
    gamesLost.innerText = lostGames;
    table.innerHTML = `
      ${printDivs()}
    `;
    animateDivs();
    clickCounter.innerText = counterClicks;
  };

  function hasNoDuplicates(arr) {
    const elementCount = {};
    for (let i = 0; i < arr.length; i++) {
      const num = arr[i];
      if (elementCount[num]) {
        return false;
      }
      elementCount[num] = true;
    }
    return true;
  }

  function printDivs() {
    const template = (cell) =>
      `<div class="cell cell__ground" data-cell=${cell} ></div>`;

    concatString = "";

    for (let i = 0; i < 144; i++) {
      concatString += template(i + 1);
    }

    return concatString;
  }

  function animateDivs() {
    const cells = document.getElementsByClassName("cell");

    // idesas? Siiiiiii

    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      // aquí la lógica del click izquierdo
      cell.onclick = (event) => {
        counterClicks++;

        // DOM zone
        clickCounter.innerText = counterClicks;
      };
      // aquí la lógica del click derecho
      cell.oncontextmenu = (event) => {
        event.preventDefault();
        counterClicks++;

        // DOM zone
        clickCounter.innerText = counterClicks;
      };
    }
  }

  function locateNumbersAndBlanks(matrix) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        const cell = matrix[i][j];

        if (cell !== "*") {
          const relativePositions = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [1, -1],
            [1, 0],
            [1, 1],
            [0, -1],
            [0, 1],
          ];

          let counter = 0;
          for (let k = 0; k < 8; k++) {
            if (matrix[i + relativePositions[k][0]] !== undefined) {
              if (
                matrix[i + relativePositions[k][0]][
                  j + relativePositions[k][1]
                ] === "*"
              ) {
                counter++;
              }
            }
          }
          matrix[i][j] = counter === 0 ? "." : counter;
        }
      }
    }
  }

  function locateBombs(matrix) {
    let randomNumbers = [];
    let isDuplicated = true;

    do {
      randomNumbers = Array.from(
        { length: totalMines },
        () => Math.floor(Math.random() * 144) + 1
      );
      isDuplicated = !hasNoDuplicates(randomNumbers);
    } while (isDuplicated);

    randomNumbers.forEach((element, i) => {
      const row = Math.floor(element / 12);
      const column = element % 12;
      randomNumbers[i] = [row, column];
    });

    for (let i = 0; i < randomNumbers.length; i++) {
      const element = randomNumbers[i]; // [row, column]

      matrix[element[0]][element[1]] = "*";
    }
  }
})();

// EL funcionamiento va a ser que cuando hagamos click izquierdo nos pulsa sobre el mapa y desvela
// la posición, si la posición es blanca todo ok, pondra blank o el número correcspondiente
// la posición es bomba petará y se le sumará una perdida y se reinicia el tablero
// si se coloca en un banl se deben mostrar todos los blanks

// El funcionamiento del click derecho va a ser poner una flag

// con cada click debemos comprobar que la web sea reactiva
