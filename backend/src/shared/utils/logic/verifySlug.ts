import prisma from "../../config/prisma";

export const takenSlug = async (
  slug: string,
  table: "category" | "product" | "seller",
  excludeId?: string,
): Promise<string> => {
  const notClause = excludeId ? { NOT: { id: excludeId } } : {};
  const notClauseSeller = excludeId ? { NOT: { userId: excludeId } } : {};

  const existing =
    table === "category"
      ? await prisma.category.findFirst({ where: { slug, ...notClause } })
      : table === "product"
        ? await prisma.product.findFirst({ where: { slug, ...notClause } })
        : await prisma.seller.findFirst({
            where: { storeSlug: slug, ...notClauseSeller },
          });

  return existing ? `${slug}-${Date.now()}` : slug;
};
