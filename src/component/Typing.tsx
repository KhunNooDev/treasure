'use client'
import React, { useRef, useState, useEffect } from 'react'
import { handleTTS } from '@/util/textToSpeechUtils'
import { FaPlay, FaHome, FaRedo, FaVolumeUp } from 'react-icons/fa'
import words from '@/data/words.json'
import { useRouter } from 'next/navigation'

interface Word {
  text: string
}

export default function Typing({ tag }: { tag: string }) {
  const router = useRouter()
  const [randomWords, setRandomWords] = useState<Word[]>([])
  const [wordIdx, setWordIdx] = useState(-1)
  const [currentWord, setCurrentWord] = useState<string>('')
  const [inputValues, setInputValues] = useState<string[]>([])
  const [hiddenWord, setHiddenWord] = useState('')
  const [started, setStarted] = useState(false)
  const [endGame, setEndGame] = useState(false)
  const [score, setScore] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState<string[]>([])
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    initializeGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initializeGame = () => {
    const shuffledWords = words
      .filter((word) => word.tags.includes(tag))
      .sort(() => 0.5 - Math.random())
      .slice(0, 10)
    setRandomWords(shuffledWords)
    setCurrentWord(shuffledWords[0].text)
  }

  const handleStart = () => {
    setStarted(true)
    nextWord()
  }

  const handlePlayAgain = () => {
    initializeGame()
    setWordIdx(-1)
    setInputValues([])
    setHiddenWord('')
    setStarted(false)
    setEndGame(false)
    setScore(0)
    setWrongAnswers([])
  }

  const nextWord = () => {
    setWordIdx((prevIdx) => prevIdx + 1)
    if (wordIdx >= randomWords.length - 1) {
      setEndGame(true)
    } else {
      const word = randomWords[wordIdx + 1]?.text
      setCurrentWord(word)
      inputsRef.current[0]?.focus()
      setHiddenWord(hideLetters(word))
      handleTTS(word)
    }
  }

  const hideLetters = (word: string): string => {
    const numLettersToHide = Math.floor(word.length / 2)
    const indicesToHide = new Set<number>()
    while (indicesToHide.size < numLettersToHide) {
      const randomIndex = Math.floor(Math.random() * word.length)
      indicesToHide.add(randomIndex)
    }
    return word
      .split('')
      .map((letter, idx) => (indicesToHide.has(idx) ? ' _ ' : letter))
      .join('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && e.currentTarget.value === '') {
      if (idx > 0) {
        inputsRef.current[idx - 1]?.focus()
      }
    }
    if (e.key === 'Enter') {
      const inputWord = inputValues.join('')
      if (inputWord.toLowerCase() === currentWord.toLowerCase()) {
        setScore((prevScore) => prevScore + 1)
      } else {
        setWrongAnswers([...wrongAnswers, currentWord])
      }
      resetInputs()
      nextWord()
    }
  }

  const resetInputs = () => {
    setInputValues([])
    inputsRef.current.forEach((input) => {
      if (input) {
        input.value = ''
      }
    })
  }

  const handleInput = (e: React.FormEvent<HTMLInputElement>, idx: number) => {
    const nextInput = inputsRef.current[idx + 1]
    const newInputValues = [...inputValues]
    newInputValues[idx] = e.currentTarget.value
    setInputValues(newInputValues)
    if (e.currentTarget.value.length === 1 && nextInput) {
      nextInput.focus()
    }
  }

  return (
    <div className='flex justify-center'>
      {!started && !endGame && (
        <section className='flex flex-col items-center gap-2'>
          <h1 className='text-2xl font-bold'>Typing Game</h1>
          <p>Click the button below to start the game.</p>
          <div className='flex flex-col justify-center gap-2'>
            <button
              onClick={handleStart}
              className='flex items-center justify-center gap-2 rounded-md border border-gray-300 p-2'
            >
              <FaPlay /> <p>{`Let's Start`}</p>
            </button>
            <button
              onClick={() => router.push('/')}
              className='flex items-center justify-center gap-2 rounded-md border border-gray-300 p-2'
            >
              <FaHome /> Back to Home
            </button>
          </div>
        </section>
      )}
      {started && hiddenWord && !endGame && (
        <section className='flex flex-col items-center gap-2'>
          <div className='flex gap-2'>
            <h1 className='text-4xl font-bold'>{hiddenWord}</h1>
            <button
              onClick={(e) => {
                e.currentTarget.blur()
                inputsRef.current[0]?.focus()
                handleTTS(currentWord)
              }}
              className='flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100'
            >
              <FaVolumeUp />
            </button>
          </div>

          <div className='flex flex-wrap justify-center gap-1'>
            {[...Array(currentWord.length)].map((_, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputsRef.current[idx] = el
                }}
                className='h-12 w-12 border text-center'
                maxLength={1}
                autoFocus={idx === 0}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onInput={(e) => handleInput(e, idx)}
              />
            ))}
          </div>
        </section>
      )}

      {endGame && (
        <section className='flex flex-col items-center gap-2'>
          <h1 className='text-2xl font-bold'>Summary</h1>
          <p>
            Score: {score} / {randomWords.length}
          </p>
          {wrongAnswers.length > 0 && (
            <>
              <h2>Wrong Answers:</h2>
              <ul>
                {wrongAnswers.map((wrongWord, idx) => (
                  <li className='list-disc' key={idx}>
                    {wrongWord}
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className='flex flex-col justify-center gap-2'>
            <button
              onClick={handlePlayAgain}
              className='flex items-center justify-center gap-2 rounded-md border border-gray-300 p-2'
            >
              <FaRedo /> Play Again
            </button>
            <button
              onClick={() => router.push('/')}
              className='flex items-center justify-center gap-2 rounded-md border border-gray-300 p-2'
            >
              <FaHome /> Back to Home
            </button>
          </div>
        </section>
      )}
    </div>
  )
}
