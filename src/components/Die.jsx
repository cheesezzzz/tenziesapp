
export default function Die(props) {
  const styles = props.isHeld ? "bg-[#59E391]" : "bg-white"
  


  return (
    <div onClick={() => props.holdDice(props.id)} className={`w-10 h-12 shadow-md rounded flex justify-center items-center text-black
     ${styles}`}>
      <h2 className="font-bold text-xl">{props.value}</h2>
    </div>
  );
}
