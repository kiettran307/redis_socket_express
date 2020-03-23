const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

async function pushListTypeMultiple(key, type, ...values) {
    if (!type) {
        const results = await client.lpush(key, ...values);
        console.log('results ', values);
        return results;
    } else {
        const results = await client.rpush(key, ...values);
        console.log('results ', values);
        return results;
    }
}
async function insertAtIndexItem(key, index, value) {
    //type AFTER OR BEFORE
    const oldValue = await client.lindex(key, index);
    const tempValue = 'temp';
    await client.lset(key, index, tempValue);
    await client.linsert(key, 'AFTER', tempValue, value);
    await client.linsert(key, 'AFTER', value, oldValue);
    await client.lrem(key, 1, tempValue);
    const finalList = await client.lrange(key, 0, -1);
    console.log('temp list 3', finalList);
}
async function setObject() {
    await client.hmset("user:1", {
        name: 'kiet',
        email: 'tankiet@gmail.com',
        age: 23
    })
    const obj = await client.hgetall("user:1");
    console.log('obj ', obj);

}
const asyncBlock = async () => {
    console.log('asyncBlock');
    await client.set("string key", "string val");
    const value = await client.get("string key");
    console.log(value);
    //   await client.flushall("string key");
};
(async () => {
    try {
        const keys = await client.keys('*');
        for (var i = 0, len = keys.length; i < len; i++) {
            console.log(keys[i]);
        }
        // await client.flushall();
        // await asyncBlock();
        // client.del('key');
        await pushListTypeMultiple('key2', true, 1, 2, 3, 4, 5, 6, 7, 8);
        const items = await client.lrange('key2', 0, -1);
        console.log('items ', items);

        // await insertAtIndexItem('key', 2, 99);
        // await setObject('key');
    } catch (error) {
        console.log('cant start app', error);
        process.exit(1);
    }
})();