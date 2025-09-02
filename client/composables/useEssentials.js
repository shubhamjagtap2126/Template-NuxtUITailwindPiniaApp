// Function to generate a unique ID with an optional prefix
export const generateUniqueId = (prefix) => {
  // return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  return `${prefix ? prefix + '-' : ''}${Math.random().toString(36).substring(2, 9)}`;
};

export const generateTimeStamp = () => {
  return new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
};

// Function to transform data recursively, converting strings to appropriate types
export const transformData = (data) => {
  const transformValue = (value) => {
    if (typeof value !== 'string')
      return typeof value === 'object' && value !== null
        ? Array.isArray(value)
          ? value.map(transformValue)
          : Object.fromEntries(Object.entries(value).map(([k, v]) => [k, transformValue(v)]))
        : value;

    const t = value.trim();

    if (t.includes('\n') || t.includes('|')) return convertStringToJSON(t);

    try {
      if ((t.startsWith('{') && t.endsWith('}')) || (t.startsWith('[') && t.endsWith(']'))) return transformValue(JSON.parse(t));
    } catch (e) {}

    const l = t.toLowerCase();
    if (l === 'true' || l === 'false') return l === 'true';

    const n = Number(t);
    if (!isNaN(n) && t === String(n)) return n;

    return value;
  };
  return transformValue(data);
};

// Function to parse data by a specific key from an array of objects
export const parseDataByKey = (data, key) => {
  try {
    const values = data.find((item) => item.key === key);
    // console.log('Values found for key:', key, values);
    if (values && values.value) {
      return values.value.startsWith('[') && values.value.endsWith(']') ? JSON.parse(values.value) : values.value;
    }
  } catch (e) {
    console.error('Error parsing ProductInfo value as JSON:', e);
    return null; // Return null or throw error if parsing fails
  }
};

// Function to parse a value string into its appropriate type (object, array, number, boolean, or string)
export const parseValueString = (valueString) => {
  try {
    const jsonReadyString = valueString
      .replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, '"$1"') // 'value' -> "value"
      .replace(/([a-zA-Z_$][a-zA-Z0-9_$]*):/g, '"$1":'); // key: -> "key":
    const parsed = JSON.parse(jsonReadyString);

    if ((typeof parsed === 'object' && parsed !== null) || Array.isArray(parsed)) {
      return parsed;
    }
  } catch (e) {
    // Not valid JSON, continue to other parsing methods.
  }

  // 2. Attempt to parse as a number
  if (!isNaN(Number(valueString)) && !isNaN(parseFloat(valueString))) {
    return Number(valueString);
  }

  // 3. Attempt to parse as a boolean
  if (valueString === 'true') return true;
  if (valueString === 'false') return false;

  // 4. Handle string literals enclosed in single quotes
  if (valueString.startsWith("'") && valueString.endsWith("'")) {
    // Remove outer single quotes and unescape any internal single quotes
    return valueString.substring(1, valueString.length - 1).replace(/\\'/g, "'");
  }

  // 5. Default to plain string if no other parsing is successful
  return valueString;
};

// Function to format a value into a string representation suitable for JSON-like structures
export const formatValueToString = (value) => {
  if (typeof value === 'string') {
    // Enclose strings in single quotes and escape any internal single quotes
    return `'${value.replace(/'/g, "\\'")}'`;
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    // Numbers and booleans convert directly to their string representation
    return String(value);
  }
  if (typeof value === 'object' && value !== null) {
    // For arrays and objects, stringify to JSON, then adjust quoting:
    // 1. Convert double quotes around string values to single quotes
    // 2. Remove quotes from object keys (e.g., 'key': -> key:)
    return JSON.stringify(value)
      .replace(/"([^"]*?)(?<!\\)"/g, "'$1'") // "value" -> 'value' (non-greedy, no escaped quotes)
      .replace(/'([a-zA-Z_$][a-zA-Z0-9_$]*)':/g, '$1:'); // 'key': -> key:
  }
  // Fallback for null or undefined, converts to "null" or "undefined"
  return String(value);
};

