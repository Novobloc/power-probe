import { Axios } from "./http-handler"

export const getHealthStatusNode = () => {
    // Send GET request to "/health" endpoint
    return Axios.get("/health")
      .then(response => {
        // Return response data
        return response.data;
      })
      .catch(error => {
        // Handle errors, e.g., log error messages
        console.error("Error fetching health status:", error);
        // Return an empty object or any other default value as needed
        return {};
      });
  };