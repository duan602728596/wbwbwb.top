import axios from 'axios';
import mime from 'mime-types';

async function live(ctx: Object, next: Function): Promise<void> {
  const { query }: { query: Object } = ctx.request;

  if ('url' in query) {
    const { data, status }: {
      data: Object,
      status: number
    } = await axios({
      url: query.url,
      method: 'GET',
      responseType: 'stream'
    });

    ctx.type = mime.lookup(query.url);
    ctx.status = status;
    ctx.body = data;
  } else {
    ctx.status = 404;
  }
}

function fortyEightLive(router: Object): void{
  router.get('/48/live', live);
}

export default fortyEightLive;