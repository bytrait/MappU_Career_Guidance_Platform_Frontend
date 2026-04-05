export default function OptionRadioGroup({ name, value, onChange, options }) {
  return (
    <div className="flex flex-wrap gap-2 w-full flex-col sm:flex-row">
      {options.map((opt) => (
        <label
          key={opt.id}
          className={`
            flex-1 px-4 py-2 rounded-lg cursor-pointer text-center whitespace-nowrap border
            transition-all duration-300 ease-in-out
            ${value === opt.value
              ? "bg-primary text-blue-50 border-blue-500 shadow-md" 
              : "bg-primary-light text-primary border-blue-200 hover:bg-blue-100"}
          `}
          style={{ minWidth: 0, flexGrow: 1, flexBasis: "auto" }}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="hidden"
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}
