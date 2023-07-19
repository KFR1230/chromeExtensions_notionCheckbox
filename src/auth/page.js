import axios from 'axios';

const baseUrl = 'https://colorful-uniform-worm.cyclic.app';

export const postNotionLogin = async (payload) => {
  const { secretKey, databaseId } = payload;
  try {
    const res = await axios.post(`${baseUrl}/postNotionLogin`, {
      secretKey,
      databaseId,
    });
    // console.log('res:',res)
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getNotionDb = async () => {
  // const { secretKey, databaseId } = payload;
  try {
    const res = await axios.get(`${baseUrl}/getNotionDb`);
    return res.data;
  } catch (error) {
    console.log('getNotionDb failed:', error);
    return error.response.data;
  }
};

export const getNotionBlockList = async (payload) => {
  const { pageId } = payload;
  try {
    const res = await axios.get(`${baseUrl}/getNotionBlockList/?page=${pageId}`);
    return res.data;
  } catch (error) {
    console.log('getNotionBlockList failed:', error);
  }
};

export const patchCheckbox = async (payload) => {
  const { blockId, checkboxState } = payload;
  try {
    const res = await axios.patch(`${baseUrl}/patchNotionBlock`, {
      blockId,
      checkboxState,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const patchPageCheckbox = async (payload) => {
  const { pageId, checkboxState } = payload;
  try {
    const res = await axios.patch(`${baseUrl}/patchNotionProperties`, {
      pageId,
      checkboxState,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
