const JOB_TYPES = {
  CRAFTING: 'crafting',
  FARMING: 'farming',
  MAGING: 'maging',
};

const JOB_TYPE_ORDER = [JOB_TYPES.FARMING, JOB_TYPES.CRAFTING, JOB_TYPES.MAGING];

const DEFAULT_JOB_LIST_OPTIONS = {
  includeVariants: true,
  groupByType: true,
  typeOrder: JOB_TYPE_ORDER
};

const jobList = [
  { id: 'alchemist', type: JOB_TYPES.FARMING, variantGroup: 'alchemist' },
  { id: 'artificer', type: JOB_TYPES.CRAFTING, variantGroup: 'artificer' },
  { id: 'axesmith', type: JOB_TYPES.CRAFTING, variantGroup: 'axesmith' },
  { id: 'axesmithmagus', type: JOB_TYPES.MAGING, variantGroup: 'axesmith' },
  { id: 'baker', type: JOB_TYPES.CRAFTING, variantGroup: 'farmer' },
  { id: 'bowcarver', type: JOB_TYPES.CRAFTING, variantGroup: 'bowcarver' },
  { id: 'bowcarvmagus', type: JOB_TYPES.MAGING, variantGroup: 'bowcarver' },
  { id: 'butcher', type: JOB_TYPES.CRAFTING, variantGroup: 'hunter' },
  { id: 'costumagus', type: JOB_TYPES.MAGING, variantGroup: 'tailor' },
  { id: 'daggersmith', type: JOB_TYPES.CRAFTING, variantGroup: 'daggersmith' },
  { id: 'daggersmithmagus', type: JOB_TYPES.MAGING, variantGroup: 'daggersmith' },
  { id: 'farmer', type: JOB_TYPES.FARMING, variantGroup: 'farmer' },
  { id: 'fisherman', type: JOB_TYPES.FARMING, variantGroup: 'fisherman' },
  { id: 'fishmonger', type: JOB_TYPES.CRAFTING, variantGroup: 'fisherman' },
  { id: 'hammersmith', type: JOB_TYPES.CRAFTING, variantGroup: 'hammersmith' },
  { id: 'hammersmithmagus', type: JOB_TYPES.MAGING, variantGroup: 'hammersmith' },
  { id: 'handyman', type: JOB_TYPES.CRAFTING, variantGroup: 'handyman' },
  { id: 'hunter', type: JOB_TYPES.FARMING, variantGroup: 'hunter' },
  { id: 'jeweller', type: JOB_TYPES.CRAFTING, variantGroup: 'jeweller' },
  { id: 'jewelmagus', type: JOB_TYPES.MAGING, variantGroup: 'jeweller' },
  { id: 'lumberjack', type: JOB_TYPES.FARMING, variantGroup: 'lumberjack' },
  { id: 'miner', type: JOB_TYPES.FARMING, variantGroup: 'miner' },
  { id: 'shoemagus', type: JOB_TYPES.MAGING, variantGroup: 'shoemaker' },
  { id: 'shoemaker', type: JOB_TYPES.CRAFTING, variantGroup: 'shoemaker' },
  { id: 'shovelsmith', type: JOB_TYPES.CRAFTING, variantGroup: 'shovelsmith' },
  { id: 'shovelsmithmagus', type: JOB_TYPES.MAGING, variantGroup: 'shovelsmith' },
  { id: 'staffcarver', type: JOB_TYPES.CRAFTING, variantGroup: 'staffcarver' },
  { id: 'staffcarvmagus', type: JOB_TYPES.MAGING, variantGroup: 'staffcarver' },
  { id: 'swordsmith', type: JOB_TYPES.CRAFTING, variantGroup: 'swordsmith' },
  { id: 'swordsmithmagus', type: JOB_TYPES.MAGING, variantGroup: 'swordsmith' },
  { id: 'tailor', type: JOB_TYPES.CRAFTING, variantGroup: 'tailor' },
  { id: 'wandcarver', type: JOB_TYPES.CRAFTING, variantGroup: 'wandcarver' },
  { id: 'wandcarvmagus', type: JOB_TYPES.MAGING, variantGroup: 'wandcarver' },
];

const JOB_IDS = jobList.map((job) => job.id);
const JOB_ID_SET = new Set(JOB_IDS);

module.exports = {
  DEFAULT_JOB_LIST_OPTIONS,
  JOB_ID_SET,
  JOB_IDS,
  jobList,
  JOB_TYPE_ORDER,
  JOB_TYPES,
};