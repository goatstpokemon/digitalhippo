import { User } from '../payload-types';
import { Access, CollectionConfig } from 'payload/types';
const yourOwn: Access = async ({ req: { user } }) => {
  if (user?.role === 'admin') {
    return true;
  }
  if (!user) {
    return false;
  }
  return { user: { equals: user.id } };
};
export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'Your Orders',
    description: 'Summery of your orders.',
  },
  access: {
    read: yourOwn,
    update: ({ req }) => req.user.role === 'admin',
    create: ({ req }) => req.user.role === 'admin',
    delete: ({ req }) => req.user.role === 'admin',
  },
  fields: [
    {
      name: '_isPaid',
      type: 'checkbox',
      label: 'Paid',
      access: {
        read: ({ req }) => req.user.role === 'admin',
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      },
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      required: true,
      hasMany: true,
    },
  ],
};
