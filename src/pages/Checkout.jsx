import { useState } from 'react';
import { Link } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { Check, CheckCircle2, Loader2, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { createOrder } from '@/api/orders';
import { useCart } from '@/context/cart-context';
import { formatPrice } from '@/utils';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const STEPS = ['Shipping', 'Payment', 'Review'];

const Field = ({ label, ...props }) => (
  <div className='space-y-2'>
    <Label htmlFor={props.id}>{label}</Label>
    <Input {...props} />
  </div>
);

const Stepper = ({ current }) => (
  <ol className='mb-10 flex items-center gap-3'>
    {STEPS.map((label, i) => (
      <li key={label} className='flex flex-1 items-center gap-3 last:flex-none'>
        <span className='flex items-center gap-2'>
          <span
            className={cn(
              'flex size-7 items-center justify-center rounded-full border text-sm font-medium',
              i < current && 'border-primary bg-primary text-primary-foreground',
              i === current && 'border-primary text-primary',
              i > current && 'text-muted-foreground',
            )}
          >
            {i < current ? <Check className='size-4' /> : i + 1}
          </span>
          <span
            className={cn(
              'text-sm',
              i === current ? 'font-medium' : 'text-muted-foreground',
            )}
          >
            {label}
          </span>
        </span>
        {i < STEPS.length - 1 && <span className='h-px flex-1 bg-border' />}
      </li>
    ))}
  </ol>
);

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [orderId, setOrderId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    street: '',
    zip: '',
    city: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const { mutate: placeOrder, isPending } = useMutation({
    mutationFn: () => createOrder(items),
    onSuccess: (data) => {
      setOrderId(data.id);
      clearCart();
      toast.success('Order placed!', { description: `Order #${data.id} confirmed.` });
    },
    onError: (err) =>
      toast.error('Payment failed', { description: err.message }),
  });

  if (orderId) {
    return (
      <section className='flex flex-col items-center gap-4 py-24 text-center'>
        <CheckCircle2 className='size-16 text-green-500' />
        <h2 className='text-3xl font-bold tracking-tight'>
          Thank you, {form.name}!
        </h2>
        <p className='max-w-md text-muted-foreground'>
          Your totally fake order{' '}
          <span className='font-medium text-foreground'>#{orderId}</span> has been
          placed. Nothing will be charged, and nothing will be shipped. Ever.
        </p>
        <Button asChild className='mt-2'>
          <Link to='/'>Continue Shopping</Link>
        </Button>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className='flex flex-col items-center gap-4 py-24 text-center'>
        <ShoppingCart className='size-12 text-muted-foreground' />
        <p className='text-lg font-medium'>Your cart is empty</p>
        <p className='text-sm text-muted-foreground'>
          Add something to the cart before checking out.
        </p>
        <Button asChild>
          <Link to='/'>Back to Shop</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className='mx-auto max-w-2xl'>
      <h2 className='mb-8 text-3xl font-bold tracking-tight'>Checkout</h2>

      <Stepper current={step} />

      {step === 0 && (
        <form
          className='space-y-4'
          onSubmit={(e) => {
            e.preventDefault();
            setStep(1);
          }}
        >
          <Field
            label='Full Name'
            id='name'
            name='name'
            autoComplete='name'
            required
            value={form.name}
            onChange={handleChange}
          />
          <Field
            label='Email'
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            required
            value={form.email}
            onChange={handleChange}
          />
          <Field
            label='Street Address'
            id='street'
            name='street'
            autoComplete='street-address'
            required
            value={form.street}
            onChange={handleChange}
          />
          <div className='grid grid-cols-[1fr_2fr] gap-4'>
            <Field
              label='ZIP'
              id='zip'
              name='zip'
              autoComplete='postal-code'
              required
              value={form.zip}
              onChange={handleChange}
            />
            <Field
              label='City'
              id='city'
              name='city'
              autoComplete='address-level2'
              required
              value={form.city}
              onChange={handleChange}
            />
          </div>
          <div className='flex justify-end pt-2'>
            <Button type='submit'>Continue to Payment</Button>
          </div>
        </form>
      )}

      {step === 1 && (
        <form
          className='space-y-4'
          onSubmit={(e) => {
            e.preventDefault();
            setStep(2);
          }}
        >
          <p className='rounded-md bg-muted px-4 py-3 text-sm text-muted-foreground'>
            This is a fake shop — please don&apos;t enter real card details. 😉
          </p>
          <Field
            label='Cardholder Name'
            id='cardName'
            name='cardName'
            autoComplete='cc-name'
            required
            value={form.cardName}
            onChange={handleChange}
          />
          <Field
            label='Card Number'
            id='cardNumber'
            name='cardNumber'
            inputMode='numeric'
            pattern='[0-9 ]{12,19}'
            maxLength={19}
            placeholder='4242 4242 4242 4242'
            required
            value={form.cardNumber}
            onChange={handleChange}
          />
          <div className='grid grid-cols-2 gap-4'>
            <Field
              label='Expiry'
              id='expiry'
              name='expiry'
              placeholder='MM/YY'
              pattern='(0[1-9]|1[0-2])/[0-9]{2}'
              maxLength={5}
              required
              value={form.expiry}
              onChange={handleChange}
            />
            <Field
              label='CVC'
              id='cvc'
              name='cvc'
              inputMode='numeric'
              pattern='[0-9]{3,4}'
              maxLength={4}
              required
              value={form.cvc}
              onChange={handleChange}
            />
          </div>
          <div className='flex justify-between pt-2'>
            <Button type='button' variant='outline' onClick={() => setStep(0)}>
              Back
            </Button>
            <Button type='submit'>Continue to Review</Button>
          </div>
        </form>
      )}

      {step === 2 && (
        <div className='space-y-6'>
          <div className='grid gap-4 sm:grid-cols-2'>
            <div className='rounded-lg border p-4'>
              <h3 className='mb-2 font-semibold'>Shipping</h3>
              <p className='text-sm text-muted-foreground'>
                {form.name}
                <br />
                {form.street}
                <br />
                {form.zip} {form.city}
                <br />
                {form.email}
              </p>
            </div>
            <div className='rounded-lg border p-4'>
              <h3 className='mb-2 font-semibold'>Payment</h3>
              <p className='text-sm text-muted-foreground'>
                {form.cardName}
                <br />
                Card ending in {form.cardNumber.replace(/\s/g, '').slice(-4)}
              </p>
            </div>
          </div>

          <div className='space-y-3 rounded-lg border p-4'>
            {items.map(({ product, quantity }) => (
              <div key={product.id} className='flex items-center gap-3 text-sm'>
                <span className='flex size-10 shrink-0 items-center justify-center rounded-md border bg-white p-1'>
                  <img
                    src={product.image}
                    alt={product.title}
                    className='max-h-full max-w-full object-contain'
                  />
                </span>
                <span className='line-clamp-1 flex-1'>
                  {product.title}{' '}
                  <span className='text-muted-foreground'>× {quantity}</span>
                </span>
                <span className='font-medium tabular-nums'>
                  {formatPrice(product.price * quantity)}
                </span>
              </div>
            ))}
            <Separator />
            <div className='flex items-center justify-between font-semibold'>
              <span>Total</span>
              <span className='tabular-nums'>{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <div className='flex justify-between'>
            <Button variant='outline' onClick={() => setStep(1)} disabled={isPending}>
              Back
            </Button>
            <Button onClick={() => placeOrder()} disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className='size-4 animate-spin' />
                  Processing payment…
                </>
              ) : (
                `Pay ${formatPrice(totalPrice)}`
              )}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Checkout;
