import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { FooterLinkItem } from "@docusaurus/theme-common";
import styles from "./styles.module.css";

function FooterLink({ to, href, label }: FooterLinkItem) {
  const linkProps = href
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { to };
  return (
    <Link className={styles.link} {...linkProps}>
      {label}
    </Link>
  );
}

export default function Footer() {
  const { siteConfig } = useDocusaurusContext();
  const { footer } = siteConfig.themeConfig as any;

  if (!footer) return null;

  const { links, copyright } = footer;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.copyright}>{copyright}</div>
        <div className={styles.columns}>
          {links.map((col: any, i: number) => (
            <div key={i} className={styles.col}>
              <div className={styles.colTitle}>{col.title}</div>
              <ul className={styles.colItems}>
                {col.items.map((item: FooterLinkItem, j: number) => (
                  <li key={j}>
                    <FooterLink {...item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
