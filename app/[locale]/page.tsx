"use client";
import { useTranslations } from "next-intl";
import { Typography, Button, Space } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "@/i18n/navigation";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <div className="h-full p-8">
      <Space vertical>
        <Typography>
          <h1>{t("title")}</h1>
          <p className="text-lg text-zinc-600">{t("description")}</p>
        </Typography>

        <div className="flex justify-start">
          <Link href="/layout">
            <Button
              type="primary"
              size="large"
              icon={<ArrowRightOutlined />}
              className="h-12 px-8 font-medium rounded-lg"
            >
              {t("goToLayout")}
            </Button>
          </Link>
        </div>
      </Space>
    </div>
  );
}
