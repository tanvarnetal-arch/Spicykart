import { toast } from 'sonner';

interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    image?: string;
    order_id?: string;
    handler: (response: any) => void;
    prefill: {
        name: string;
        email: string;
        contact?: string;
    };
    notes?: Record<string, string>;
    theme: {
        color: string;
    };
}

declare global {
    interface Window {
        Razorpay: any;
    }
}

export const loadRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
};

export const processPayment = async (options: Partial<RazorpayOptions>) => {
    if (!window.Razorpay) {
        const res = await loadRazorpay();
        if (!res) {
            toast.error('Razorpay SDK failed to load. Are you online?');
            return;
        }
    }

    try {
        // Step 1: Create an order via your local backend!
        const orderResponse = await fetch('http://localhost:3001/api/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: options.amount })
        });

        if (!orderResponse.ok) {
            toast.error('Failed to create order. Is the backend running?');
            return;
        }
        const order = await orderResponse.json();

        // Step 2: Initialize Razorpay Checkout
        const rzp = new window.Razorpay({
            key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_6pG8o5p8mH5XyR',
            amount: options.amount,
            currency: options.currency || 'INR',
            name: options.name,
            description: options.description,
            order_id: order.id, // The exact ID pulled from backend
            prefill: options.prefill,
            handler: async function (response: any) {
                try {
                    // Step 3: Verify the payment signature on backend securely
                    const verifyResponse = await fetch('http://localhost:3001/api/verify-payment', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        })
                    });

                    if (verifyResponse.ok) {
                        // All good! Success route
                        if (options.handler) {
                            options.handler(response);
                        }
                    } else {
                        toast.error('Payment Verification Failed!');
                    }
                } catch (err: any) {
                    toast.error('Signature verification error: ' + err.message);
                }
            },
            theme: {
                color: '#166534',
            },
        });

        rzp.on('payment.failed', function (response: any) {
            toast.error('Payment Failed: ' + response.error.description);
        });

        rzp.open();
    } catch (error: any) {
        toast.error('Payment initialization error: ' + error.message);
    }
};
