import _ from "lodash";
import { LogItem } from "../useLogs";
import { Tag } from "../useSettings";

export interface TagsDistributionData {
  tags: {
    id: string;
    details: Tag;
    count: number;
  }[];
  itemsCount: number;
}

export const defaultTagsDistributionData: TagsDistributionData = {
  tags: [],
  itemsCount: 0,
}

export const getTagsDistributionData = (items: LogItem[], settingsTags: Tag[]): TagsDistributionData => {
  const distribution = _.countBy(
    items.flatMap((item) => item?.tags?.map((tag) => tag?.id))
  );
  const tags = Object.keys(distribution)
    .map((key) => ({
      details: settingsTags.find((tag) => tag.id === key),
      id: key,
      count: distribution[key],
    }))
    .filter((tag) => tag.details !== undefined)
    .sort((a, b) => b.count - a.count);

  const itemsWithTags = items.filter((item) => item?.tags?.length > 0);

  return {
    tags,
    itemsCount: itemsWithTags.length,
  };
};