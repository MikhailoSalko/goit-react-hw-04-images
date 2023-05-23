import { Component } from 'react';
import { Report } from 'notiflix';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleInputChange = e => {
    const searchQuery = e.target.value.trim();
    this.setState({ searchQuery });
  };

  handleSubmitForm = e => {
    e.preventDefault();
    if (this.state.searchQuery === '') {
      Report.info('Please, enter searchquery.');
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={this.handleSubmitForm}>
          <button type="submit" className={styles.searchFormButton}>
            <span className={styles.searchFormButtonLabel}>Search</span>
          </button>

          <input
            onChange={this.handleInputChange}
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
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
