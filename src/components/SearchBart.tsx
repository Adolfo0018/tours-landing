type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const SearchBar = ({ value, onChange, placeholder = "Search..." }: Props) => {
  return (
    <div className="position-relative mb-4">
      <input
        className="form-control ps-5"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {/* Search icon */}
      <span
        className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted"
        style={{ pointerEvents: "none" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242.656a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
        </svg>
      </span>
    </div>
  );
};

export default SearchBar;