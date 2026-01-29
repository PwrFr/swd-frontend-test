"use client";
import { useTranslations } from "next-intl";
import { Typography, Card, Space, Flex } from "antd";

const { Title, Paragraph } = Typography;

export default function LayoutPage() {
  const t = useTranslations("LayoutPage");
  return (
    <div className="w-full  mx-auto p-8 h-full">
      <Flex vertical gap={16}>
        <Typography className="border-b">
          <Title>{t("title")}</Title>
          <Paragraph className="text-lg opacity-70">
            {t("description")}
          </Paragraph>
        </Typography>
        <div>asd</div>
      </Flex>
    </div>
  );
}
