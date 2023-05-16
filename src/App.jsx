import Die from "./components/Die";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

export default function App() {
  const [randomDice, setRandomDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    // TODO fix the logic for this
    randomDice.forEach((die) => {
      if (die.isHeld && die.value) {
        setTenzies(true);
        console.log("You won!");
      }
    });
  }, [randomDice]);

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    };
  }

  function holdDice(id) {
    setRandomDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function rollDice() {
    setRandomDice((oldDice) =>
      oldDice.map((existingDice) => {
        return existingDice.isHeld ? existingDice : generateNewDie();
      })
    );
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  const diceElements = randomDice.map((die) => {
    return (
      <Die
        holdDice={holdDice}
        id={die.id}
        value={die.value}
        key={die.id}
        isHeld={die.isHeld}
      />
    );
  });

  return (
    <main
      className="w-96 h-96  bg-white
     rounded-md flex flex-col justify-center items-center"
    >
      <h1 className="text-2xl font-bold">Tenzies</h1>
      <p className="text-center text-sm max-w-xs">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="flex flex-col items-center space-y-14 mt-5">
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
