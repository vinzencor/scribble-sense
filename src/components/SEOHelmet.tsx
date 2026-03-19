import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { getSEOSettings, SEOSetting } from "@/lib/supabase";

interface SEOHelmetProps {
  page: string;
  title?: string;
  description?: string;
  keywords?: string;
  ogImageUrl?: string;
}

const SEOHelmet = ({ page, title, description, keywords, ogImageUrl }: SEOHelmetProps) => {
  const [settings, setSettings] = useState<SEOSetting | null>(null);

  useEffect(() => {
    const fetchSEO = async () => {
      const { data } = await getSEOSettings(page);
      const normalizedSetting: SEOSetting | null = Array.isArray(data)
        ? ((data[0] as SEOSetting | undefined) ?? null)
        : ((data as SEOSetting | null) ?? null);
      setSettings(normalizedSetting);
    };

    fetchSEO();
  }, [page]);

  const resolvedTitle = title || settings?.meta_title || "ScribbleSense";
  const resolvedDescription = description || settings?.meta_description || "";
  const resolvedKeywords = keywords || settings?.meta_keywords || "";
  const resolvedOgImage = ogImageUrl || settings?.og_image_url || "";

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      {resolvedDescription ? (
        <meta name="description" content={resolvedDescription} />
      ) : null}
      {resolvedKeywords ? (
        <meta name="keywords" content={resolvedKeywords} />
      ) : null}
      <meta property="og:title" content={resolvedTitle} />
      {resolvedDescription ? (
        <meta property="og:description" content={resolvedDescription} />
      ) : null}
      {resolvedOgImage ? (
        <meta property="og:image" content={resolvedOgImage} />
      ) : null}
    </Helmet>
  );
};

export default SEOHelmet;
