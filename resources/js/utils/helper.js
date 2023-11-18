import { useAuthStore } from '@/stores';
export const addOrder = dataID => {
  const authStore = useAuthStore();
  const orders = JSON.parse(localStorage.getItem('orders'));
  if (orders) {
    const indexProduct = orders.findIndex(order => order.id == dataID);
    if (indexProduct != -1) {
      orders[indexProduct].SoLuong += 1;
    } else {
      orders.push({
        id: dataID,
        SoLuong: 1,
      });
    }
    localStorage.setItem('orders', JSON.stringify(orders));
  } else {
    const orders = [
      {
        id: dataID,
        SoLuong: 1,
      },
    ];
    localStorage.setItem('orders', JSON.stringify(orders));
  }
  authStore.onRefetchOrder();
};

export const handelDelete = dataID => {
  const authStore = useAuthStore();
  const orders = JSON.parse(localStorage.getItem('orders'));
  if (orders) {
    const indexProduct = orders.findIndex(order => order.id == dataID);
    if (indexProduct != -1) {
      orders.splice(indexProduct, 1);
      localStorage.setItem('orders', JSON.stringify(orders));
      authStore.onRefetchOrder();
    }
  }
};

