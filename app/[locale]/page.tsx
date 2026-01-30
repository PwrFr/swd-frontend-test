"use client";
import { useTranslations } from "next-intl";
import { Typography, Button, Flex, Row, Col, Card } from "antd";
import {
  ArrowRightOutlined,
  CodeOutlined,
  GlobalOutlined,
  LayoutOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { Link } from "@/i18n/navigation";

const { Title, Paragraph, Text } = Typography;

export default function Home() {
  const t = useTranslations("HomePage");

  const features = [
    {
      key: "stack",
      icon: <CodeOutlined className="text-2xl text-blue-500" />,
    },
    {
      key: "redux",
      icon: <ThunderboltOutlined className="text-2xl text-purple-500" />,
    },
    {
      key: "i18n",
      icon: <GlobalOutlined className="text-2xl text-green-500" />,
    },
    {
      key: "design",
      icon: <LayoutOutlined className="text-2xl text-orange-500" />,
    },
  ];

  return (
    <Flex vertical gap={48} align="center" justify="center" flex={1}>
      <Flex vertical gap={16} align="center" className="text-center max-w-2xl">
        <Typography>
          <Title className="mb-4! text-5xl!">{t("title")}</Title>
          <Paragraph className="text-xl text-zinc-500 leading-relaxed">
            {t("description")}
          </Paragraph>
        </Typography>

        <Link href="/layout">
          <Button
            type="primary"
            size="large"
            icon={<ArrowRightOutlined />}
            className="h-14 px-10 text-lg font-medium rounded-xl shadow-lg shadow-orange-200"
          >
            {t("goToLayout")}
          </Button>
        </Link>
      </Flex>

      <Row gutter={[24, 24]} className="w-full">
        {features.map((feature) => (
          <Col key={feature.key} xs={24} sm={12} lg={6}>
            <Card
              className="h-full border-none shadow-sm hover:shadow-md transition-shadow duration-300"
              styles={{ body: { padding: "32px 24px" } }}
            >
              <Flex vertical gap={16}>
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <Title level={4} className="mb-2!">
                    {t(`features.${feature.key}_title`)}
                  </Title>
                  <Text className="text-zinc-500">
                    {t(`features.${feature.key}_desc`)}
                  </Text>
                </div>
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>
    </Flex>
  );
}
