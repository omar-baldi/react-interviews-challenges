import {
  BASE_IMAGE_URL,
  DEFAULT_NESTED_PRESENTS_PROBABILITY,
  DEFAULT_PRESENT_IMAGE_SIZE,
  MAX_ITERATIONS_ALLOWED,
  MAX_PRESENTS_AMOUNT,
} from '../constants';
import { Present } from '../types/presents';
import { generateRandomNumber } from '../utils/random-number';

export function getPresentImageUrl(size: number) {
  return `${BASE_IMAGE_URL}/christmas-icon-gift-${size}.png`;
}

export function hasNestedPresents(present: Present): present is Required<Present> {
  return Array.isArray(present.nestedPresents) && present.nestedPresents.length > 0;
}

/**
 * @param probabilityNestedPresents - probability of generating nested presents (e.g: 0.4 for 40% probability)
 * @param iteration
 */
export function generateNestedPresents({
  probabilityNestedPresents = DEFAULT_NESTED_PRESENTS_PROBABILITY,
  iteration = 1,
}: {
  probabilityNestedPresents?: number;
  iteration?: number;
} = {}): Present[] {
  const presentsAmount = generateRandomNumber(2, MAX_PRESENTS_AMOUNT);

  return [...Array(presentsAmount)].map<Present>(() => {
    const shouldCreateNestedPresents = Math.random() < probabilityNestedPresents;
    const presentSize = Math.floor(DEFAULT_PRESENT_IMAGE_SIZE / iteration);

    return {
      size: presentSize,
      ...(iteration < MAX_ITERATIONS_ALLOWED &&
        shouldCreateNestedPresents && {
          nestedPresents: generateNestedPresents({ iteration: iteration + 1 }),
        }),
    };
  });
}
