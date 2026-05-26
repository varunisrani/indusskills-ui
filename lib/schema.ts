import Ajv from "ajv";
import addFormats from "ajv-formats";
import schema from "../schemas/skill.schema.json";

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

export const validateSkill = ajv.compile(schema as object);

export function isValidSkillJson(data: unknown): {
  ok: boolean;
  errors: string[];
} {
  const ok = validateSkill(data);
  return {
    ok: !!ok,
    errors: ok
      ? []
      : (validateSkill.errors ?? []).map(
          (e) => `${e.instancePath || "/"} ${e.message ?? ""}`,
        ),
  };
}
