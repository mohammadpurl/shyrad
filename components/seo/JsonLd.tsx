import {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
} from "@/lib/schema";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  const json = Array.isArray(data) ? data : [data];

  return (
    <>
      {json.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

export function SiteSchemas() {
  return (
    <JsonLd
      data={[
        organizationSchema(),
        localBusinessSchema(),
        websiteSchema(),
      ]}
    />
  );
}
