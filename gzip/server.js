const express = require("express");
const compression = require("compression");
const app = express();
const log4js = require("log4js");
app.use(compression());

app.get("/", (req, res) => {
  res.json({
    name: "La trivia de pepito",
    creator_uid: "JGVsEBWvCCegIb7y1NAp62BfHJi2",
    questions: [
      {
        title: "Cuantos años tenia ricardo fort cuando murio?",
        answers: [
          { answer: "55", correct: true },
          { answer: "54", correct: false },
          { answer: "51", correct: false },
          { answer: "21", correct: false },
        ],
      },
      {
        title: "Cuantos años tenia ricardo fort cuando murio?",
        answers: [
          { answer: "55", correct: true },
          { answer: "54", correct: false },
          { answer: "51", correct: false },
          { answer: "21", correct: false },
        ],
      },
      {
        title: "Cuantos años tenia ricardo fort cuando murio?",
        answers: [
          { answer: "55", correct: true },
          { answer: "54", correct: false },
          { answer: "51", correct: false },
          { answer: "21", correct: false },
        ],
      },
      {
        title: "Cuantos años tenia ricardo fort cuando murio?",
        answers: [
          { answer: "55", correct: true },
          { answer: "54", correct: false },
          { answer: "51", correct: false },
          { answer: "21", correct: false },
        ],
      },
    ],
  });
});

app.listen(8080, () => {
  console.log("Escuchando sv");
});
