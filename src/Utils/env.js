module.exports = {
 APPPORT: '6160',
 POOL: {
  PG: {
   DEFAULTORDER: 'DESC',
   DEFAULT_ROWS_LIMIT: 1000,
   NO_LIMIT_FLAG: -1,
   USER_NANE: 'trella',
   USER_PASSWORD: 'KTcPorI*jNb0M3$z',
   DBNAME: 'trella',
   PORT: '5432',
   HOST: 'uranus.iconsjo.space',
   MAX: 30,
  },
 },
 EMAIL: {
  BASEURL: 'https://sendmail.iconsjo.space/REST',
  mailBasket: val => val % 5,
  transport: inx => ({
   service: 'gmail',
   host: 'smtp.gmail.com',
   auth: [{ user: 'uoamobile1@gmail.com', pass: 'rdlblvuhzgrwivlp' }][inx],
  }),
 },
};
