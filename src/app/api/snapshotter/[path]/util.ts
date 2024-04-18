import { Axios } from './http-handler';

export const getHealthStatusNode = () => {
  // Send GET request to "/health" endpoint
  return Axios.get('/health')
    .then((response) => {
      // Return response data
      return response.data;
    })
    .catch((error) => {
      // Handle errors, e.g., log error messages
      console.error('Error fetching health status:', error);
      // Return an empty object or any other default value as needed
      return {};
    });
};

export const getCurrentEpoch = () => {
  // Send GET request to "/health" endpoint
  return Axios.get('/current_epoch')
    .then((response) => {
      // Return response data
      return response.data;
    })
    .catch((error) => {
      // Handle errors, e.g., log error messages
      console.error('Error fetching current_epoch:', error);
      // Return an empty object or any other default value as needed
      return {};
    });
};

export const getEpochByID = (id: string) => {
  // Send GET request to "/health" endpoint
  return Axios.get(`/epoch/${id}`) // eg: 9103
    .then((response) => {
      // Return response data
      return response.data;
    })
    .catch((error) => {
      // Handle errors, e.g., log error messages
      console.error('Error fetching epoch by id:', error);
      // Return an empty object or any other default value as needed
      return {};
    });
};

export const getSnapshotterStatus = () => {
  // Send GET request to "/health" endpoint
  return Axios.get('/internal/snapshotter/status')
    .then((response) => {
      // Return response data
      return response.data;
    })
    .catch((error) => {
      // Handle errors, e.g., log error messages
      console.error('Error fetching snapshotter status:', error);
      // Return an empty object or any other default value as needed
      return {};
    });
};

export const getSnapshotterEpochProcessingStatus = () => {
  // Send GET request to "/health" endpoint
  return Axios.get('/internal/snapshotter/epochProcessingStatus?page=1&size=10')
    .then((response) => {
      // Return response data
      return response.data;
    })
    .catch((error) => {
      // Handle errors, e.g., log error messages
      console.error('Error fetching epoch processing status:', error);
      // Return an empty object or any other default value as needed
      return {};
    });
};

export const getSnapshotterTaskStatus = (task_type: string, wallet_address: string) => {
  // Send GET request to "/health" endpoint
  const requestBody = { task_type, wallet_address };
  return Axios.post('/task_status', { requestBody })
    .then((response) => {
      // Return response data
      return response.data;
    })
    .catch((error) => {
      // Handle errors, e.g., log error messages
      console.error('Error fetching epoch processing status:', error.message);
      // Return an empty object or any other default value as needed
      return {};
    });
};
