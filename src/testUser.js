import UserContext from './UserContext';

const testUser = {
  username     : 'testuser',
  firstName    : 'Test',
  lastName     : 'User',
  email        : 'joel@joelburton.com',
  isAdmin      : false,
  applications : []
};

const UserProvider = ({ children, user = testUser }) => (
  <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
);

export { UserProvider };
