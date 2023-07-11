import { createClient } from 'redis'
class RedisClient {
    public redisClient = createClient()
    /**
     * for conneccting client to redis server
     */
    public async connectClient() {
        try {
            await this.redisClient.connect()
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * to get a key value from redis server
     * @param key key for redis server
     * @returns the key value
     */
    public async get(key: string) {
        try {
            return await this.redisClient.get(key);
        }
        catch (err) {
            throw err;
        }
    }

    /**
     * setting a particular string to the given key in redis-server
     * @param key 
     * @param data 
     */
    public async set(key: string, data: string) {
        try {
            await this.redisClient.set(key, data);
        }
        catch (err) {
            throw err
        }
    }

    /**
     * delete a particular key from redis server 
     * @param key 
     */
    public async delete(key: string) {
        try {
            await this.redisClient.del(key)
        }
        catch (err) {
            throw err;
        }
    }
}

export default RedisClient