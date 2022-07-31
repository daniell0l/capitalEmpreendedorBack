import { readFileSync, writeFileSync } from "fs";

const functions = {};
const databaseFile = "database/data.json";

functions.getAll = (collection: string | number) => {
  return new Promise((resolve, reject) => {
    if (!collection || typeof collection !== "string") {
      reject("Missing or incorrect parameter collection");
    } else {
      try {
        const data = JSON.parse(readFileSync(databaseFile));
        if (data[collection]) {
          resolve(data[collection]);
        } else {
          resolve({});
        }
      } catch (err) {
        reject(err);
      }
    }
  });
};

functions.getOne = (collection: string | number, key: string | number) => {
  return new Promise((resolve, reject) => {
    if (!collection || typeof collection !== "string") {
      reject("Missing or incorrect parameter collection");
    } else if (!key || typeof key !== "string") {
      reject("Missing or incorrect parameter key");
    } else {
      try {
        const data = JSON.parse(readFileSync(databaseFile));
        if (data[collection]) {
          if (data[collection][key]) {
            resolve(data[collection][key]);
          } else {
            resolve(undefined);
          }
        } else {
          resolve(undefined);
        }
      } catch (err) {
        reject(err);
      }
    }
  });
};

functions.set = (
  collection: string | number,
  key: string | number,
  value: any
) => {
  return new Promise((resolve, reject) => {
    if (!collection || typeof collection !== "string") {
      reject("Missing or incorrect parameter collection");
    } else if (!key || typeof key !== "string") {
      reject("Missing or incorrect parameter key");
    } else if (!value || typeof value != "object") {
      reject("Missing or incorrect parameter data");
    } else {
      try {
        const data = JSON.parse(readFileSync(databaseFile));
        data[collection][key] = { ...value };
        writeFileSync(databaseFile, JSON.stringify(data, null, 2));
        resolve(data[collection][key]);
      } catch (err) {
        reject(err);
      }
    }
  });
};

functions.update = (
  collection: string | number,
  key: string | number,
  value: any
) => {
  return new Promise((resolve, reject) => {
    if (!collection || typeof collection !== "string") {
      reject("Missing or incorrect parameter collection");
    } else if (!key || typeof key !== "string") {
      reject("Missing or incorrect parameter key");
    } else if (!value || typeof value != "object") {
      reject("Missing or incorrect parameter data");
    } else {
      try {
        const data = JSON.parse(readFileSync(databaseFile));
        data[collection][key] = { ...data[collection][key], ...value };
        writeFileSync(databaseFile, JSON.stringify(data, null, 2));
        resolve(data[collection][key]);
      } catch (err) {
        reject(err);
      }
    }
  });
};

functions.delete = (collection: string | number, key: string | number) => {
  return new Promise<void>((resolve, reject) => {
    if (!collection || typeof collection !== "string") {
      reject("Missing or incorrect parameter collection");
    } else if (!key || typeof key !== "string") {
      reject("Missing or incorrect parameter key");
    } else {
      try {
        const data = JSON.parse(readFileSync(databaseFile));
        if (data[collection]) {
          data[collection][key] = undefined;
          writeFileSync(databaseFile, JSON.stringify(data, null, 2));
          resolve();
        } else {
          resolve();
        }
      } catch (err) {
        reject(err);
      }
    }
  });
};

export default functions;
