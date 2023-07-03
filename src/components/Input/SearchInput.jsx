import Input from './Input';

const SearchInput = (inputProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-[10px] flex items-center pl-3 pointer-events-none">
        <svg
          aria-hidden="true"
          className="w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <Input type="search" autoComplete="off" placeholder="Search" {...inputProps} />
    </div>
  );
};

export default SearchInput;
