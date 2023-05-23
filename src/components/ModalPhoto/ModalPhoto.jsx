import PropTypes from 'prop-types';

export const ModalPhoto = ({ largeImageURL, tags }) => {
  return <img src={largeImageURL} alt={tags} />;
};

ModalPhoto.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
