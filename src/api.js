import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class JoblyApi {
  // the token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = 'get') {
    console.debug('API Call:', endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === 'get' ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response ? err.response.data.error.message : 'Server error: try again later';
      throw Array.isArray(message) ? message : [ message ];
    }
  }

  // Individual API routes

  /** Get a list of companies with optional search params. */

  static async getCompanies(params) {
    let res = await this.request(`companies`, { name: params });
    return res.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get a list of jobs with optional search params. */

  static async getJobs(params) {
    let res = await this.request(`jobs`, { title: params });
    return res.jobs;
  }

  /** Register a new user and add token to class. */

  static async register(userData) {
    let res = await this.request(`auth/register`, userData, 'post');
    this.token = res.token;
    return res.token;
  }

  /** Log in user and add token to class. */

  static async login(userData) {
    let res = await this.request(`auth/token`, userData, 'post');
    this.token = res.token;
    return res.token;
  }

  /** Get user details. */

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Update user details. */

  static async updateUser(userData) {
    const username = userData.username;
    const data = { ...userData };
    delete data.username;
    let res = await this.request(`users/${username}`, data, 'patch');
    return res.user;
  }
}

// for now, put token ("testuser" / "password") on class
// JoblyApi.token = process.env.REACT_APP_TOKEN;

export default JoblyApi;
