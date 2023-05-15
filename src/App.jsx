import Die from "./components/Die";
import { useState } from "react";
import {nanoid} from "nanoid"


export default function App() {
  const [randomDice, setRandomDice] = useState(allNewDice());

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({ 
        value: Math.floor(Math.random() * 6) + 1, 
        isHeld: false,
        id: nanoid()
      });
    }
    console.log(newDice)
    return newDice;
  }

  function rollDice() {
    setRandomDice(allNewDice());
  }

  const diceElements = randomDice.map((die) => {
    return <Die value={die.value} key={die.id} isHeld={die.isHeld}/>;
  });

  return (
    <main
      className="w-96 h-96  bg-white
     rounded-md flex justify-center items-center"
    >
      <div className="flex flex-col items-center space-y-14">
        <div className="grid grid-cols-5 grid-rows-2 gap-x-5 gap-y-6">
          {diceElements}
        </div>
        <button
          className="bg-[#5035FF] w-24 h-9 text-white rounded shadow-lg"
          onClick={rollDice}
        >
          Roll
        </button>
      </div>
    </main>
  );
}
