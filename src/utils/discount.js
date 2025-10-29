export function calculateDiscount(total, isMember = false, promoCode = '') {

    if (!total || total <= 0) {
        return { discount: 0, finalPrice: total || 0 };
    }

    let discount = 0;

    if (total > 1000000) discount += 10;

    if (isMember) discount += 5;

    if (promoCode === 'DISKON20') discount += 20;

    if (discount > 50) discount = 50;

    const finalPrice = Math.round(total - (total * discount) / 100);

    return { discount, finalPrice };
}
