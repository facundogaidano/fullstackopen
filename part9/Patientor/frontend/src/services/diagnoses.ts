import axios from 'axios';

import { apiBaseUrl } from "../constants"

const getAll = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/diagnoses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching diagnoses:', error);
    return [];
  }
};

export default {
  getAll,
};