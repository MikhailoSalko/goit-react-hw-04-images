import { useState, useEffect } from 'react';
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

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalPhoto, setModalPhoto] = useState(null);

  const getSearchQuery = search => {
    if (search === searchQuery) {
      return Notiflix.Notify.info(
        'We are already showing photos at your request'
      );
    }
    setSearchQuery(search);
    setHits([]);
    setPage(1);
    return;
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setLoading(true);
    fetchPhotos(searchQuery, page)
      .then(({ hits, total }) => {
        if (total === 0) {
          return Notiflix.Report.info('There are no photos per your request');
        }
        return setHits(prevHits => {
          return [...prevHits, ...hits];
        });
      })
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, [searchQuery, page]);

  const updatePageByLoadMoreBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = ({ largeImageURL, tags }) => {
    setShowModal(true);
    setModalPhoto({
      largeImageURL,
      tags,
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setModalPhoto(null);
  };

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
        Notiflix.Report.failure('Something went wrong, please try again later')}
      <Searchbar onSubmit={getSearchQuery} />
      <ImageGallery hits={hits} onClick={openModal} />
      {showModal && (
        <Modal onClose={closeModal}>
          <ModalPhoto {...modalPhoto} />
        </Modal>
      )}
      {hits.length > 0 && <Button onClick={updatePageByLoadMoreBtn} />}
      {loading && <Loader />}
    </div>
  );
}

export default App;
