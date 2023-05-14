import PropTypes from "prop-types";

export default function Die(props) {
  return (
    <div className="w-8 h-9 shadow-md rounded flex justify-center items-center">
      <h2 className="font-bold text-xl">{props.value}</h2>
    </div>
  );
}

Die.propTypes = {
  value: PropTypes.string.isRequired,
};
