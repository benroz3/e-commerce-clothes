const SelectComponent: React.FC<{
  label: string;
  value: string;
  options: { id: string; label: string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ label, value, options = [], onChange }) => {
  return (
    <div className="relative">
      <p className="absolute pt-0 pr-2 pb-0 pl-2 -mt-3 mb-0 ml-2 font-medium text-gray-600 bg-white">
        {label}
      </p>
      <select
        value={value}
        onChange={onChange}
        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
      >
        {options && options.length ? (
          options.map((option) => (
            <option key={option.id} id={option.id} value={value}>
              {option.label}
            </option>
          ))
        ) : (
          <option id="" value="">
            Select
          </option>
        )}
      </select>
    </div>
  );
};

export default SelectComponent;
