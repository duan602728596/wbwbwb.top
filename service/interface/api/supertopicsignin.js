const axios = require('axios');
const { apiUri } = require('../../config');

module.exports = async function(ctx){
  const { query } = ctx.request;
  let cards = [];
  let sinceId = null;

  if(query && 'cookie' in query){
    const { data } = await axios({
      url: `${ apiUri }/api/container/getIndex?cookie=${ query.cookie }`,
      method: 'GET'
    });

    const { cardlistInfo } = data.data;
    sinceId = 'since_id' in cardlistInfo ? cardlistInfo.since_id : 'END';
    cards = data.data.cards[0].card_group;
  }

  // 删除无用的数据
  for(let i = cards.length - 1; i>= 0; i--){
    const item = cards[i];
    if(item.card_type === 8){
      delete item.card_type_name;
      delete item.title;
      delete item.itemid;
      delete item.display_arrow;
      delete item.buttons;
      delete item.title_flag_pic;
    }else{
      cards.splice(i, 1);
    }
  }

  return {
    title: '超级话题签到',
    superTopicSignIn: {
      cards,
      sinceId
    }
  };
};