const fs = require('fs');

var functions = {};
const databaseFile = 'database/data.json';

functions.getAll = (collection) => {
  return new Promise((resolve, reject) => {
    if(!collection || typeof collection !== 'string') {
      reject("Missing or incorrect parameter collection")
    } else {
      try {
        var data = JSON.parse(fs.readFileSync(databaseFile));
        if(data[collection]) {
          resolve(data[collection]);
        } else {
          resolve({}); 
        }
      } catch(err) {
        reject(err);
      }
    }    
  })
}

functions.getOne = (collection, key) => {
  return new Promise((resolve, reject) => {
    if(!collection || typeof collection !== 'string') {
      reject("Missing or incorrect parameter collection")
    } else if(!key || typeof key !== 'string') {
      reject("Missing or incorrect parameter key")
    } else {
      try {
        var data = JSON.parse(fs.readFileSync(databaseFile));
        if(data[collection]){
          if(data[collection][key]) {
            resolve(data[collection][key]);
          } else {
            resolve(undefined);
          }
        } else {
          resolve(undefined); 
        }
      } catch(err) {
        reject(err);
      }
    }    
  });
}

functions.set = (collection, key, value) => {
  return new Promise((resolve, reject) => {
    if(!collection || typeof collection !== 'string') {
      reject("Missing or incorrect parameter collection")
    } else if(!key || typeof key !== 'string') {
      reject("Missing or incorrect parameter key")
    } else if(!value || typeof value != 'object') {
      reject("Missing or incorrect parameter data")
    } else {
      try {
        var data = JSON.parse(fs.readFileSync(databaseFile));
        data[collection][key] = { ...value };
        fs.writeFileSync(databaseFile, JSON.stringify(data, null, 2));
        resolve(data[collection][key]);
      } catch(err) {
        reject(err);
      }
    }    
  });
}

functions.update = (collection, key, value) => {
  return new Promise((resolve, reject) => {
    if(!collection || typeof collection !== 'string') {
      reject("Missing or incorrect parameter collection")
    } else if(!key || typeof key !== 'string') {
      reject("Missing or incorrect parameter key")
    } else if(!value || typeof value != 'object') {
      reject("Missing or incorrect parameter data")
    } else {
      try {
        var data = JSON.parse(fs.readFileSync(databaseFile));
        data[collection][key] = { ...data[collection][key], ...value };
        fs.writeFileSync(databaseFile, JSON.stringify(data, null, 2));
        resolve(data[collection][key]);
      } catch(err) {
        reject(err);
      }
    }    
  });
}

functions.delete = (collection, key) => {
  return new Promise((resolve, reject) => {
    if(!collection || typeof collection !== 'string') {
      reject("Missing or incorrect parameter collection")
    } else if(!key || typeof key !== 'string') {
      reject("Missing or incorrect parameter key")
    } else {
      try {
        var data = JSON.parse(fs.readFileSync(databaseFile));
        if(data[collection]){
          data[collection][key] = undefined;
          fs.writeFileSync(databaseFile, JSON.stringify(data, null, 2));
          resolve();
        } else {
          resolve(); 
        }
      } catch(err) {
        reject(err);
      }
    }    
  });
}

module.exports = functions;