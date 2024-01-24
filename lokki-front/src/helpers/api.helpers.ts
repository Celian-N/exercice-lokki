export const fetchData = async <T>(
  url: string
): Promise<{ error?: string; result: T | null }> => {
  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.result) return data;
      return { result: data };
    })
    .catch((error) => {
      console.error("Error:", error);
      return { error, result: null };
    });
};
