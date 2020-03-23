const path = require("path");
const redis = require("redis");

require("dotenv").config({
  path: path.join(__dirname, '../', ".env")
});

const client = require('./redis');
const Redis_wrapper = {
    setStringType(key, value){
        client.set(key, value, redis.print);
    },
    getStringType(key){
        client.get(key, redis.print);
    },
    delKey(key){
        client.del(key, redis.print);
    },
    getListSize(key){
        client.llen(key, redis.print)
    },
    getItemIndex(key, index){
        client.lindex(key, index, redis.print)
    },
    insertItem(key, type, pivot, value){
        //type AFTER OR BEFORE
        client.linsert(key, type, pivot, value, redis.print)
    },
  
    pushListTypeMultiple(key, type, ...values){
        if (!type) {
            client.lpush(key, ...values, redis.print);
        }
        else{
            client.rpush(key, ...values, redis.print);
        }
    },
    pushListType(key, value, type){
        if (!type) {
            client.lpush(key, value, redis.print);
        }
        else{
            client.rpush(key, value, redis.print);
        }
    },
    popListType(key, type){
        if (!type){
            client.lpop(key, redis.print);
        } else {
            client.rpop(key, redis.print);
        }
    },
    setListType(key, value, index){ // replace index with value
        client.lset(key, index, value, redis.print);
    },
    showListWithRange(key, from, to){
        client.lrange(key, from, to, redis.print);
    },

};
module.exports = Redis_wrapper;
