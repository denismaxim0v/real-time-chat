import redis from "redis";

export const client = redis.createClient(6379, process.env.REDIS_HOST!);

client.on("error", (error) => {
  console.error(error);
});

export const getSession = async hash => redisGenerator('get', hash)
export const setSession = async (hash, session) => redisGenerator('set', hash, session)
export const deleteSession = async (hash) => redisGenerator('del', hash)

const redisGenerator = async(method, ...args) => {
  return new Promise((res, rej) => {
    client[method](...args, (e, r) => {
      res(r)
    })
  })
}