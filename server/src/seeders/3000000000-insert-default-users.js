const bcrypt = require('bcrypt');
const { USER_ROLES, SALT_ROUNDS } = require('../constants');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'User',
        lastName: 'Buyer',
        displayName: 'userBuyer',
        email: 'userBuyer@mail.com',
        password: bcrypt.hashSync('userBuyer@mail.com', SALT_ROUNDS),
        role: USER_ROLES.CUSTOMER,
      },
      {
        firstName: 'User',
        lastName: 'Creator',
        displayName: 'userCreator',
        email: 'userCreator@mail.com',
        password: bcrypt.hashSync('userCreator@mail.com', SALT_ROUNDS),
        role: USER_ROLES.CREATOR,
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.buldDelete('Users', {
      email: {
        [Sequelize.Op.in]: ['userBuyer@mail.com', 'userCreator@mail.com'],
      },
    }, {});
  },
};
