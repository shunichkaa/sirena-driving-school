const documentTitleOverrides = [
  {
    pattern: /гос реестр юр лиц/u,
    title: "Запись в единый государственный реестр юридических лиц",
  },
  {
    pattern: /орг уч пр/u,
    title: "Методические указания по организации учебного процесса",
  },
  {
    pattern: /^ЕГРЮЛ/u,
    title: "Выписка из Единого государственного реестра юридических лиц",
  },
  {
    pattern: /постановке на учет/u,
    title: "Свидетельство о постановке на учет в налоговом органе",
  },
  {
    pattern: /пед состав/u,
    title: "Руководство и педагогический состав",
  },
  {
    pattern: /гос регистрации/u,
    title: "Свидетельство о государственной регистрации некоммерческой организации",
  },
  {
    pattern: /коллективный_дог/u,
    title: "Коллективный договор",
  },
] as const;

export const getDocumentTitle = (fileName: string) => {
  const override = documentTitleOverrides.find(({ pattern }) => pattern.test(fileName));
  return override?.title ?? fileName.replace(/\.pdf$/iu, "");
};
