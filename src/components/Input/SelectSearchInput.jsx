import { filter, includes, map, startsWith } from 'lodash';
import SearchInput from './SearchInput';
import { useState } from 'react';
import Badge from '../Badge';

const SelectSearchInput = ({
  options: initialOptions,
  selectedOptions = [],
  onSelect,
  onRemove,
  ...inputProps
}) => {
  const [options, setOptions] = useState(initialOptions);
  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(false);

  const handleFocus = () => setFocused(true);
  const handleBlur = () => {
    // To make sure that the blur happens after select
    setTimeout(() => {
      setFocused(false);
    }, 200);
  };

  const handleSearchChange = (ev) => {
    const value = ev.target.value;

    setSearch(value);
    setOptions(
      filter(initialOptions, (opt) => {
        return startsWith(opt.toLowerCase(), value.toLowerCase());
      })
    );
  };

  const filterOptions = (currentSelectOptions) => {
    return filter(initialOptions, (opt) => !includes(currentSelectOptions, opt));
  };

  const handleSelect = (ev) => {
    const currentSelectOptions = [...selectedOptions, ev.target.innerHTML];
    onSelect(ev.target.innerHTML);
    setFocused(false);
    setSearch('');
    setOptions(filterOptions(currentSelectOptions));
  };

  const handleRemove = (synergy) => {
    onRemove(synergy);
    const currentSelectOptions = filter(selectedOptions, (opt) => opt !== synergy);
    setOptions(filterOptions(currentSelectOptions));
  };

  return (
    <div className="relative">
      <SearchInput
        autoComplete="off"
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={search}
        onChange={handleSearchChange}
        {...inputProps}
      />
      {focused && options.length !== 0 && (
        <div className="absolute w-[95%] z-10 bg-gray-700 rounded-lg mx-[10px] mt-[-5px]">
          <ul className="text-sm py-2 text-gray-200 max-h-52 overflow-hidden overflow-y-auto">
            {map(options, (option) => (
              <li
                key={option}
                className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
                onClick={handleSelect}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="py-2 mx-[10px]">
        {map(selectedOptions, (option) => (
          <Badge key={option} value={option} onClick={handleRemove} />
        ))}
      </div>
    </div>
  );
};

export default SelectSearchInput;
