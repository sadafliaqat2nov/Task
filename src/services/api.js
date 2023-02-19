import { constants } from "../utilities";

export const fetchPostsList = async () => {
  try {
    const response = await fetch(constants.API_URL);
    const jsonResponse = await response.json();
    return jsonResponse
  } catch (error) {
    console.error(error);
    return [];
  }
};