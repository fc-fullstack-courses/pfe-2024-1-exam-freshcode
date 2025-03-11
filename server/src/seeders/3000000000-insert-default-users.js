const bcrypt = require('bcrypt');
const {
  USER_ROLES,
  SALT_ROUNDS,
  DEFAULT_CREATOR_EMAIL,
  DEFAULT_CREATOR_PASSWORD,
  DEFAULT_CUSTOMER_EMAIL,
  DEFAULT_CUSTOMER_PASSWORD,
} = require('../constants');

console.log(DEFAULT_CUSTOMER_EMAIL);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'User',
          lastName: 'Buyer',
          displayName: 'userBuyer',
          email: DEFAULT_CREATOR_EMAIL,
          password: bcrypt.hashSync(DEFAULT_CREATOR_PASSWORD, SALT_ROUNDS),
          role: USER_ROLES.CUSTOMER,
        },
        {
          firstName: 'User',
          lastName: 'Creator',
          displayName: 'userCreator',
          email: DEFAULT_CUSTOMER_EMAIL,
          password: bcrypt.hashSync(DEFAULT_CUSTOMER_PASSWORD, SALT_ROUNDS),
          role: USER_ROLES.CREATOR,
        },
      ],
      {},
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'Users',
      {
        email: {
          [Sequelize.Op.in]: [DEFAULT_CREATOR_EMAIL, DEFAULT_CUSTOMER_EMAIL],
        },
      },
      {},
    );
  },
};
