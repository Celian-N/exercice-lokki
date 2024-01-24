export const fetchData = async (url: string) => {
  return await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return { result: data };
    })
    .catch((error) => {
      console.error('Error:', error);
      return { error, result: null };
    });
};
