export type GameState = "IDLE" | "PLAYER_TURN" | "ENEMY_TURN" | "ENDED"

export interface GameData {
  playerHP: number
  enemyHP: number
  turn: number
  enemyTurnCounter: number
  specialCooldown: number
  stunnedEnemy: boolean
  log: string[]
  state: GameState
  playerTurns: number
}

export type GameAction =
  | { type: "PLAYER_BASIC" }
  | { type: "PLAYER_SPECIAL" }
  | { type: "PLAYER_HEAL" }
  | { type: "PLAYER_GIVEUP" }
  | { type: "ENEMY_ACT" }
  | { type: "GAME_OVER" }
  | { type: "RESET" }

export const initialGameState: GameData = {
  playerHP: 100,
  enemyHP: 100,
  turn: 1,
  enemyTurnCounter: 0,
  specialCooldown: 0,
  stunnedEnemy: false,
  log: [],
  state: "PLAYER_TURN",
  playerTurns: 0,
}

export function gameReducer(state: GameData, action: GameAction): GameData {
  switch (action.type) {
    case "PLAYER_BASIC": {
      const damage = Math.floor(Math.random() * 6) + 5 // 5-10
      const newEnemyHP = Math.max(0, state.enemyHP - damage)
      const newLog = [...state.log, `Jogador usou Ataque Básico (-${damage} HP)`]

      if (newEnemyHP <= 0) {
        return {
          ...state,
          enemyHP: newEnemyHP,
          log: [...newLog, "Fim de jogo: vitória!"],
          state: "ENDED",
          playerTurns: state.playerTurns + 1,
        }
      }

      return {
        ...state,
        enemyHP: newEnemyHP,
        log: newLog,
        state: "ENEMY_TURN",
        playerTurns: state.playerTurns + 1,
      }
    }

    case "PLAYER_SPECIAL": {
      const damage = Math.floor(Math.random() * 11) + 10 // 10-20
      const newEnemyHP = Math.max(0, state.enemyHP - damage)
      const stunChance = Math.random() < 0.5
      const newLog = [...state.log, `Jogador usou Ataque Especial (-${damage} HP)`]

      if (stunChance) {
        newLog.push("Inimigo atordoado")
      }

      if (newEnemyHP <= 0) {
        return {
          ...state,
          enemyHP: newEnemyHP,
          log: [...newLog, "Fim de jogo: vitória!"],
          state: "ENDED",
          specialCooldown: 2,
          stunnedEnemy: stunChance,
          playerTurns: state.playerTurns + 1,
        }
      }

      return {
        ...state,
        enemyHP: newEnemyHP,
        log: newLog,
        state: "ENEMY_TURN",
        specialCooldown: 2,
        stunnedEnemy: stunChance,
        playerTurns: state.playerTurns + 1,
      }
    }

    case "PLAYER_HEAL": {
      const healAmount = Math.floor(Math.random() * 11) + 5 // 5-15
      const newPlayerHP = Math.min(100, state.playerHP + healAmount)
      const newLog = [...state.log, `Jogador usou Curar (+${healAmount} HP)`]

      return {
        ...state,
        playerHP: newPlayerHP,
        log: newLog,
        state: "ENEMY_TURN",
        playerTurns: state.playerTurns + 1,
      }
    }

    case "ENEMY_ACT": {
      if (state.stunnedEnemy) {
        return {
          ...state,
          stunnedEnemy: false,
          enemyTurnCounter: state.enemyTurnCounter + 1,
          state: "PLAYER_TURN",
          turn: state.turn + 1,
          specialCooldown: Math.max(0, state.specialCooldown - 1),
        }
      }

      const isSpecialTurn = state.enemyTurnCounter % 3 === 2
      const damage = isSpecialTurn
        ? Math.floor(Math.random() * 9) + 8 // 8-16 special
        : Math.floor(Math.random() * 7) + 6 // 6-12 basic

      const attackType = isSpecialTurn ? "Ataque Especial" : "Ataque Básico"
      const newPlayerHP = Math.max(0, state.playerHP - damage)
      const newLog = [...state.log, `Inimigo usou ${attackType} (-${damage} HP)`]

      if (newPlayerHP <= 0) {
        return {
          ...state,
          playerHP: newPlayerHP,
          log: [...newLog, "Fim de jogo: derrota!"],
          state: "ENDED",
          enemyTurnCounter: state.enemyTurnCounter + 1,
        }
      }

      return {
        ...state,
        playerHP: newPlayerHP,
        log: newLog,
        state: "PLAYER_TURN",
        turn: state.turn + 1,
        enemyTurnCounter: state.enemyTurnCounter + 1,
        specialCooldown: Math.max(0, state.specialCooldown - 1),
      }
    }

    case "PLAYER_GIVEUP": {
      return {
        ...state,
        log: [...state.log, "Jogador desistiu da batalha"],
        state: "ENDED",
      }
    }

    case "RESET": {
      return initialGameState
    }

    default:
      return state
  }
}
