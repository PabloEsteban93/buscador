const fs = require('fs'),
      path = require('path')

module.exports = {
    saveData: (dataType, newData, data) => {
        let dataPath = __dirname + path.join('/data/properties.json');
        data.current.push(newData);
        return new Promise((resolve, reject) => {
            fs.writeFile(dataPath, JSON.stringify(data), (err) => {
                if (err) reject(err);
                resolve('ok');
            })
        })
    },
    getData: (dataType) => {
        let dataPath = __dirname + path.join('/data/properties.json');
        return new Promise((resolve, reject) => {
            fs.readFile(dataPath, 'utf8', (err, readData) => {
                if (err) reject(err);
                resolve(JSON.parse(readData));
            })
        })
    }
}