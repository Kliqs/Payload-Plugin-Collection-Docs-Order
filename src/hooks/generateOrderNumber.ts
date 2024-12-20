import type { CollectionBeforeValidateHook } from 'payload';

export const generateOrderNumber: CollectionBeforeValidateHook = async ({
  collection,
  data,
  operation,
  req,
}) => {
  if (operation === 'update') return;

  const {
    docs: [lastByOrder],
  } = await req.payload.find({
    collection: collection.slug,
    req,
    sort: '-order_number',
  });

  return {
    ...data,
    order_number:
      lastByOrder?.order_number && typeof lastByOrder.order_number === 'number'
        ? lastByOrder.order_number + 1
        : 1,
  };
};
