'use client'

import RenderText from '@/components/RenderText'
import TypeInput from '@/components/TypeInput'
import Image from 'next/image'
import { useState } from 'react'

const text = "The question is in a way meaningless, she knows, but one must ask. Love in such situations is rarely real. Sex is the engine, exalting and ruining people, sex and frustration. Love is what people believe is worth the path of devastation."
const textArray: LetterObj[][] = text.split(" ").map(word => word.split("").map(letter => ({color: 'w', letter})))

export default function Home() {
  const [inputValue, setInputValue] = useState("")
  const [latestKeyEvent, setLatestKeyEvent] = useState("")
  return (
    <main className="min-h-screen p-24">
      <RenderText text={textArray} inputValue={inputValue} setInputValue={setInputValue} latestKeyEvent={latestKeyEvent}  />

      <div className="mt-4 w-1/2 mx-auto ">
        <TypeInput inputValue={inputValue} onInputValueChange={setInputValue} onKeyDown={setLatestKeyEvent} />
      </div>
    </main>
  )
}
