const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      currentRound: 0,
      winner: null,
      battleLog: [],
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // game draw
        this.winner = "draw";
      } else if (value <= 0) {
        // player lost
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // game draw
        this.winner = "draw";
      } else if (value <= 0) {
        // monster lost lost
        this.winner = "player";
      }
    },
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    spcialAttackButtonState() {
      return this.currentRound % 3 !== 0;
    },
  },
  methods: {
    startGame() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.battleLog = [];
    },
    attackMonster() {
      // value between 12 and 5
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.addMessageLog("player", "attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      // value between 15 and 8
      const attackValue = getRandomValue(8, 15);
      this.addMessageLog("monster", "attack", attackValue);
      this.playerHealth -= attackValue;
    },
    specialAttackMonster() {
      // value between 10 and 25
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.addMessageLog("player", "special attack", attackValue);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addMessageLog("player", "heal", healValue);
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
    },
    addMessageLog(who, what, value) {
      this.battleLog.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// vanilla code

let message = "hello";
let longMessage = message + "world";
console.log(longMessage);

message = "world";

console.log(longMessage);

let data = {
  name: "abhishek",
  last: "kumar",
};

const handler = {
  set(target, key, value) {
    if (key === "last") {
      target[key] = value;
    }
  },
};

let proxy = new Proxy(data, handler);

proxy.last = "demo";

console.log(proxy);
