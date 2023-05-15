
export default function Die(props) {
  const styles = props.isHeld ? "bg-[#59E391]" : "bg-white"
  
  return (
    <div className={`w-10 h-12 shadow-md rounded flex justify-center items-center ${styles}`}>
      <h2 className="font-bold text-xl">{props.value}</h2>
    </div>
  );
}
