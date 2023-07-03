const Input = ({ ...inputProps }) => {
  return (
    <input
      {...inputProps}
      className="h-10 w-[95%] pl-10 m-[10px] text-sm text-white border border-gray-600 rounded-lg bg-gray-700"
    />
  );
};

export default Input;
