const host = `/api/v2.0.0`;
const authorization =
  'Basic YWRtaW46OGM2OTc2ZTViNTQxMDQxNWJkZTkwOGJkNGRlZTE1ZGZiMTY3YTljODczZmM0YmI4YTgxZjZmMmFiNDQ4YTkxOA==';

const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Authorization', authorization);
headers.append('Accept-Language', 'en_US');

export const postAPI = async (url, body) => {
  try {
    const response = await fetch(`${host}${url}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    return {
      statusCode: response.status,
      rawData: result,
    };
  } catch (error) {
    console.error('POST API Error:', error);
    return null;
  }
};

export const putAPI = async (url, body) => {
  try {
    const response = await fetch(`${host}${url}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    return {
      statusCode: response.status,
      rawData: result,
    };
  } catch (error) {
    console.error('PUT API Error:', error);
    return null;
  }
};

export const getAPI = async (url) => {
  try {
    const response = await fetch(`${host}${url}`, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    return {
      statusCode: response.status,
      rawData: result,
    };
  } catch (error) {
    console.error('GET API Error:', error);
    return null;
  }
};

export const deleteAPI = async (url) => {
  try {
    const response = await fetch(`${host}${url}`, {
      method: 'DELETE',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return {
      statusCode: response.status,
      rawData: null,
    };
  } catch (error) {
    console.error('DELETE API Error:', error);
    return null;
  }
};
