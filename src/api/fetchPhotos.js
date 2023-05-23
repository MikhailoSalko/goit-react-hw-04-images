const BASE_URL = 'https://pixabay.com/api/';

export const fetchPhotos = (searchQuery, page = 1) => {
  const searchParams = new URLSearchParams({
    key: '34983151-308c1e13d6f3ee051936793b8',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    page,
  }).toString();

  return fetch(`${BASE_URL}?q=${searchQuery}&${searchParams}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      // console.log(response);
      return response.json();
    }
  );
};
