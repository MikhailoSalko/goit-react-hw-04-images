import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, tags, onClick, largeImageURL }) => {
  return (
    <li
      className={styles.imageGalleryItem}
      onClick={() => onClick({ largeImageURL, tags })}
    >
      <img src={src} alt={tags} className={styles.imageGalleryItemImage} />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
