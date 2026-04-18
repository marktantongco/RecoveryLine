import cocaine from './cocaine';
import heroin from './heroin';
import alcohol from './alcohol';
import benzodiazepines from './benzodiazepines';
import ghb from './ghb';
import ketamine from './ketamine';
import lsd from './lsd';
import nicotine from './nicotine';
import methamphetamine from './methamphetamine';
import mdma from './mdma';
import cannabis from './cannabis';

import type { SubstanceData } from './types';
export type { SubstanceData } from './types';

export const SUBSTANCES: Record<string, SubstanceData> = {
  cocaine,
  heroin,
  alcohol,
  benzodiazepines,
  ghb,
  ketamine,
  lsd,
  nicotine,
  methamphetamine,
  mdma,
  cannabis,
};

export const SUBSTANCE_LIST = Object.values(SUBSTANCES).sort((a, b) => {
  if (b.dangerLevel !== a.dangerLevel) {
    return b.dangerLevel - a.dangerLevel;
  }
  return a.name.localeCompare(b.name);
});
