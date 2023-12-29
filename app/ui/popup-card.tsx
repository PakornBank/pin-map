import { Card, Image, Text, Badge, Group } from "@mantine/core";

export default function PopupCard({ popupInfo }: { popupInfo: any }) {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Card.Section>
        <Image
          src={popupInfo.image_url}
          alt={popupInfo.name}
          height={150}
          width={300}
          fit="cover"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{popupInfo.name}</Text>
        <Badge color="pink">{popupInfo.category}</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {popupInfo.description}
      </Text>
    </Card>
  );
}
