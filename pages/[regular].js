import config from "@config/config.json";
import NotFound from "@layouts/404";
import About from "@layouts/About";
import Base from "@layouts/Baseof";
import Contact from "@layouts/Contact";
import Donation from "@layouts/Donation";
import Default from "@layouts/Default";
import PostSingle from "@layouts/PostSingle";
import {
  getRegularPage,
  getRegularPageSlug,
  getSinglePages,
  getSinglePagesSlug,
} from "@lib/contentParser";
const { blog_folder } = config.settings;

// for all regular pages
const RegularPages = ({ slug, data, postSlug, teams, posts }) => {
  const { title, meta_title, description, image, noindex, canonical, layout } =
    data.frontmatter;
  const { content } = data;

  return (
    <Base
      title={title}
      description={description ? description : content.slice(0, 120)}
      meta_title={meta_title}
      image={image}
      noindex={noindex}
      canonical={canonical}
    >
      {/* single post */}
      {postSlug.includes(slug) ? (
        <PostSingle slug={slug} post={data} teams={teams} posts={posts} />
      ) : layout === "404" ? (
        <NotFound data={data} />
      ) : layout === "about" ? (
        <About data={data} />
      ) : layout === "contact" ? (
        <Contact data={data} />
      ): layout === "donation" ? (
        <Donation data={data} />
      ) : (
        <Default data={data} />
      )}
    </Base>
  );
};
export default RegularPages;

// for regular page routes
export const getStaticPaths = async () => {
  const slugs = getRegularPageSlug("content");
  const paths = slugs.map((slug) => ({
    params: {
      regular: slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

// for regular page data
export const getStaticProps = async ({ params }) => {
  const { regular } = params;
  const allPages = await getRegularPage(regular);
  // get posts folder slug for filtering
  const postSlug = getSinglePagesSlug(`content/${blog_folder}`);
  // aughor data
  const teams = getSinglePages("content/teams");
  // all single pages
  const posts = getSinglePages(`content/${blog_folder}`);

  return {
    props: {
      slug: regular,
      data: allPages,
      postSlug: postSlug,
      teams: teams,
      posts: posts,
    },
  };
};
