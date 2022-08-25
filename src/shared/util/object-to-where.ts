import { WhereQuery } from '../types/where-query';

const objectToWhereClause = (
  inputObject: any,
  propertyPrefix?: string,
): WhereQuery => {
  let queryString = '';
  let params = {};
  propertyPrefix = propertyPrefix ? propertyPrefix + '.' : '';
  if (inputObject && Object.keys(inputObject)?.length > 0) {
    let inputIncr = 1;
    for (const [inputKey, inputValue] of Object.entries(inputObject)) {
      if (
        typeof inputValue === 'object' &&
        !Array.isArray(inputValue) &&
        inputValue !== null
      ) {
        if (Object.keys(inputValue)?.length > 0) {
          let propIncr = 1;
          for (const [propKey, propValue] of Object.entries(inputValue)) {
            queryString += `${propertyPrefix}${inputKey}.${propKey} = :${propKey} ${
              propIncr < Object.keys(inputValue)?.length ? 'AND ' : ''
            }`;
            params = { [propKey]: propValue, ...params };
            propIncr++;
          }
        }
      } else if (
        (typeof inputValue === 'string' ||
          typeof inputValue === 'number' ||
          typeof inputValue === 'boolean') &&
        !Array.isArray(inputValue)
      ) {
        queryString += `${propertyPrefix}${inputKey} = :${inputKey} ${
          inputIncr < Object.keys(inputObject)?.length ? 'AND ' : ''
        }`;
        params = { [inputKey]: inputValue, ...params };
      }
      inputIncr++;
    }
  }
  return {
    queryString: queryString.trim(),
    params,
  };
};

export default objectToWhereClause;
