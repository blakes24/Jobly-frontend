import JoblyApi from './api';

describe('getCompany', () => {
  test('it gets a company', async () => {
    const res = await JoblyApi.getCompany('boyd-evans');
    expect(res.name).toEqual('Boyd-Evans');
  });
});

describe('getCompanies', () => {
  test('it gets a list of companies', async () => {
    const res = await JoblyApi.getCompanies();
    expect(res[0]).toHaveProperty('handle');
  });

  test('it works with params', async () => {
    const res = await JoblyApi.getCompanies('boyd');
    expect(res[0]).toHaveProperty('handle', 'boyd-evans');
  });
});

describe('getJobs', () => {
  test('it gets a list of jobs', async () => {
    const res = await JoblyApi.getJobs();
    expect(res[0]).toHaveProperty('title');
  });

  test('it works with params', async () => {
    const res = await JoblyApi.getJobs('developer');
    expect(res[0]).toHaveProperty('title', 'Applications developer');
  });
});

// describe('getUser', () => {
//   test('it gets user info', async () => {
//     JoblyApi.token = process.env.REACT_APP_TOKEN;
//     const res = await JoblyApi.getUser('testuser');
//     expect(res).toEqual({
//       username     : 'testuser',
//       firstName    : 'Test',
//       lastName     : 'User',
//       email        : 'joel@joelburton.com',
//       isAdmin      : false,
//       applications : []
//     });
//   });
// });

describe('login', () => {
  test('it gets user info', async () => {
    const res = await JoblyApi.login({ username: 'testuser', password: 'password' });
    expect(res).toEqual(expect.any(String));
  });
});
