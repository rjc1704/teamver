import type {
  ConstantLanguageRow,
  ConstantPositionRow,
  ConstantSkillRow
} from "~/states/server/constant";

export interface FilterForm {
  languages: ConstantLanguageRow["id"][];
  skills: ConstantSkillRow["id"][];
  positions: ConstantPositionRow["id"][];
}
