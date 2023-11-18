import request from "@/utils/request";

export function shoesAll() {
    return request({
        url: "/shoes",
        method: "GET",
    });
}

export function getShoesCart(form) {
    return request({
        url: `/shoes/cart`,
        method: "post",
        data: form,
    });
}
