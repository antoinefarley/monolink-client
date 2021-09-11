// [IMPORTS]
/* folder */
import './SearchBar.scss';

import { TextBox } from '@atoms/TextBox/TextBox';
import { SearchButton } from '@components/IconButton/IconButton';

// [FUNCTIONAL COMPONENTS]
const SearchBar = (props: any) => {
  const {
    value,
    placeholder,
    onChange,
    onSearch,
    onCancel,
    inputValidityStatus = 'idle',
  } = props;
  return (
    <div
      className={`component_il20afar_input input-validity-${inputValidityStatus}`}
    >
      <TextBox
        value={value}
        inputValidityStatus={inputValidityStatus}
        placeholder={placeholder}
        onChange={onChange}
        onSearch={onSearch}
        onCancel={onCancel}
      />

      <SearchButton actionStatus={inputValidityStatus} onClick={onSearch} />
    </div>
  );
};

// [EXPORTS]
export default SearchBar;
