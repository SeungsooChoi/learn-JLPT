export type JLPTLevel = "N5" | "N4" | "N3" | "N2" | "N1"

/**
 * 단어 interface
 * 항목은 변경될 수 있다.
 */
export interface Word {
  id: string
  word: string
  reading: string
  meaning: string
  level: JLPTLevel
  part_of_speech?: string
  example_sentence?: string
  example_reading?: string
  example_translation?: string
  audio_url?: string
  created_at: string
}
