import axios from "axios";
import { baseUrl } from "./BaseURL";

export const api = {
  header: () => {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  },
  // GET Method
  getMethod: async (url, accessToken) => {
    const headers = {
      ...api.header(),
    };
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    return fetch(baseUrl + url, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          return data;
        }
      })
      .catch((err) => Promise.reject(err));
  },

  // POST Method
  postMethod: async (url, data, accessToken) => {
    const headers = {
      ...api.header(),
    };
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    console.log("Check", headers);
    return fetch(baseUrl + url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((datas) => {
        if (datas) {
          return datas;
        }
      })
      .catch((err) => Promise.resolve(err));
  },
  // PUT Method
  putMethod: async (url, data, accessToken) => {
    const headers = {
      ...api.header(),
    };
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    try {
      const response = await fetch(baseUrl + url, {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
      });

      // Optional: Check for HTTP errors (e.g. 401, 404)
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP ${response.status}: ${response.statusText} - ${errorText}`
        );
      }

      const result = await response.json();
      return result;
    } catch (err) {
      console.error("PUT request failed:", err);
      throw err;
    }
  },
  //   return fetch(baseUrl + url, {
  //     method: "PUT",
  //     headers: headers,
  //     body: JSON.stringify(data),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data) {
  //         return data;
  //       }
  //     })
  //     .catch((err) => Promise.reject(err));
  // },
  // PUT Method in NOTIFICATION
  putMethodNotification: async (url, accessToken) => {
    const headers = {
      ...api.header(),
    };
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    return fetch(baseUrl + url, {
      method: "PUT",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          return data;
        }
      })
      .catch((err) => Promise.reject(err));
  },

  // DELETE Method
  deleteMethod: async (url, accessToken) => {
    const headers = {
      ...api.header(),
    };
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    return fetch(baseUrl + url, {
      method: "DELETE",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          return data;
        }
      })
      .catch((err) => Promise.reject(err));
  },
};
