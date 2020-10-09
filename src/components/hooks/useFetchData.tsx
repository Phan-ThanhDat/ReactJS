import React from 'react';

// export const useFetchData = (uri: string) => {
//   const [data, setData] = React.useState(null);
//   const [error, setError] = React.useState(null);

//   React.useEffect(() => {
//     const handleFetch = async () => {
//       try {
//         const res = await fetch(uri);
//         const json = await res.json();

//         setData(json);
//       } catch (e) {
//         setError(e);
//       }
//     };
//     handleFetch();
//   }, [uri]);

//   return { data, error };
// };

export const useFetchAPIs = (uri: string, nameCache: string) => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const cacheStorage = await caches.open(nameCache);
        let cachedResponse = await cacheStorage.match(uri);

        if (!cachedResponse || !cachedResponse.ok) {
          await cacheStorage.add(uri);
          cachedResponse = await cacheStorage.match(uri);
        }

        const result = await cachedResponse?.json();

        setData(result);
      } catch (e) {
        setError(e);
      }
    };

    loadData();
  }, [uri]);

  return { data, error };
};
