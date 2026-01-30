"use client";
import { useTranslations } from "next-intl";
import { Typography, Card, Flex, Row, Col, Button } from "antd";
import {
  DownOutlined,
  LeftOutlined,
  RightOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const { Title, Paragraph } = Typography;

export default function LayoutPage() {
  const t = useTranslations("LayoutPage");

  const [shapes, setShapes] = useState([
    {
      key: "square",
      title: "Square",
      shape: <div className="square" />,
    },
    {
      key: "circle",
      title: "Circle",
      shape: <div className="circle" />,
    },
    {
      key: "oval",
      title: "Oval",
      shape: <div className="oval" />,
    },
    {
      key: "trapezoid",
      title: "Trapezoid",
      shape: <div className="trapezoid" />,
    },
    {
      key: "rectangle",
      title: "Rectangle",
      shape: <div className="rectangle" />,
    },
    {
      key: "parallelogram",
      title: "Parallelogram",
      shape: <div className="parallelogram" />,
    },
  ]);

  const moveLeft = () => {
    setShapes((prev) => {
      const next = [...prev];
      const first = next.shift();
      if (first) next.push(first);
      return next;
    });
  };

  const moveRight = () => {
    setShapes((prev) => {
      const next = [...prev];
      const last = next.pop();
      if (last) next.unshift(last);
      return next;
    });
  };

  const swapPosition = () => {
    setShapes((prev) => {
      const next = [...prev];
      const top = next.slice(0, 3);
      const bottom = next.slice(3, 6);
      return [...bottom, ...top];
    });
  };

  const randomPosition = (index: number) => {
    setShapes((prev) => {
      const random = Math.floor(Math.random() * 6) + 1;
      const next = [...prev];
      const item = next.splice(index, 1);
      next.splice(random, 0, item[0]);
      return next;
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      <Flex vertical gap={24}>
        <header className="border-b border-slate-200 pb-4">
          <Title>{t("title")}</Title>
          <Paragraph className="text-lg">{t("description")}</Paragraph>
        </header>

        <Flex vertical gap={24}>
          <Row gutter={[16, 16]}>
            {shapes.map((item, index) => (
              <Col key={item.key} xs={24} sm={12} lg={8}>
                <Card
                  onClick={() => randomPosition(index)}
                  hoverable
                  classNames={{
                    root: "h-52 overflow-hidden shadow-sm",
                    body: "h-full flex flex-col items-center justify-center !p-0",
                  }}
                >
                  <div className="flex-1 flex items-center justify-center w-full">
                    {item.shape}
                  </div>
                  <div className="w-full py-2 bg-slate-50 border-t border-slate-100 flex justify-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {item.title}
                    </span>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          <Flex gap={16} justify="center">
            <Button size="large" onClick={moveLeft}>
              <Flex
                gap={8}
                className="text-[10px] font-bold tracking-widest uppercase"
              >
                <LeftOutlined />
                Move Shape
              </Flex>
            </Button>

            <Button size="large" onClick={swapPosition}>
              <Flex
                gap={8}
                className="text-[10px] font-bold tracking-widest uppercase"
              >
                <UpOutlined />
                Move Position
                <DownOutlined />
              </Flex>
            </Button>

            <Button size="large" onClick={moveRight}>
              <Flex
                gap={8}
                className="text-[10px] font-bold tracking-widest uppercase"
              >
                Move Shape
                <RightOutlined />
              </Flex>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}
