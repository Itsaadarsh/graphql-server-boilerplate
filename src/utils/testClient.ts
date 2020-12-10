import * as req from 'request-promise';
import { jar } from 'request-promise';

export class TestClient {
  url: string;
  jar: any;
  constructor(url: string) {
    this.url = url;
    this.jar = jar;
  }

  async login(email: string, password: string) {
    return req.post(this.url, {
      json: true,
      jar: this.jar,
      withCredentials: true,
      body: {
        query: `
                mutation {
                    login(email: "${email}", password: "${password}")
                      {
                        path 
                        message
                      }
                    }
                `,
      },
    });
  }

  async register(email: string, password: string) {
    return req.post(this.url, {
      json: true,
      jar: this.jar,
      withCredentials: true,
      body: {
        query: `
                mutation {
                    register(email: "${email}", password: "${password}")
                      {
                        path 
                        message
                      }
                    }
                `,
      },
    });
  }

  async me() {
    return req.post(this.url, {
      json: true,
      jar: this.jar,
      withCredentials: true,
      body: {
        query: `
        {
          me{
            id
            email
          }
        }
                `,
      },
    });
  }

  async logout() {
    return req.post(this.url, {
      json: true,
      jar: this.jar,
      withCredentials: true,
      body: {
        query: `
            mutation {
              logout
            }
            `,
      },
    });
  }
}
