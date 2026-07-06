import prisma from "../../config/prisma";

export const takenSlug = async (
  slug: string,
  table: "category" | "product" | "seller",
): Promise<string> => {
  const existing =
    table === "category"
      ? await prisma.category.findFirst({ where: { slug } })
      : table === "product"
        ? await prisma.product.findFirst({ where: { slug } })
        : await prisma.seller.findFirst({ where: { storeSlug: slug } });

  return existing ? `${slug}-${Date.now()}` : slug;
};
