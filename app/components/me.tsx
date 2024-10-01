import { Fragment } from "hono/jsx";
import { Skills } from "../constants/skill";
import { Badge } from "./badge";
import avatar from "../assets/avatar.avif?url";

export const Me = () => {
  return (
    <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6 mb-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        Hi, I'm Kenya:)
      </h1>
      <div className="flex flex-col md:flex-row items-start md:items-center mb-6">
        <img
          src={avatar}
          alt="Kenya"
          className="w-24 h-24 rounded-full mb-4 md:mb-0 md:mr-6"
        />
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          現在コミュニティSaaSの会社でソフトウェアエンジニアとしてプロジェクトに取り組んでいます。<br/>
          特にフロントエンド開発に興味があり、ReactやTypeScriptを使った開発が得意です。<br/>
          このブログでは、技術的なことや日々の学びをシェアしていきます。
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
          技術スタック
        </h2>
        <div className="flex flex-wrap gap-2">
          {Skills.map((tech) => (
            <Fragment key={tech}>
              <Badge content={tech} />
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
