"use client";
import { useTranslations } from "next-intl";
import { Typography, Card, Space, Flex } from "antd";

const { Title, Paragraph } = Typography;

export default function FormPage() {
  const t = useTranslations("FormPage");
  return (
    <div className="p-8">
      <Flex vertical gap={16}>
        <Typography className="border-b">
          <Title>{t("title")}</Title>
          <Paragraph className="text-lg opacity-70">
            {t("description")}
          </Paragraph>
        </Typography>
        <Paragraph>
          Manage your complex forms and data tables in this section.
        </Paragraph>
      </Flex>
    </div>
  );
}
