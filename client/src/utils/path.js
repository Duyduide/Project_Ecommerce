const path = {
    PUBLIC: '/',
    HOME: '/',
    ALL: '*',
    LOGIN: '/login',
    PRODUCT: '/product',
    DETAIL_PRODUCT: '/product/:productId', // Đảm bảo rằng tên chính xác và đồng bộ
    FINAL_REGISTER: '/finalRegister/:status',
    RESET_PASSWORD: '/reset-password/:token'
}

export default path;
