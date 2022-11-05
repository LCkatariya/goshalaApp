import TeamSingle from "@layouts/TeamSingle";
import { getSinglePages, getSinglePagesSlug } from "@lib/contentParser";
import { parseMDX } from "@lib/utils/mdxParser";

// post single layout
const Article = ({ team, mdxContent }) => {
  const { frontmatter, content } = team[0];

  return (
    <TeamSingle
      frontmatter={frontmatter}
      content={content}
      mdxContent={mdxContent}
    />
  );
};

// get post single slug
export const getStaticPaths = () => {
  const allSlug = getSinglePagesSlug("content/teams");
  const paths = allSlug.map((slug) => ({
    params: {
      single: slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

// get post single content
export const getStaticProps = async ({ params }) => {
  const { single } = params;
  const getTeam = getSinglePages("content/teams");
  const team = getTeam.filter((team) => team.slug == single);
  const mdxContent = await parseMDX(team[0].content);

  return {
    props: {
      team: team,
      mdxContent: mdxContent,
      slug: single,
    },
  };
};

export default Article;
