export function useGasDataFilter(user) {
  switch (user.role) {
    case 'SAdmin':
      return {};
    case 'user':
      return { userId: user.userId, approved: true };
    case 'vendor':
      return { vendorId: user.userId, approved: true };
  }
}

export function useDataFilter(data, user) {
  // console.log('useDataFilter', user, data);
  switch (user.role) {
    case 'SAdmin':
      return data || [];
    case 'user':
      return filterObjectsUsingCriteria(data, { userId: user.userId }) || [];
    case 'vendor':
      return filterObjectsUsingCriteria(data, { vendorId: user.userId }) || [];
  }
}

export function findByCriteria(data, criteria) {
  return data.slice(1).reduce((rows, row, i) => {
    if (Object.entries(criteria).every(([key, value]) => String(row[key]) === String(value))) {
      rows.push(i + 2);
    }
    return rows;
  }, []);
}

export const filterObjectsUsingCriteria = (data, criteria) =>
  data.filter((obj) =>
    Object.entries(criteria).every(
      ([key, value]) =>
        // Checks if the object has the property and if its string representation matches the criteria value
        Object.prototype.hasOwnProperty.call(obj, key) && String(obj[key]) === String(value)
    )
  );
