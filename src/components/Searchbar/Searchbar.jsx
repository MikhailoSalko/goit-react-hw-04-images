import { useState } from 'react';
import { Report } from 'notiflix';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = e => {
    const searchQuery = e.target.value.trim();
    setSearchQuery(searchQuery);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    if (searchQuery === '') {
      Report.info('Please, enter searchquery.');
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm} onSubmit={handleSubmitForm}>
        <button type="submit" className={styles.searchFormButton}>
          <span className={styles.searchFormButtonLabel}>Search</span>
        </button>

        <input
          onChange={handleInputChange}
          className={styles.searchFormInput}
          value={searchQuery}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

// class Searchbar extends Component {
//   state = {
//     searchQuery: '',
//   };

// handleInputChange = e => {
//   const searchQuery = e.target.value.trim();
//   this.setState({ searchQuery });
// };

// handleSubmitForm = e => {
//   e.preventDefault();
//   if (this.state.searchQuery === '') {
//     Report.info('Please, enter searchquery.');
//     return;
//   }
//   this.props.onSubmit(this.state.searchQuery);
// };

//   render() {
//     const { searchQuery } = this.state;
// return (
//   <header className={styles.searchbar}>
//     <form className={styles.searchForm} onSubmit={this.handleSubmitForm}>
//       <button type="submit" className={styles.searchFormButton}>
//         <span className={styles.searchFormButtonLabel}>Search</span>
//       </button>

//       <input
//         onChange={this.handleInputChange}
//         className={styles.searchFormInput}
//         value={searchQuery}
//         type="text"
//         autoComplete="off"
//         autoFocus
//         placeholder="Search images and photos"
//       />
//     </form>
//   </header>
// );
//   }
// }
