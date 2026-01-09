const express = require('express');
const Stripe = require('stripe');
const Template = require('../models/Template');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
  const { templateId } = req.body;

  try {
    const template = await Template.findById(templateId);

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    const price = template.salePrice || template.price;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: template.title,
              description: template.shortDescription,
              images: [template.featuredImage]
            },
            unit_amount: Math.round(price * 100)
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/templates/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/templates/${template.slug}`,
      metadata: {
        templateId: template._id.toString()
      }
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ message: 'Error creating checkout session' });
  }
});

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const templateId = session.metadata.templateId;

    try {
      await Template.findByIdAndUpdate(templateId, {
        $inc: { salesCount: 1 }
      });
      console.log(`Template ${templateId} sale recorded`);
    } catch (error) {
      console.error('Error updating template sales count:', error);
    }
  }

  res.json({ received: true });
});

router.get('/session/:sessionId', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    const templateId = session.metadata.templateId;
    const template = await Template.findById(templateId);

    res.json({
      success: session.payment_status === 'paid',
      template,
      downloadUrl: template?.downloadUrl
    });
  } catch (error) {
    console.error('Error retrieving session:', error);
    res.status(500).json({ message: 'Error retrieving session' });
  }
});

router.post('/create-product', protect, admin, async (req, res) => {
  const { templateId } = req.body;

  try {
    const template = await Template.findById(templateId);

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    const product = await stripe.products.create({
      name: template.title,
      description: template.shortDescription,
      images: [template.featuredImage]
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: Math.round(template.price * 100),
      currency: 'usd'
    });

    template.stripeProductId = product.id;
    template.stripePriceId = price.id;
    await template.save();

    res.json({ product, price, template });
  } catch (error) {
    console.error('Stripe product creation error:', error);
    res.status(500).json({ message: 'Error creating Stripe product' });
  }
});

module.exports = router;
