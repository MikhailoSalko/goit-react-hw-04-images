import { Component } from 'react';
import Notiflix from 'notiflix';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import { ModalPhoto } from './ModalPhoto/ModalPhoto';
import Button from './Button/Button';
import { fetchPhotos } from '../api/fetchPhotos';

Notiflix.Report.init({
  width: '400px',
  titleFontSize: '16px',
  titleMaxLength: 50,
});

Notiflix.Notify.init({
  distance: '5px',
  width: '450px',
  fontSize: '18px',
  timeout: 4000,
});

class App extends Component {
  state = {
    searchQuery: '',
    hits: [],
    page: 1,
    error: null,
    isLoading: false,
    showModal: false,
    modalPhoto: null,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery: prevSearchQuery, page: prevPage } = prevState;
    const { searchQuery: newSearchQuery, page: nextPage } = this.state;

    if (prevSearchQuery !== newSearchQuery || prevPage !== nextPage) {
      // console.log(this.state.searchQuery);
      this.setState({ isLoading: true });
      fetchPhotos(newSearchQuery, nextPage)
        .then(data => {
          // console.log(data);
          if (data.total === 0) {
            return Notiflix.Report.info('There are no photos per your request');
          }
          return this.setState(({ hits }) => {
            return { hits: [...hits, ...data.hits] };
          });
        })
        .catch(error => this.setState({ error: error.message }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  getSearchQuery = searchQuery => {
    if (searchQuery === this.state.searchQuery) {
      return Notiflix.Notify.info(
        'We are already showing photos at your request'
      );
    }

    return this.setState({ searchQuery, hits: [], page: 1 });
  };

  updatePageByLoadMoreBtn = () => {
    this.setState(({ page }) => {
      return { page: page + 1 };
    });
  };

  openModal = ({ largeImageURL, tags }) => {
    this.setState({
      showModal: true,
      modalPhoto: {
        largeImageURL,
        tags,
      },
    });
  };

  closeModal = () => {
    this.setState({ showModal: false, modalPhoto: null });
  };

  render() {
    const { hits, isLoading, showModal, error, modalPhoto } = this.state;

    return (
      <div
        style={{
          height: '100px',
          fontSize: 40,
          color: '#010101',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        {error &&
          Notiflix.Report.failure(
            'Something went wrong, please try again later'
          )}
        <Searchbar onSubmit={this.getSearchQuery} />
        <ImageGallery hits={hits} onClick={this.openModal} />
        {showModal && (
          <Modal onClose={this.closeModal}>
            <ModalPhoto {...modalPhoto} />
          </Modal>
        )}
        {hits.length > 0 && <Button onClick={this.updatePageByLoadMoreBtn} />}
        {isLoading && <Loader />}
      </div>
    );
  }
}

export default App;
