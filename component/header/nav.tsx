"use client";
import { Breadcrumb, Menu, MenuProps, Select, theme } from "antd";
import { LayoutOutlined, FormOutlined, HomeOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

type MenuItem = Required<MenuProps>["items"][number];

interface MenuInfo {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

const { useToken } = theme;

export const Nav = () => {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  const items: MenuItem[] = [
    {
      label: t("HomePage.title"),
      key: "",
      icon: <HomeOutlined />,
    },
    {
      label: t("LayoutPage.title"),
      key: "layout",
      icon: <LayoutOutlined />,
    },
    {
      label: t("FormPage.title"),
      key: "form",
      icon: <FormOutlined />,
    },
  ];

  const current = pathname.split("/")[1] || "";

  const onClick: MenuProps["onClick"] = (e) => {
    router.push(`/${e.key}`);
  };

  const onLocaleChange = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
      router.refresh();
    }
  };

  const { token } = useToken();

  const currentItem = items.find(
    (item) => item && "key" in item && item.key === current,
  ) as MenuInfo | undefined;

  return (
    <div className="sticky top-0 w-full bg-white px-4 pt-4 shadow">
      <div className="flex gap-4 items-center justify-between">
        <Breadcrumb
          items={[
            {
              title: (
                <h1
                  className={`font-bold`}
                  style={{ color: token.colorPrimary }}
                >
                  SWD
                </h1>
              ),
            },
            {
              title: currentItem?.label,
            },
          ]}
        />
        <Select
          defaultValue={locale}
          style={{ width: 120 }}
          onChange={onLocaleChange}
          options={[
            { value: "en", label: "English" },
            { value: "th", label: "ไทย" },
          ]}
        />
      </div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </div>
  );
};
