export default (
  state: any = {
    phone: 'iPhoneX'
  },
  action: { type?: string; phone?: boolean } = {}
) => {
  const { type, phone }: { type?: string; phone?: boolean } = action;
  switch (type) {
    case 'Menu__phone':
      return {
        type,
        phone
      };
    default:
      return state;
  }
};
