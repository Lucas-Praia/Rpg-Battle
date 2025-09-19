const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3030"

export interface Player {
  id: number
  playerName: string
  date: string
  score: number
}

export interface PostScoreRequest {
  playerName: string
  lifePoints: number
  turns: number
}

export async function postScore(data: PostScoreRequest): Promise<Player> {
  const response = await fetch(`${API_BASE_URL}/players`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}

export async function getRanking(limit = 50): Promise<Player[]> {
  const response = await fetch(`${API_BASE_URL}/players?limit=${limit}`)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}
