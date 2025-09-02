// permissions.js
export default function (feature, role) {
  return permissions.features[feature][role]
}

const permissions = {
  features: {
    vendor: {
      vendor: { read: 1, create: 1, update: 1, delete: 0, disable: 1 },
      managers: { read: 1, create: 1, update: 1, delete: 0, disable: 1 },
      admins: { read: 1, create: 1, update: 1, delete: 1, disable: 1 },
      SAdmin: { read: 1, create: 1, update: 1, delete: 1, disable: 1 },
    },
    user: {
      user: { read: 1, create: 1, update: 1, delete: 0, disable: 0 },
      vendor: { read: 1, create: 1, update: 1, delete: 0, disable: 0 },
      managers: { read: 1, create: 1, update: 1, delete: 1, disable: 1 },
      admins: { read: 1, create: 1, update: 1, delete: 1, disable: 1 },
      SAdmin: { read: 1, create: 1, update: 1, delete: 1, disable: 1 },
    },
  },
}
