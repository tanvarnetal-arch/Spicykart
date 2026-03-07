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

    const rzp = new window.Razorpay({
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_6pG8o5p8mH5XyR', // Fallback to test key
        ...options,
        theme: {
            color: '#166534', // Matching the primary green theme
        },
    });

    rzp.on('payment.failed', function (response: any) {
        toast.error('Payment Failed: ' + response.error.description);
    });

    rzp.open();
};
