export const generateOrderNumber = (): string => {
  const year = new Date().getFullYear();
  const timestamp = Date.now().toString().slice(-5); 
  const random = Math.floor(100 + Math.random() * 900); 
  return `ORD-${year}-${timestamp}${random}`;
};
