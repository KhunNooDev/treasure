'use client'
import React, { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@nanostores/react'
import _ from 'lodash'
import words from '@/data/words.json'
import { handleTTS } from '@/lib/textToSpeechUtils'
import { $user, savePerformance } from '@/store/userStore'
import { setHideNav } from '@/store/layoutStore'
import { Play, Home, Volume2, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

interface Word {
  text: string
}

export default function Typing({ tag }: { tag: string }) {
  const router = useRouter()
  const user = useStore($user)
  const [randomWords, setRandomWords] = useState<Word[]>([])
  const [wordIdx, setWordIdx] = useState(0)
  const [currentWord, setCurrentWord] = useState<string>('')
  const [inputValues, setInputValues] = useState<string[]>([])
  const [hiddenWord, setHiddenWord] = useState('')
  const [started, setStarted] = useState(false)
  const [endGame, setEndGame] = useState(false)
  const [score, setScore] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState<string[]>([])
  const [showFullWord, setShowFullWord] = useState(false)
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    initializeGame()
    setHideNav(true)
    return () => {
      setHideNav(false)
    }
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
    setWordIdx(0)
    setInputValues([])
    setHiddenWord('')
    setStarted(false)
    setEndGame(false)
    setScore(0)
    setWrongAnswers([])
  }

  const nextWord = (currentIdx: number = 0, currentScore: number = 0) => {
    setWordIdx(currentIdx)
    if (currentIdx > randomWords.length - 1) {
      setEndGame(true)
      if (!showFullWord) {
        //save only correct words
        savePerformance(
          tag,
          randomWords.filter((_, idx) => !wrongAnswers.includes(randomWords[idx].text)).map((word) => word.text),
        )
      }
    } else {
      const word = randomWords[currentIdx]?.text
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
      let _score = score
      const inputWord = inputValues.join('')
      if (inputWord.toLowerCase() === currentWord.toLowerCase()) {
        _score += 1
        setScore(_score)
      } else {
        setWrongAnswers([...wrongAnswers, currentWord])
      }
      resetInputs()
      nextWord(wordIdx + 1, _score)
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

  const learnedWords = user.performance.find((p: { tag: string }) => p.tag === tag)?.learnedWords.length || 0
  const totalWords = words.filter((word) => word.tags.includes(tag)).length
  return (
    <div className='flex justify-center'>
      {!started && !endGame && (
        <section className='flex flex-col items-center gap-2'>
          <h1 className='text-2xl font-bold'>Typing Game</h1>
          <p className='text-lg font-bold'>Tag: {_.startCase(tag)}</p>
          <p>
            {learnedWords} / {totalWords}
          </p>
          <div className='flex items-center gap-2'>
            <Switch checked={showFullWord} onCheckedChange={setShowFullWord} />
            <div className='flex flex-col'>
              <p>Show Full Word</p>
              <p className='text-sm text-gray-500'>(For learning only, not saved)</p>
            </div>
          </div>
          <div className='flex flex-col justify-center gap-2'>
            <Button onClick={handleStart}>
              <Play size={16} className='mr-2' /> <p>{`Let's Start`}</p>
            </Button>
            <Button onClick={() => router.push('/')}>
              <Home size={16} className='mr-2' /> Back to Home
            </Button>
          </div>
        </section>
      )}
      {started && hiddenWord && !endGame && (
        <section className='flex flex-col items-center gap-2'>
          <div className='flex flex-col items-center gap-2'>
            <h1 className='text-4xl font-bold'>{showFullWord ? currentWord : hiddenWord}</h1>
            <Button
              onClick={(e) => {
                e.currentTarget.blur()
                inputsRef.current[0]?.focus()
                handleTTS(currentWord)
              }}
              size='icon'
              className='rounded-full'
            >
              <Volume2 />
            </Button>
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
            <Button onClick={handlePlayAgain}>
              <RotateCcw size={16} className='mr-2' /> Play Again
            </Button>
            <Button onClick={() => router.push('/')}>
              <Home size={16} className='mr-2' /> Back to Home
            </Button>
          </div>
        </section>
      )}
    </div>
  )
}
