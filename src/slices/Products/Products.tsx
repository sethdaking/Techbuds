import { Content, isFilled } from "@prismicio/client";
import { createClient } from "../../../prismicio";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { ProductsProps } from ".";

/**
 * Component for "Products" Slices.
 */
export const Products = async ({ slice }: ProductsProps): Promise<JSX.Element> => {

  const client = createClient();

  const Products = await Promise.all(
    slice.items.map(async (item) => {
      if (isFilled.contentRelationship(item.product_page))
        return await client.getByID<Content.ProductsDocument>(
          item.product_page.id);
    })
  );

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.heading} />
      <PrismicRichText field={slice.primary.body} />

      <div className="mt-20 grid gap-16">
        {Products.map((Products, index) => (
          Products && (
            <div key={Products.id} className="relative grid gap-4 opacity-35 transition-opacity duration-300 hover:cursor-pointer hover:opacity-100 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              <h3>
                <PrismicText field={Products.data.product} />
              </h3>

              <div className="max-w-md">
                <PrismicRichText field={Products.data.description} />
              </div>
              <PrismicNextLink document={Products} className="after:absolute after:inset-0 hover:underline">
                Read more about <PrismicText field={Products.data.product} />
              </PrismicNextLink>
            </div>
          )
        ))}
      </div>
    </section>
  );
};
