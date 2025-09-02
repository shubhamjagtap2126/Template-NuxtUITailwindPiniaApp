import { defineStore } from 'pinia';
import SecureLS from 'secure-ls';
import { ref } from 'vue';
const { SECURELS_SECRET } = useRuntimeConfig().public;

export const useUserStore = defineStore('user', async () => {
  const ls = new SecureLS({ encodingType: 'aes', isCompression: true, encryptionSecret: SECURELS_SECRET });
  // console.log(ls);
  const users = ref(ls.get('users') || []);

  const setUsers = (newUsers) => {
    users.value = newUsers;
    ls.set('users', newUsers);
  };

  const addUser = (user) => {
    users.value.push(user);
    ls.set('users', users.value);
  };

  const updateUser = (updatedUser) => {
    const index = users.value.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      users.value.splice(index, 1, updatedUser);
      ls.set('users', users.value);
    }
  };

  const deleteUser = (userId) => {
    const index = users.value.findIndex((user) => user.id === userId);
    if (index !== -1) {
      users.value.splice(index, 1);
      ls.set('users', users.value);
    }
  };

  const clearUsers = () => {
    users.value = [];
    ls.remove('users');
  };
  return { users, setUsers, addUser, updateUser, deleteUser, clearUsers };
});
