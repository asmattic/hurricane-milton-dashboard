import axios from 'axios';

export const fetchHurricaneData = async () => {
  const { data } = await axios.get('/api/hurricane');
  return data;
};