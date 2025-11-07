const jobList = [
    { id: 'alchemist' },
    { id: 'artificer' },
    { id: 'axesmith' },
    { id: 'axesmithmagus' },
    { id: 'baker' },
    { id: 'bowcarver' },
    { id: 'bowcarvmagus' },
    { id: 'butcher' },
    { id: 'costumagus' },
    { id: 'daggersmith' },
    { id: 'daggersmithmagus' },
    { id: 'farmer' },
    { id: 'fisherman' },
    { id: 'fishmonger' },
    { id: 'hammersmith' },
    { id: 'hammersmithmagus' },
    { id: 'handyman' },
    { id: 'hunter' },
    { id: 'jeweller' },
    { id: 'jewelmagus' },
    { id: 'lumberjack' },
    { id: 'miner' },
    { id: 'shoemagus' },
    { id: 'shoemaker' },
    { id: 'shovelsmith' },
    { id: 'shovelsmithmagus' },
    { id: 'staffcarver' },
    { id: 'staffcarvmagus' },
    { id: 'swordsmith' },
    { id: 'swordsmithmagus' },
    { id: 'tailor' },
    { id: 'wandcarver' },
    { id: 'wandcarvmagus' },
];

const JOB_IDS = jobList.map((job) => job.id);
const JOB_ID_SET = new Set(JOB_IDS);

module.exports = {
  JOB_ID_SET,
  JOB_IDS,
  jobList,
};