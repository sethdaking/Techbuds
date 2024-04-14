import Bounded from "@/components/Bounded";
import { createClient } from "../../../prismicio";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import clsx from "clsx";

/**
 * Props for `Blog`.
 */
export type BlogProps = SliceComponentProps<Content.BlogSlice>;

/**
 * Component for "Blog" Slices.
 */
const Blog = async ({
  slice,
}: BlogProps): Promise<JSX.Element> => {
  const client = createClient();

  const Blog = await Promise.all(
    slice.items.map(async (item) => {
      if (isFilled.contentRelationship(item.blogs)) {
        return await client.getByID<Content.BlogDocument>(
          item.blogs.id,
        );
      }
    }),
  );

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <h2 className="max-w-2xl text-balance text-center text-5xl font-medium md:text-7xl">
        <PrismicText field={slice.primary.blog_heading} />
      </h2>

      <div className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300">
        <PrismicRichText field={slice.primary.blog_body} />
      </div>

      <div className="mt-20 grid gap-16">
        {Blog.map(
          (Blog, index) =>
            Blog && (
              <div
                key={Blog.id}
                className="relative grid gap-4 opacity-85 transition-opacity duration-300 hover:cursor-pointer hover:opacity-100 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
              >
                <div className="col-span-1 flex flex-col justify-center gap-4">
                  <h3 className="text-4xl">
                    <PrismicText field={Blog.data.title} />
                  </h3>
                  <div className="max-w-md">
                    <PrismicRichText field={Blog.data.description} />
                  </div>

                  <PrismicNextLink
                    document={Blog}
                    className="after:absolute after:inset-0 hover:underline"
                  >
                    Read <PrismicText field={Blog.data.title} /> case
                    study
                  </PrismicNextLink>
                </div>
                <PrismicNextImage
                  field={Blog.data.image}
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={clsx(
                    "rounded-xl lg:col-span-2",
                    index % 2 && "md:-order-1",
                  )}
                />
              </div>
            ),
        )}
      </div>
    </Bounded>
  );
};

export default Blog;