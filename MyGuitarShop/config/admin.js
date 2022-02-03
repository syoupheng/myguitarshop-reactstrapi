module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '61ee7df40b5b283043f3a10ef8a8834c'),
  },
});
