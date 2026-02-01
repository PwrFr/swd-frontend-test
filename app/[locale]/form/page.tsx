"use client";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import {
  Typography,
  Space,
  Flex,
  Table,
  Form,
  Input,
  Select,
  DatePicker,
  Radio,
  Button,
  Row,
  Col,
  Drawer,
  Dropdown,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import {
  updateField,
  createUser,
  deleteUser,
  UserData,
  resetForm,
  setForm,
  loadUsers,
  updateUser,
} from "@/store/formData";
import { useState, useEffect } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
const { Title, Paragraph } = Typography;
const { Option } = Select;

export default function FormPage() {
  const t = useTranslations("FormPage");
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.formData.userList);
  const formState = useSelector((state: RootState) => state.formData.form);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  // Keep form in sync with Redux (handles reset/edit)
  useEffect(() => {
    form.setFieldsValue(formState);
  }, [formState, form]);

  const columns = [
    {
      title: t("table.name"),
      key: "name",
      render: (record: UserData) =>
        `${record.title ? t(`titleOptions.${record.title.toLowerCase()}`) : ""} ${record.firstName} ${record.lastName}`,
      sorter: (a: UserData, b: UserData) =>
        a.firstName.localeCompare(b.firstName),
    },
    {
      title: t("table.gender"),
      dataIndex: "gender",
      key: "gender",
      render: (gender: string) => t(`genderOptions.${gender.toLowerCase()}`),
      sorter: (a: UserData, b: UserData) => a.gender.localeCompare(b.gender),
    },
    {
      title: t("table.mobilePhone"),
      key: "mobilePhone",
      render: (record: UserData) =>
        `${record.mobilePhonePrefix} ${record.mobilePhone}`,
      sorter: (a: UserData, b: UserData) =>
        a.mobilePhone.localeCompare(b.mobilePhone),
    },
    {
      title: t("table.nationality"),
      dataIndex: "nationality",
      key: "nationality",
      render: (nat: string) =>
        nat ? t(`nationalities.${nat.toLowerCase()}`) : "-",
      sorter: (a: UserData, b: UserData) =>
        a.nationality.localeCompare(b.nationality),
    },
    {
      title: t("table.manage"),
      key: "action",
      render: (row: unknown, record: UserData) => (
        <Dropdown
          classNames={{
            root: "w-[150px]",
          }}
          menu={{
            items: [
              {
                key: "3",
                label: t("buttons.edit"),
                icon: <EditOutlined />,
                onClick: () => onEdit(record),
              },
              {
                key: "4",
                label: t("buttons.delete"),
                icon: <DeleteOutlined />,
                danger: true,
                onClick: () => {
                  const confirm = window.confirm(
                    `Are you sure you want to delete user ${record.firstName}?`,
                  );
                  if (confirm) {
                    dispatch(deleteUser(record.id));
                  }
                },
              },
            ],
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Button
              size="large"
              color="default"
              variant="filled"
              icon={<MoreOutlined size={40} />}
            />
          </a>
        </Dropdown>
      ),
    },
  ];

  const onFinish = () => {
    dispatch(createUser());
    form.resetFields();
    onClose();
  };

  const onEdit = (record: UserData) => {
    showDrawer();
    dispatch(setForm(record));
    form.setFieldsValue(record);
  };

  const onCreate = () => {
    handleReset();
    showDrawer();
  };

  const onUpdate = () => {
    const data = {
      ...form.getFieldsValue(),
      id: formState.id,
    };
    dispatch(updateUser(data));
    form.resetFields();
    onClose();
  };

  const handleReset = () => {
    dispatch(resetForm());
    form.resetFields();
  };

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      <Flex vertical gap={16}>
        <header>
          <Title>{t("title")}</Title>
          <Paragraph className="text-lg opacity-70">
            {t("description")}
          </Paragraph>
        </header>
        <Drawer
          title={formState.id ? t("drawer.editTitle") : t("drawer.createTitle")}
          size={720}
          onClose={onClose}
          open={open}
          forceRender
          styles={{
            body: {
              paddingBottom: 80,
            },
          }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={formState}
            onValuesChange={(changedValues) => {
              (
                Object.entries(changedValues) as [
                  keyof UserData,
                  UserData[keyof UserData],
                ][]
              ).forEach(([field, value]) => {
                let formattedValue: string | undefined = value as string;
                if (dayjs.isDayjs(value)) {
                  formattedValue = (value as dayjs.Dayjs).format("YYYY-MM-DD");
                }
                dispatch(
                  updateField({
                    field: field as keyof (Omit<UserData, "id"> & {
                      id?: string;
                    }),
                    value: formattedValue || "",
                  }),
                );
              });
            }}
          >
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label={t("fields.title")}
                  name="title"
                  rules={[{ required: true }]}
                >
                  <Select placeholder={t("fields.titlePlaceholder")}>
                    <Option value="mr">{t("titleOptions.mr")}</Option>
                    <Option value="mrs">{t("titleOptions.mrs")}</Option>
                    <Option value="ms">{t("titleOptions.ms")}</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item
                  label={t("fields.firstName")}
                  name="firstName"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item
                  label={t("fields.lastName")}
                  name="lastName"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  label={t("fields.birthday")}
                  name="birthday"
                  rules={[{ required: true }]}
                  getValueProps={(value) => ({
                    value: value ? dayjs(value) : undefined,
                  })}
                >
                  <DatePicker
                    className="w-full"
                    placeholder={t("fields.birthdayPlaceholder")}
                    format="MM/DD/YYYY"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={t("fields.nationality")}
                  name="nationality"
                  rules={[{ required: true }]}
                >
                  <Select placeholder={t("fields.nationalityPlaceholder")}>
                    <Option value="thai">{t("nationalities.thai")}</Option>
                    <Option value="american">
                      {t("nationalities.american")}
                    </Option>
                    <Option value="british">
                      {t("nationalities.british")}
                    </Option>
                    <Option value="chinese">
                      {t("nationalities.chinese")}
                    </Option>
                    <Option value="japanese">
                      {t("nationalities.japanese")}
                    </Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label={t("fields.citizenId")} name="citizenId">
                  <Input placeholder="X-XXXX-XXXXX-XX-X" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label={t("fields.gender")}
                  name="gender"
                  rules={[{ required: true }]}
                >
                  <Radio.Group>
                    <Radio value="male">{t("genderOptions.male")}</Radio>
                    <Radio value="female">{t("genderOptions.female")}</Radio>
                    <Radio value="unisex">{t("genderOptions.unisex")}</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label={t("fields.mobilePhone")}
                  required
                  style={{ marginBottom: 0 }}
                >
                  <Space.Compact className="w-full">
                    <Form.Item name="mobilePhonePrefix" noStyle>
                      <Select className="w-1/3!">
                        <Option value="+66">+66</Option>
                        <Option value="+1">+1</Option>
                        <Option value="+81">+81</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="mobilePhone"
                      noStyle
                      rules={[{ required: true }]}
                    >
                      <Input className="w-2/3" />
                    </Form.Item>
                  </Space.Compact>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label={t("fields.passportNo")} name="passportNo">
                  <Input />
                </Form.Item>
              </Col>

              <Col span={10}>
                <Form.Item
                  label={t("fields.expectedSalary")}
                  name="expectedSalary"
                  rules={[{ required: true }]}
                >
                  <Input suffix="THB" />
                </Form.Item>
              </Col>
            </Row>
            <Flex justify="space-between" gap={16}>
              <Button onClick={onClose}>{t("buttons.cancel")}</Button>
              <Flex justify="end" gap={16}>
                <Button type="text" onClick={handleReset}>
                  {t("buttons.reset")}
                </Button>
                {formState.id ? (
                  <Button type="primary" onClick={onUpdate}>
                    {t("buttons.update")}
                  </Button>
                ) : (
                  <Button type="primary" htmlType="submit">
                    {t("buttons.submit")}
                  </Button>
                )}
              </Flex>
            </Flex>
          </Form>
        </Drawer>
        <Flex justify="end">
          <Button
            size="large"
            type="primary"
            onClick={onCreate}
            icon={<PlusOutlined />}
          >
            {t("buttons.newUser")}
          </Button>
        </Flex>
        <Table
          dataSource={users}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          className="rounded-lg overflow-hidden"
        />
      </Flex>
    </div>
  );
}
