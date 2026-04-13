import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../../hooks/useAuth';
import { handlePaymentSuccess, startPaymentSession } from '../../../redux/store/slices/paymentSlice';
import store from '../../../redux/store/store';

type AppDispatch = typeof store.dispatch;

export const usePayment = () => {
  const [form, setForm] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    address: '',
    paypalEmail: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { user, login } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = (): boolean => {
    const temp: Record<string, string> = {};

    if (paymentMethod === 'card') {
      if (!form.name.trim()) temp.name = 'Name is required';
      if (!form.cardNumber || form.cardNumber.length !== 16)
        temp.cardNumber = 'Card number must be 16 digits';
      if (!/^\d{2}\/\d{2}$/.test(form.expiry))
        temp.expiry = 'Expiry must be in MM/YY format';
      if (!form.cvv || form.cvv.length < 3 || form.cvv.length > 4)
        temp.cvv = 'CVV must be 3 or 4 digits';
      if (!form.address.trim()) temp.address = 'Billing address is required';
    }

    if (paymentMethod === 'paypal') {
      if (!form.paypalEmail || !/\S+@\S+\.\S+/.test(form.paypalEmail))
        temp.paypalEmail = 'Enter a valid PayPal email';
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;
    if (!user?.userId) {
      setErrorMessage('User not found. Please login again.');
      setErrorSnackbarOpen(true);
      return;
    }

    setLoading(true);

    try {
      const paymentSessionAction = await dispatch(startPaymentSession(user.userId));

      if (startPaymentSession.fulfilled.match(paymentSessionAction)) {
        const paymentSuccessAction = await dispatch(handlePaymentSuccess(user.userId));

        if (handlePaymentSuccess.fulfilled.match(paymentSuccessAction)) {
          const { user: updatedUser, token: newToken } = paymentSuccessAction.payload;

          login(updatedUser, newToken);
          setDialogOpen(true);
        } else {
          throw new Error(paymentSuccessAction.error?.message || 'Payment processing failed');
        }
      } else {
        throw new Error(paymentSessionAction.error?.message || 'Payment session failed');
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      setErrorMessage(err instanceof Error ? err.message : 'Payment failed. Please try again.');
      setErrorSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    window.location.href = '/';
  };

  const handleErrorSnackbarClose = () => {
    setErrorSnackbarOpen(false);
  };

  return {
    form,
    errors,
    paymentMethod,
    setPaymentMethod,
    loading,
    dialogOpen,
    errorSnackbarOpen,
    errorMessage,
    setErrorMessage,
    setErrorSnackbarOpen,
    setDialogOpen,
    user,
    login,
    dispatch,
    handleChange,
    handleSubmit,
    handleDialogClose,
    handleErrorSnackbarClose,
  };
};
