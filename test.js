'use strict';

/**
 * Created by park9eon on 2019-01-15
 */
const mongoose = require('mongoose');
const connection = mongoose.createConnection('mongodb://localhost:27017/aaa', {useNewUrlParser: true});

(async () => {
    const N = 10000;
    try {
        for (let i = 0; i < N; i++) {
            const name = `aaa-${i}`;
            await genModel(name, {
                [name]: Number
            });
            console.log(`모델 생성 - ${name}`);
            for (let j = 0; j < N; j++) {
                const result = await save(name, {[name]: Math.random()});
                console.log(`   데어터 저장! - ${result.id}`);
            }
        }
    } catch (e) {
        console.error(e);
    } finally {
        await connection.close();
    }
})();

function getModel(name) {
    return connection.model(name);
}

async function genModel(name, schema) {
    const model = mongoose.model(name, new mongoose.Schema(schema));
    await model.init();
}

async function save(name, data) {
    const result = await getModel(name)
        .create(data);
    return result;
}
