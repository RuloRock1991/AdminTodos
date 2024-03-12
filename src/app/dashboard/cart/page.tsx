import { Product, products } from "@/products/data/products";
import { ItemCard } from "@/shopping-cart";
import { cookies } from 'next/headers'
import { WidgetItem } from '../../../components/WidgetItem';

interface ProductInCart {
    product: Product,
    quantity: number
}

export const metadata = {
    title: 'Carrito de Compras',
    description: 'SEO Title',
};

const getProductsInCart = (cart: { [id: string]: number }): ProductInCart[] => {
    const productsInCart: ProductInCart[] = [];

    for (const id of Object.keys(cart)) {
        const product = products.find(prod => prod.id === id);
        if (product) {
            productsInCart.push({ product: product, quantity: cart[id] });
        }
    }

    return productsInCart;
}

export default function CartPage() {
    const cookieStore = cookies()
    const cart = JSON.parse(cookieStore.get('cart')?.value ?? "{}") as { [id: string]: number };
    const products = getProductsInCart(cart);
    const totalPay = products.reduce( (prev, current) => (current.product.price * current.quantity) + prev, 0);

    return (
        <div>
            <h1 className="text-5xl">Productos en el carrito</h1>
            <hr className="mb-2" />
            <div className="flex flex-col sm:flex-row gap-2 w-full">
                <div className="flex flex-col gap-2 w-full sm:8/12">
                    {
                        products.map(({product, quantity}) => (
                            <ItemCard key={product.id} product={product} quantity={quantity} />
                        ))
                    }
                </div>

                <div className="flex flex-col w-full sm:w-4/12">
                    <WidgetItem title="Total a Pagar">
                        <div className="mt-2 flex flex-col justify-center gap-4">
                            <h3 className="text-3xl font-bold text-grey-700">Total: {(totalPay * 1.15).toFixed(2)}</h3>
                            <span className="font-bold text-center text-grey-500">Impuestos 15%: {(totalPay * 0.15).toFixed(2)}</span>
                        </div>
                    </WidgetItem>
                </div>
            </div>
        </div>
    );
}