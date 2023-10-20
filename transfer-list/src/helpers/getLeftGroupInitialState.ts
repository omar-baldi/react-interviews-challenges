import { DEFAULT_AMOUNT_ITEMS_LEFT_GROUP } from '../constants';

export function getInitialLeftListGroupState(
  amountItems = DEFAULT_AMOUNT_ITEMS_LEFT_GROUP
) {
  const initialLeftGroupState = new Map(
    [...Array(amountItems)]
      .map((_, index) => ({
        id: `item-#${index}`,
        label: (index + 1).toString(),
        checked: false,
      }))
      .map(({ id, ...rest }) => [id, rest])
  );

  return initialLeftGroupState;
}
