export function getUserPosition() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          resolve({ lat: latitude, lng: longitude });
        },
        (err) => {
          console.error('Error getting location:', err);
          reject(err);
        }
      );
    } else {
      const error = new Error('Geolocation is not supported by this browser.');
      console.error(error);
      reject(error);
    }
  });
}
