import thumbReact from "@/assets/thumb-react.jpg";
import thumbNode from "@/assets/thumb-node.jpg";
import thumbTypescript from "@/assets/thumb-typescript.jpg";
import thumbDevops from "@/assets/thumb-devops.jpg";
import thumbSystem from "@/assets/thumb-system.jpg";
import thumbSql from "@/assets/thumb-sql.jpg";
import thumbFullstack from "@/assets/thumb-fullstack.jpg";
import thumbSde from "@/assets/thumb-sde.jpg";
import thumbCloud from "@/assets/thumb-cloud.jpg";
import thumbPython from "@/assets/thumb-python.jpg";
import thumbDatascience from "@/assets/thumb-datascience.jpg";
import thumbAws from "@/assets/thumb-aws.jpg";
import thumbCybersecurity from "@/assets/thumb-cybersecurity.jpg";
import thumbJava from "@/assets/thumb-java.jpg";
import thumbUiux from "@/assets/thumb-uiux.jpg";
import thumbMongodb from "@/assets/thumb-mongodb.jpg";
import thumbGit from "@/assets/thumb-git.jpg";
import thumbReactnative from "@/assets/thumb-reactnative.jpg";
import thumbGraphql from "@/assets/thumb-graphql.jpg";
import thumbNextjs from "@/assets/thumb-nextjs.jpg";
import thumbDsa from "@/assets/thumb-dsa.jpg";

export const getThumbnail = (id: string) => thumbnails[id] || "";

export const thumbnails: Record<string, string> = {
  "react-masterclass": thumbReact,
  "node-backend": thumbNode,
  "typescript-pro": thumbTypescript,
  "devops-essentials": thumbDevops,
  "system-design": thumbSystem,
  "sql-mastery": thumbSql,
  "fullstack-bundle": thumbFullstack,
  "sde-bundle": thumbSde,
  "cloud-bundle": thumbCloud,
  "python-bootcamp": thumbPython,
  "data-science-ml": thumbDatascience,
  "aws-cloud": thumbAws,
  "cybersecurity": thumbCybersecurity,
  "java-enterprise": thumbJava,
  "uiux-design": thumbUiux,
  "mongodb-nosql": thumbMongodb,
  "git-github": thumbGit,
  "react-native-mobile": thumbReactnative,
  "graphql-apis": thumbGraphql,
  "nextjs-fullstack": thumbNextjs,
  "dsa-masterclass": thumbDsa,
};
