import { Grid } from '@mui/material';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { startPaymentSession, handlePaymentSuccess } from '../../../redux/store/slices/paymentSlice';

interface PayPalCheckoutProps {
    user: any;
    dispatch: any;
    login: any;
    setErrorMessage: (msg: string) => void;
    setErrorSnackbarOpen: (open: boolean) => void;
    setDialogOpen: (open: boolean) => void;
}

export const PayPalCheckout = ({
    user,
    dispatch,
    login,
    setErrorMessage,
    setErrorSnackbarOpen,
    setDialogOpen
}: PayPalCheckoutProps) => {

    return (
        <Grid size={12} width={500}>
            <PayPalScriptProvider options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || '' }}>
                <PayPalButtons
                    style={{ layout: "vertical", color: "gold", shape: "rect", label: "paypal" }}
                    createOrder={async (data, actions) => {
                        if (!user?.userId) {
                            setErrorMessage("User not found. Please login again.");
                            setErrorSnackbarOpen(true);
                            return '';
                        }

                        try {
                            const paymentSessionAction = await dispatch(startPaymentSession(user.userId));
                            if (startPaymentSession.fulfilled.match(paymentSessionAction)) {
                                return actions.order.create({
                                    purchase_units: [{
                                        amount: {
                                            currency_code: "USD",
                                            value: "9.99",
                                        },
                                    }],
                                    intent: 'CAPTURE'
                                });
                            } else {
                                throw new Error(paymentSessionAction.error?.message || 'Payment session failed');
                            }
                        } catch (err) {
                            console.error("Create order error:", err);
                            setErrorMessage("Failed to create PayPal order.");
                            setErrorSnackbarOpen(true);
                            return '';
                        }
                    }}
                    onApprove={async (data, actions) => {
                        try {
                            const paymentSuccessAction = await dispatch(handlePaymentSuccess(user!.userId));
                            if (handlePaymentSuccess.fulfilled.match(paymentSuccessAction)) {
                                const { user: updatedUser, token: newToken } = paymentSuccessAction.payload;
                                login(updatedUser, newToken);
                                setDialogOpen(true);
                            } else {
                                throw new Error(paymentSuccessAction.error?.message || 'Payment failed');
                            }
                        } catch (err) {
                            console.error("PayPal payment error:", err);
                            setErrorMessage("PayPal payment failed.");
                            setErrorSnackbarOpen(true);
                        }
                    }}
                    onError={(err) => {
                        console.error("PayPal error:", err);
                        setErrorMessage("An error occurred with PayPal.");
                        setErrorSnackbarOpen(true);
                    }}
                />
            </PayPalScriptProvider>
        </Grid>
    );
};
