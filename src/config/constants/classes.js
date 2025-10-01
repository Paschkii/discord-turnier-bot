const { resolveDiscordEmoji } = require('./shared');

const KLASSE_LISTE = [
  {
    id: 'cra',
    emoji: resolveDiscordEmoji('cra', '🏹'),
    name: 'Cra',
    nameLocalized: { de: 'Cra', en: 'Cra', fr: 'Crâ', es: 'Ocra', pt: 'Cra' },
  }, // Discord-Emoji :cra:
  {
    id: 'ecaflip',
    emoji: resolveDiscordEmoji('ecaflip', '🎲'),
    name: 'Ecaflip',
    nameLocalized: { de: 'Ecaflip', en: 'Ecaflip', fr: 'Ecaflip', es: 'Zurcarák', pt: 'Ecaflip' },
  }, // Discord-Emoji :ecaflip:
  {
    id: 'eniripsa',
    emoji: resolveDiscordEmoji('eniripsa', '🩹'),
    name: 'Eniripsa',
    nameLocalized: { de: 'Eniripsa', en: 'Eniripsa', fr: 'Eniripsa', es: 'Aniripsa', pt: 'Eniripsa' },
  }, // Discord-Emoji :eniripsa:
  {
    id: 'enutrof',
    emoji: resolveDiscordEmoji('enutrof', '💰'),
    name: 'Enutrof',
    nameLocalized: { de: 'Enutrof', en: 'Enutrof', fr: 'Enutrof', es: 'Anutrof', pt: 'Enutrof' },
  }, // Discord-Emoji :enutrof:
  {
    id: 'feca',
    emoji: resolveDiscordEmoji('feca', '🛡️'),
    name: 'Feca',
    nameLocalized: { de: 'Feca', en: 'Feca', fr: 'Féca', es: 'Feca', pt: 'Feca' },
  }, // Discord-Emoji :feca:
  {
    id: 'rogue',
    emoji: resolveDiscordEmoji('rogue', '💣'),
    name: 'Halsabschneider',
    nameLocalized: { de: 'Halsabschneider', en: 'Rogue', fr: 'Roublard', es: 'Tymador', pt: 'Roublardes' },
  }, // Discord-Emoji :rogue:
  {
    id: 'iop',
    emoji: resolveDiscordEmoji('iop', '🗡'),
    name: 'Iop',
    nameLocalized: { de: 'Iop', en: 'Iop', fr: 'Iop', es: 'Yopuka', pt: 'Iop' },
  }, // Discord-Emoji :iop:
  {
    id: 'masqueraider',
    emoji: resolveDiscordEmoji('masqueraider', '🎭'),
    name: 'Maskerador',
    nameLocalized: { de: 'Maskerador', en: 'Masqueraider', fr: 'Zobal', es: 'Zobal', pt: 'Zobai' },
  }, // Discord-Emoji :masqueraider:
  {
    id: 'osamodas',
    emoji: resolveDiscordEmoji('osamodas', '🐉'),
    name: 'Osamodas',
    nameLocalized: { de: 'Osamodas', en: 'Osamodas', fr: 'Osamodas', es: 'Osamodas', pt: 'Osamodas' },
  }, // Discord-Emoji :osamodas:
  {
    id: 'pandawa',
    emoji: resolveDiscordEmoji('pandawa', '🐼'),
    name: 'Pandawa',
    nameLocalized: { de: 'Pandawa', en: 'Pandawa', fr: 'Pandawa', es: 'Pandawa', pt: 'Pandawa' },
  }, // Discord-Emoji :pandawa:
  {
    id: 'sacrieur',
    emoji: resolveDiscordEmoji('sacrieur', '🩸'),
    name: 'Sacrieur',
    nameLocalized: { de: 'Sacrieur', en: 'Sacrier', fr: 'Sacrieur', es: 'Sacrógrito', pt: 'Sacrier' },
  }, // Discord-Emoji :sacrieur:
  {
    id: 'sadida',
    emoji: resolveDiscordEmoji('sadida', '🌱'),
    name: 'Sadida',
    nameLocalized: { de: 'Sadida', en: 'Sadida', fr: 'Sadida', es: 'Sadida', pt: 'Sadida' },
  }, // Discord-Emoji :sadida:
  {
    id: 'sram',
    emoji: resolveDiscordEmoji('sram', '💀'),
    name: 'Sram',
    nameLocalized: { de: 'Sram', en: 'Sram', fr: 'Sram', es: 'Sram', pt: 'Sram' },
  }, // Discord-Emoji :sram:
  {
    id: 'foggernaut',
    emoji: resolveDiscordEmoji('foggernaut', '🚂'),
    name: 'Steamer',
    nameLocalized: { de: 'Steamer', en: 'Foggernaut', fr: 'Steamer', es: 'Steamer', pt: 'Steamer' },
  }, // Discord-Emoji :foggernaut:
  {
    id: 'xelor',
    emoji: resolveDiscordEmoji('xelor', '⏳'),
    name: 'Xelor',
    nameLocalized: { de: 'Xelor', en: 'Xelor', fr: 'Xelor', es: 'Xelor', pt: 'Xelor' },
  }, // Discord-Emoji :xelor:
];

module.exports = { KLASSE_LISTE };