// Function to convert a string representation of data into an array of objects or a single object
export const convertStringToJSON = (dataString) => {
  const containsPipe = dataString.includes('|');
  const lines = dataString.split('\n').filter((line) => line.trim());

  if (lines.length === 0) {
    return [];
  }

  const processedObjects = lines.map(
    (record) =>
      record.split('|').reduce((acc, pair) => {
        const eqIndex = pair.indexOf(':'); // Find the first '='
        if (eqIndex > 0) {
          const key = pair.substring(0, eqIndex).trim();
          const valueString = pair.substring(eqIndex + 1).trim();
          acc[key] = parseValueString(valueString);
        }
        return acc;
      }, {}) // Initialize accumula
  );

  if (containsPipe) {
    return processedObjects;
  } else {
    return Object.assign({}, ...processedObjects);
  }
};

// Function to convert an array of objects to a string representation
export const convertJSONToString = (jsonData) => {
  // Input validation: ensure it's an array
  if (!Array.isArray(jsonData)) {
    console.error('Input for convertJSONToString must be an array of objects.');
    return '';
  }
  // Map each object to its string representation and then join lines with newlines
  return jsonData
    .map(
      (obj) =>
        Object.entries(obj) // Get key-value pairs as [key, value] arrays
          .map(([key, value]) => `${key}:${formatValueToString(value)}`) // Format each pair
          .join('|') // Join pairs for the current object with '|'
    )
    .join('\n'); // Join all record strings with a newline
};

// Function to generate an array of offering data objects
export const generateServiceHistory = (offerings) => {
  if (!Array.isArray(offerings) || offerings.length === 0) {
    return [];
  }
  const resultObject = {};
  // const status = [{ id: generateUniqueId(), date: generateTimeStamp(), status: 'Pending' }];
  offerings.forEach((service) => {
    if (service.offeringId) {
      resultObject[service.offeringId] = convertJSONToString([{ id: generateUniqueId(), date: generateTimeStamp(), status: 'pending', notes: '' }]);
    } else {
      console.warn('Offering object does not have an offeringId:', service);
    }
  });
  return resultObject;
};

// Function to get parsed service data based on a search key
export const getParsedServiceData = (servicesData, searchKey) => {
  if (typeof servicesData !== 'object' || servicesData === null || typeof searchKey !== 'string') {
    console.error('Invalid input: servicesData must be an object, and searchKey must be a string.');
    return {};
  }

  const result = {};

  for (const key in servicesData) {
    if (key.startsWith(searchKey)) {
      const stringValue = servicesData[key];
      const parsedArray = convertStringToJSON(stringValue);
      result[key] = parsedArray;
    } else {
      result[key] = servicesData[key]; // Keep the original value if it doesn't match the searchKey
    }
  }

  return result;
};

// Function for smooth scrolling
export const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const handleCall = (contact) => {
  if (contact) {
    window.open(`tel:+91${contact}`, '_blank');
  } else {
    $q.notify({ type: 'warning', message: 'Contact number not available.' });
  }
};

export const handleWhatsApp = (contact, text) => {
  text = text || 'Hi Petopia Pet Parent!';
  if (contact) {
    window.open(`https://wa.me/91${contact}?text=${encodeURIComponent(text)}`, '_blank');
  } else {
    showNotify({ color: 'negative', msg: 'Sorry for inconvenience. WhatsApp contact not available.' });
  }
};

export const shareWhatsApp = (text) => {
  text = text || 'Hello from Sakal Petopia!';
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
};

export const copyToClipboard = (text) => {
  text = text || 'Hello from Sakal Petopia!';
  navigator.clipboard
    .writeText(text)
    .then(() => {
      showNotify({ color: 'positive', msg: 'Copied to clipboard!', position: 'top' });
    })
    .catch((err) => {
      console.error('Failed to copy link:', err);
      showNotify({ color: 'negative', msg: 'Failed to copy.', position: 'top' });
    });
};
