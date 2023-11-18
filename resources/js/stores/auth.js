import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        refetchOrder: 0,
        orderCount: 0,
        listID: [],
    }),
    actions: {
        onRefetchOrder() {
            this.refetchOrder += 1;
        },
    },
});
