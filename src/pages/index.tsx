import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import CodeBlock from "@theme/CodeBlock";
import DownloadButton from "../components/DownloadButton";
import styles from "./index.module.css";

const HELLO_WORLD = `\
extern "C" func puts(s: cstr) i32

func main() {
  puts("hello, world")
}`;

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Ripe Programming Language" description={siteConfig.tagline}>
      <main>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1>Ripe</h1>
            <p className={styles.tagline}>
              A systems programming language.
            </p>
            <div className={styles.ctas}>
              <DownloadButton />
              <Link className="button button--secondary" to="/docs/install">
                Get Started
              </Link>
            </div>
            <span className={styles.version}>Version 0.0.0 - pre-release</span>
          </div>
          <div className={styles.heroCode}>
            <div className={styles.codePanel}>
              <div className={styles.codePanelTab}>hello.rp</div>
              <CodeBlock language="ripe">{HELLO_WORLD}</CodeBlock>
            </div>
            <div className={styles.shellPanel}>
              <div className={styles.shellPanelTab}>shell</div>
              <div className={styles.shellBody}>
                <span className={styles.shellPrompt}>$ </span>
                <span>ripec hello.rp</span>
                <br />
                <span className={styles.shellPrompt}>$ </span>
                <span>./hello</span>
                <br />
                <span>hello, world</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
