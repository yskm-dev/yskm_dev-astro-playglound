import { getNotesDetail } from "@/libs/microcms";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs/";
import useSWR from "swr";
import styles from "./NotesPreview.module.scss";

export default function NotesPreview() {
  const params = new URLSearchParams(window.location.search);
  const contentId = params.get("contentId");
  const draftKey: string | null = params.get("draftKey");

  const { data, error, isLoading, isValidating } = useSWR(
    contentId === null || draftKey === null
      ? null
      : ["/preview", contentId, draftKey],
    ([, contentId, draftKey]) => getNotesDetail(contentId, { draftKey }),
  );

  if (error) return <div>Error loading note details.</div>;
  if (isLoading) return <div>Loading note details...</div>;

  // HTMLをパースしてコードブロックを抽出
  const codeBlockRegex =
    /<div data-filename="([^"]*)">\s*<pre><code class="language-([^"]*)">([\s\S]*?)<\/code><\/pre>\s*<\/div>/g;
  const contentParts: {
    type: "html" | "code";
    content: string;
    lang?: string;
    filename?: string;
  }[] = [];

  let lastIndex = 0;
  let match;

  if (data?.content === undefined) {
    return <div>No content available.</div>;
  }
  while ((match = codeBlockRegex.exec(data.content)) !== null) {
    // マッチ前のHTMLを追加
    if (match.index > lastIndex) {
      contentParts.push({
        type: "html",
        content: data.content.slice(lastIndex, match.index) || "",
      });
    }

    // コードブロックを追加
    const filename = match[1];
    const lang = match[2];

    // HTMLエンティティをデコード（改行とインデントを保持）
    let code = match[3];

    // HTMLエンティティのデコード（&amp; を最後に処理する必要がある）
    code = code
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, "&");

    contentParts.push({
      type: "code",
      content: code,
      lang,
      filename,
    });

    lastIndex = match.index + match[0].length;
  }

  // 残りのHTMLを追加
  if (lastIndex < (data.content.length || 0)) {
    contentParts.push({
      type: "html",
      content: data.content.slice(lastIndex) || "",
    });
  }

  return (
    <article>
      <div className={styles.header}>
        <div className={styles.icon} aria-hidden="true">
          {data?.icon}
        </div>
        <h1 className={styles.title}>{data?.title}</h1>
        <div className={styles.info}>
          <div className={styles.column}>
            <p className={styles.columnTitle}>公開日:</p>
            <time className={styles.date} dateTime="">
              {data?.publishedAt
                ? new Date(data?.publishedAt).toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                : data?.createdAt &&
                  new Date(data?.createdAt).toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
            </time>
          </div>
          <div className={styles.column}>
            <p className={styles.columnTitle}>タグ:</p>
            <ul className={styles.columnTags}>
              {data?.tags.map((tag) => (
                <li key={tag.id}>#{tag.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {contentParts.map((part) => {
          if (part.type === "code") {
            console.log(part.lang, part.filename);
            return (
              <div data-filename={part.filename}>
                <SyntaxHighlighter
                  style={a11yDark}
                  language={(part.lang || "plaintext") as any}
                >
                  {part.content}
                </SyntaxHighlighter>
              </div>
            );
          } else {
            return <div dangerouslySetInnerHTML={{ __html: part.content }} />;
          }
        })}
      </div>
      <a className={styles.backLink} href="/notes">
        {" "}
        一覧へ戻る{" "}
      </a>
    </article>
  );
}
