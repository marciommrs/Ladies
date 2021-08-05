interface ImailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal  ',

  defaults: {
    from: {
      email: 'admin@marciommrs.com',
      name: 'Administrator MMRS',
    },
  },
} as ImailConfig;
