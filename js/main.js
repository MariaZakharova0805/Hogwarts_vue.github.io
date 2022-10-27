// объект с переменными
let app = new Vue({
  el: ".main",
  data: {
    showMain: true,
    showSocial: false,
    showArchivements: false,
    showQuestions: false,
    showResult: false,
    number: 0,
    score: {
      kogtevran: 0,
      slizerin: 0,
      griffindor: 0,
      puffenduy: 0,
    },
    totalGame: localStorage.getItem("sc2TotalGame")
      ? JSON.parse(localStorage.getItem("sc2TotalGame"))
      : {
          kogtevran: 0,
          slizerin: 0,
          griffindor: 0,
          puffenduy: 0,
          mix: 0,
        },
    totalGames: localStorage.getItem("sc2TotalGames")
      ? localStorage.getItem("sc2TotalGames")
      : 0,
    questions: questions,
    results: results,
    resultRace: "puffenduy",
  },
  // создаем вызываемые в html коде @click методы
  methods: {
    goToMain() {
      this.showMain = true;
      this.showSocial = false;
      this.showArchivements = false;
      this.showQuestions = false;
      this.showResult = false;
    },
    goToSocial() {
      this.showMain = false;
      this.showSocial = true;
      this.showArchivements = false;
      this.showQuestions = false;
      this.showResult = false;
    },
    goToArchivements() {
      if (this.totalGames > 0) {
        this.showMain = false;
        this.showSocial = false;
        this.showArchivements = true;
        this.showQuestions = false;
        this.showResult = false;
      } else {
        this.goToQuestions();
      }
    },
    goToQuestions() {
      (this.score = {
        kogtevran: 0,
        slizerin: 0,
        griffindor: 0,
        puffenduy: 0,
      }),
        (this.showMain = false);
      this.showSocial = false;
      this.showArchivements = false;
      this.showQuestions = true;
      this.showResult = false;
    },
    gotToResult(race) {
      this.showMain = false;
      this.showSocial = false;
      this.showArchivements = false;
      this.showQuestions = false;
      this.showResult = true;
      this.resultRace = race;
    },
    nextQuestions(answer) {
      if (this.number == 10) {
        this.number = 0;
        this.endGame();
      } else {
        this.number++;
      }
      eval(answer);
    },
    endGame() {
      this.totalGames++;
      localStorage.setItem("sc2TotalGames", this.totalGames);
      // Когтевран
      if (
        this.score.kogtevran > this.score.slizerin &&
        this.score.kogtevran > this.score.griffindor &&
        this.score.kogtevran > this.score.puffenduy
      ) {
        this.gotToResult("kogtevran");
        this.totalGame.kogtevran++;
      } // Слизерин
      else if (
        this.score.slizerin > this.score.kogtevran &&
        this.score.slizerin > this.score.griffindor &&
        this.score.slizerin > this.score.puffenduy
      ) {
        this.gotToResult("slizerin");
        this.totalGame.slizerin++;
      } // Гриффиндор
      else if (
        this.score.griffindor > this.score.kogtevran &&
        this.score.griffindor > this.score.slizerin &&
        this.score.griffindor > this.score.puffenduy
      ) {
        this.gotToResult("griffindor");
        this.totalGame.griffindor++;
      } // Пуффендуй
      else if (
        this.score.puffenduy > this.score.kogtevran &&
        this.score.puffenduy > this.score.slizerin &&
        this.score.puffenduy > this.score.griffindor
      ) {
        this.gotToResult("puffenduy");
        this.totalGame.puffenduy++;
      } else {
        this.gotToResult("mix");
        this.totalGame.mix++;
      }
      localStorage.setItem("sc2TotalGame", JSON.stringify(this.totalGame));
    },
  },
  //    вычисляемые свойства
  computed: {
    totalScore() {
      let score = 0;
      for (let i in this.totalGame) {
        score += this.totalGame[i] * results[i].points;
      }
      return score;
    },
    openedFaculties() {
      let count = 0;
      for (let i in this.totalGame) {
        if (this.totalGame[i] > 0) count++;
      }
      return count;
    },
    favoritFaculty() {
      let max = "griffindor";
      for (let i in this.totalGame) {
        if (this.totalGame[i] > this.totalGame[max]) {
          max = i;
        }
      }
      return results[max].name;
    },
    showResultRace() {
      return {
        kogtevran: this.totalGame.kogtevran > 0 ? true : false,
        slizerin: this.totalGame.kogtevran > 0 ? true : false,
        griffindor: this.totalGame.kogtevran > 0 ? true : false,
        puffenduy: this.totalGame.kogtevran > 0 ? true : false,
      };
    },
  },
});
// Подключаем музыку(по умолчанию не воспроизводится)
let audioTrack = new Audio();
audioTrack.src = "audio/soundtrack.mp3";
let audio_btn = document.querySelector(".btn_sound");
let audio_icon = document.querySelector(".btn_sound i");
audioTrack.muted = true;
audioTrack.volume = 0.1;

audio_btn.addEventListener("click", function () {
  if (audioTrack.muted == true) {
    audioTrack.muted = false;
    audioTrack.play();
    audio_icon.classList.add("fa-volume-up");
    audio_icon.classList.remove("fa-volume-off");
  } else if (audioTrack.muted == false) {
    audioTrack.muted = true;
    audio_icon.classList.add("fa-volume-off");
    audio_icon.classList.remove("fa-volume-up");
  }
});
