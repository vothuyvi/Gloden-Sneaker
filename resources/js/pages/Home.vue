<template>
    <div class="Main">
        <div class="Card Card_right">
            <div class="Card_rightTop">
                <img src="@/assets/nike.png" alt="" />
            </div>
            <div class="Card_rightTitle">Our Products</div>
            <div class="Card_rightBody">
                <div
                    v-for="(item, index) in state.shoesData"
                    :key="index"
                    class="Card_rightItem"
                >
                    <div
                        class="Card_itemImage"
                        :style="{ 'background-color': item.color }"
                    >
                        <img :src="`${item.image}`" />
                    </div>
                    <div class="Card_itemName">{{ item.name }}</div>
                    <div class="Card_itemDescription">
                        {{ item.description }}
                    </div>
                    <div class="Card_bottom">
                        <div class="Card_itemPrice">${{ item.price }}</div>
                        <div>
                            <div
                                v-if="authStore.listID.includes(item.id)"
                                class="btn"
                            >
                                <img src="@/assets/check.png" alt="" />
                            </div>
                            <div
                                v-else
                                class="Card_itemButton"
                                @click="addOrder(item.id)"
                            >
                                <p>ADD TO CART</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="Card Card_left">
            <div class="Card_leftTop">
                <img src="@/assets/nike.png" alt="" />
            </div>
            <div class="Card_leftTitle">
                Your cart
                <span class="Card_titlePrice">{{
                    formatMoneyToUSD(state.totalPrice)
                }}</span>
            </div>

            <div class="Card_leftBody">
                <div v-if="state.orders.length == 0">
                    <h3>Your cart is empty.</h3>
                </div>
                <div v-else>
                    <div
                        v-for="(item, index) in state.orders"
                        :key="index"
                        class="Card_item"
                    >
                        <div class="Card_itemLeft">
                            <div
                                class="Card_itemImage"
                                :style="{ 'background-color': item.color }"
                            >
                                <img :src="`${item.image}`" />
                            </div>
                        </div>
                        <div class="Card_itemRight">
                            <div class="Cart_itemName">{{ item.name }}</div>
                            <div class="Cart_itemPrice">${{ item.price }}</div>
                            <div class="Cart_itemAction">
                                <div class="Cart_itemCount">
                                    <div
                                        v-if="item.SoLuongOrder === 1"
                                        @click="handelDelete(item.id)"
                                        class="Cart_itemBtn"
                                    >
                                        -
                                    </div>
                                    <div
                                        v-else
                                        @click="handelQuantity(item, 'MINUS')"
                                        class="Cart_itemBtn"
                                    >
                                        -
                                    </div>
                                    <div class="Cart_itemNumber">
                                        {{ item.SoLuongOrder }}
                                    </div>
                                    <div
                                        @click="handelQuantity(item, 'PLUS')"
                                        class="Cart_itemBtn"
                                    >
                                        +
                                    </div>
                                </div>
                                <div
                                    @click="handelDelete(item.id)"
                                    class="Cart_itemDelete"
                                >
                                    <img src="@/assets/trash.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { shoesAll, getShoesCart } from "@/api/auth";
import { reactive, onMounted, watch } from "vue";
import { addOrder, handelDelete } from "@/utils/helper.js";
import { useAuthStore } from "@/stores";

const state = reactive({
    shoesData: [],
    orders: [],
    localOrders: [],
    totalPrice: 0,
    listID: [],
});

const authStore = useAuthStore();

watch(
    () => authStore.refetchOrder,
    async () => {
        await getOrder();
    }
);

const formatMoneyToUSD = (money) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(money);
};

const getShoesAll = async () => {
    const { data: res } = await shoesAll();
    console.log("shoes list: ", res.data);
    const shoesList = [];
    res.data.forEach((item) => {
        const itemData = {
            id: item.id,
            image: item.image,
            name: item.name,
            description: item.description,
            price: item.price,
            color: item.color,
        };
        shoesList.push(itemData);
    });
    state.shoesData = shoesList;
};

const getOrder = async () => {
    const orders = JSON.parse(localStorage.getItem("orders"));
    if (orders) {
        const products = orders;
        if (products && products.length > 0) {
            const listID = products.map((item) => {
                return item.id;
            });
            const localOrders = products.map((item) => {
                return { id: item.id, SoLuong: item.SoLuong };
            });
            state.localOrders = localOrders;
            authStore.listID = listID;
            console.log("localOrders:", localOrders);
            console.log("list ID: ", listID);
            const form = {
                listID: listID,
            };
            const { data: res } = await getShoesCart(form);
            console.log("data", res.data);
            if (res.data) {
                state.orders = res.data;
                state.orders.forEach((item) => {
                    const itemLocal = state.localOrders.find(
                        (local) => local.id == item.id
                    );
                    if (itemLocal) {
                        item.SoLuongOrder = itemLocal.SoLuong;
                    } else {
                        item.SoLuongOrder = 1;
                    }
                });
                getTotalPrice();
            }
        } else {
            state.orders = [];
            state.totalPrice = 0;
        }
    } else {
        state.orders = [];
        state.totalPrice = 0;
    }
};

const handelQuantity = (item, type) => {
    console.log("sanpham", item.id);
    console.log("type", type);
    const orders = JSON.parse(localStorage.getItem("orders"));
    if (orders) {
        const indexProduct = orders.findIndex((order) => order.id == item.id);
        if (indexProduct !== -1) {
            if (type === "PLUS") {
                orders[indexProduct].SoLuong += 1;
            } else {
                orders[indexProduct].SoLuong -= 1;
            }
        }
    }
    
    localStorage.setItem("orders", JSON.stringify(orders));
    authStore.onRefetchOrder();
};

const getTotalPrice = () => {
    let totalMoney = 0;
    state.orders.forEach((item) => {
        totalMoney += Number(item.price * item.SoLuongOrder);
    });
    console.log("tong tien", totalMoney);
    state.totalPrice = totalMoney;
};

onMounted(async () => {
    await getShoesAll();
    await getOrder();
});
</script>
<style lang="scss" scoped>
@import "@/style/home.scss";
</style>
