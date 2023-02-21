class cons {
  static secure = 's';
  static domain = 'https://api.veenme.com';
  static default_part = 'index.php/v1';
}

export const Config = {
  SERVICEURL: `http${cons.secure}://${cons.domain}/${cons.default_part}`,
};
