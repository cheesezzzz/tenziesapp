import Die from "./components/Die";
import { useEffect, useState } from "react";
import { nanoid, random } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [randomDice, setRandomDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rolls, setRolls] = useState(0)

  useEffect(() => {
    const allHeld = randomDice.every((die) => die.isHeld);
    const firstValue = randomDice[0].value;
    const allSameValue = randomDice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You won!");
    }
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
    // if(tenzies) {
    //   setTenzies(false)
    //   setRandomDice((prevDice) => 
    //     prevDice.map((existingDice) => {
    //       return existingDice.isHeld && !existingDice.isHeld && generateNewDie()
    //     })
    //   )
    // }

    if(!tenzies) {
      setRolls(prevRoll => prevRoll + 1)
      setRandomDice((oldDice) =>
        oldDice.map((existingDice) => {
          return existingDice.isHeld ? existingDice : generateNewDie();
        })
      );
    } else {
      setRolls(0)
      setTenzies(false)
      setRandomDice(allNewDice())
    }
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
      {tenzies && <Confetti />}
      <h1 className="text-2xl font-bold">{tenzies ? 'YOU WON!!!' : 'Tenzies'}</h1>
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
          {tenzies ? "New Game" : "Roll"}
        </button>
        
      </div>
      <div className=" pt-4 flex space-x-4">
        {/* Roll Tracker */}
        <div>
          Rolls: {rolls} 
        </div>
      </div>
    </main>
  );
}
