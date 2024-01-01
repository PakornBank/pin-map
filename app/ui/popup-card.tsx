import { Card, Image, Text, Badge, Group } from "@mantine/core";
import { formatDateTime } from "../lib/utils";

export default function PopupCard({ popupInfo }: { popupInfo: any }) {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Card.Section>
        <Image
          src={popupInfo.image_url}
          alt={popupInfo.pin_name}
          height={150}
          width={300}
          fit="cover"
        />
      </Card.Section>
      <Text fw={500}>{popupInfo.pin_name}</Text>
      <Group gap={5}>
        <Badge color="pink">{popupInfo.category}</Badge>
        {popupInfo.is_active && <Badge color="green">Active</Badge>}
        {popupInfo.tag &&
          popupInfo.tag.map((tag: string, index: number) => (
            <Badge key={`tag${index}of${popupInfo.id}`}>{tag}</Badge>
          ))}
      </Group>

      <Text size="sm" c="dimmed">
        {popupInfo.description}
      </Text>
      <Text size="sm" c="dimmed">
        updated {formatDateTime(popupInfo.updated_at)}
      </Text>
      <Text size="sm" c="dimmed">
        by {popupInfo.name}
      </Text>
    </Card>
  );
}
