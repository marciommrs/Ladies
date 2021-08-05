export default {
  jwt: {
    secret: process.env.APP_ENV || 'default',
    expiresIn: '1d',
  },
};
